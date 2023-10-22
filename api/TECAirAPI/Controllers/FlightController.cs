using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;
using TECAirAPI.Dtos;
using TECAirAPI.Models;
using TECAirAPI.Functions;

namespace TECAirAPI.Controllers
{

    [Route("api/")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        SQLfn sqlfn = new SQLfn();
        private readonly TecairContext _context;
        private readonly IConfiguration _configuration;

        /* The above code is defining a constructor for a FlightController class in C#. The constructor takes two parameters: a TecairContext object named "context" and an IConfiguration object named "configuration". The constructor assigns these parameters to private fields "_context" and "_configuration" respectively. */
        public FlightController(TecairContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        /// <summary>
        /// This function retrieves flight data from a database and returns it as a JSON result.
        /// </summary>
        /// <returns>
        /// The method is returning a JsonResult object, which contains the data from the "FLIGHT" table in the form of a DataTable.
        /// </returns>
        [HttpGet]
        [Route("flight")]
        public JsonResult Get()
        {
            string query = @"
                 SELECT fnumber, ffrom, fto, price, to_char(fdate, 'YYYY-MM-DD') AS fdate, fstate, pid
	             FROM FLIGHT;
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        /// <summary>
        /// This C# function retrieves available flights from a database using a SQL function and returns the result as a JSON object.
        /// </summary>
        /// <returns>
        /// The method is returning a JsonResult object, which contains the data from the "table" DataTable.
        /// </returns>
        [HttpGet]
        [Route("flight/available")]
        public JsonResult GetFlights()
        {
            string query = sqlfn.AvailableF(); // SQL function stored in SQLfn class to get available flights

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        /// <summary>
        /// The GetFPromos function retrieves flight promotions from a database using a SQL function and returns the results as a JSON object.
        /// </summary>
        /// <returns>
        /// The method is returning a JsonResult object, which contains the flight promotions data in the form of a DataTable.
        /// </returns>
        [HttpGet]
        [Route("flight/promotions")]
        public JsonResult GetFPromos()
        {
            string query = sqlfn.FPromotions(); // SQL function stored in SQLfn class to get available flights with promotion percentage

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


      /// <summary>
      /// The GetFlight function retrieves all stops from a specific flight number and returns the result as a JSON object.
      /// </summary>
      /// <param name="number">The "number" parameter is an integer that represents the flight number. It is used to retrieve information about a specific flight from the database.</param>
      /// <returns>
      /// The method is returning a JsonResult object, which contains the data from the DataTable object.
      /// </returns>
        [HttpGet]
        [Route("flight/{number}")]
        public JsonResult GetFlight(int number)
        {
            string query = sqlfn.SpecificFlight(); // SQL function stored in SQLfn class to get all stops from a flight 

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@fnumber", number);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

       /// <summary>
       /// The above function is a C# code snippet that handles a PUT request to modify a flight in a database and returns the updated flight information.
       /// </summary>
       /// <param name="FlightDto">FlightDto is a data transfer object that represents a flight. It contains the following properties:</param>
       /// <returns>
       /// The method is returning a JsonResult object.
       /// </returns>
        [HttpPut]
        [Route("flight/modify")]
        public async Task<JsonResult> PutFlight(FlightDto flight)
        {
            string query = @"
                 UPDATE FLIGHT
	             SET ffrom = @ffrom, fto = @fto, price = @price, fstate = @fstate, fdate = @fdate, pid = @pid
	             WHERE fnumber=@fnumber;

                 SELECT fnumber, ffrom, fto, price, to_char(fdate, 'YYYY-MM-DD') AS fdate, fstate, pid
	             FROM FLIGHT;
            ";

            var fl = await _context.Planes.FindAsync(flight.Fnumber);

            if (fl == null)
                return new JsonResult("Vuelo no encontrado");

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@fnumber", flight.Fnumber);
                    myCommand.Parameters.AddWithValue("@fstate", flight.Fstate);
                    myCommand.Parameters.AddWithValue("@ffrom", flight.Ffrom);
                    myCommand.Parameters.AddWithValue("@fto", flight.Fto);
                    myCommand.Parameters.AddWithValue("@price", flight.Price);
                    myCommand.Parameters.AddWithValue("@fdate", flight.Fdate);
                    myCommand.Parameters.AddWithValue("@pid", flight.Pid);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

       /// <summary>
       /// This C# function updates the state of a flight in a database and returns a JSON result.
       /// </summary>
       /// <param name="FlightDto">FlightDto is a data transfer object that represents a flight. It contains the following properties:</param>
       /// <returns>
       /// The method is returning a JsonResult object.
       /// </returns>
        [HttpPut]
        [Route("flight/state")]
        public async Task<JsonResult> Put(FlightDto flight)
        {
            string query = @"
                 UPDATE FLIGHT
	             SET fstate=@fstate
	             WHERE fnumber=@fnumber;

                 SELECT fnumber, ffrom, fto, price, to_char(fdate, 'YYYY-MM-DD') AS fdate, fstate, pid
	             FROM FLIGHT;
            ";

            var fl = await _context.Planes.FindAsync(flight.Fnumber);

            if (fl == null)
                return new JsonResult("Vuelo no encontrado");

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@fnumber", flight.Fnumber);
                    myCommand.Parameters.AddWithValue("@fstate", flight.Fstate);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Vuelo actualizado");
        }

       /// <summary>
       /// This function handles the creation of a new flight record in a database and returns the updated flight records.
       /// </summary>
       /// <param name="FlightDto">FlightDto is a data transfer object that represents the flight information. It contains the following properties:</param>
       /// <returns>
       /// The method is returning a JsonResult object.
       /// </returns>
        [HttpPost]
        [Route("flight/new")]
        public async Task<JsonResult> Post(FlightDto flight)
        {
            string query = @"
                 INSERT INTO FLIGHT(
	                    fnumber, ffrom, fto, price, fdate, pid)
	             VALUES (@fnumber, @ffrom, @fto, @price, @fdate, @pid);

                 SELECT fnumber, ffrom, fto, price, to_char(fdate, 'YYYY-MM-DD') AS fdate, fstate, pid
	             FROM FLIGHT;
            ";

            var number = await _context.Flights.FindAsync(flight.Fnumber);
            var from = await _context.Airports.FindAsync(flight.Ffrom);
            var to = await _context.Airports.FindAsync(flight.Fto);
            var plane = await _context.Planes.FindAsync(flight.Pid);

            if (number != null)
                return new JsonResult("Numero de vuelo ya existe");
            if (from == null)
                return new JsonResult("Origen no encontrado");
            if (to == null)
                return new JsonResult("Destino no encontrado");
            if (plane == null)
                return new JsonResult("Avion no encontrado");

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@fnumber", flight.Fnumber);
                    myCommand.Parameters.AddWithValue("@ffrom", flight.Ffrom);
                    myCommand.Parameters.AddWithValue("@fto", flight.Fto);
                    myCommand.Parameters.AddWithValue("@price", flight.Price);
                    myCommand.Parameters.AddWithValue("@fdate", flight.Fdate);
                    myCommand.Parameters.AddWithValue("@pid", flight.Pid);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

      /// <summary>
      /// This C# function handles a POST request to search for flights from one airport to another and returns the results as a JSON object.
      /// </summary>
      /// <param name="FlightSearchDto">FlightSearchDto is a data transfer object (DTO) that contains the search criteria for finding flights. It likely has properties such as SfromairportID and StoairportID, which represent the IDs of the departure and arrival airports respectively.</param>
      /// <returns>
      /// The method is returning a JsonResult object, which contains the flight search results in the form of a DataTable.
      /// </returns>
        [HttpPost]
        [Route("flight/fromto")]
        public JsonResult PostFromTo(FlightSearchDto search)
        {
            string query = sqlfn.Fromto(); // SQL function stored in SQLfn class to flights that go from to 

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@sfrom", search.SfromairportID);
                    myCommand.Parameters.AddWithValue("@sto", search.StoairportID);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


      /// <summary>
      /// This C# function retrieves flights based on a passenger's email address and returns them as a JSON result.
      /// </summary>
      /// <param name="EmailDto">The EmailDto is a data transfer object (DTO) that contains the email address of a passenger. It is used as the request body for the HTTP POST request to the "flight/passenger" route. The email address is needed to retrieve flights associated with the passenger.</param>
      /// <returns>
      /// The method is returning a `JsonResult` object, which contains the `table` as the JSON data.
      /// </returns>
        [HttpPost] 
        [Route("flight/passenger")]
        public async Task<ActionResult<IEnumerable<FlightDto>>> GetFlightsByPassenger([FromBody] EmailDto emailDto)
        {
            if (string.IsNullOrEmpty(emailDto?.Email))
            {
                return BadRequest("El correo electrónico es necesario.");
            }

            // Crear consulta SQL para obtener vuelos
            string query = sqlfn.PassengerFlights(emailDto.Email);

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        // DELETE: api/flight/400
/// <summary>
/// This C# function deletes a flight from a database and returns the updated list of flights.
/// </summary>
/// <param name="FlightDto">The FlightDto is a data transfer object that represents a flight. It contains the following properties:</param>
/// <returns>
/// The method is returning a JsonResult object.
/// </returns>
        [HttpDelete]
        [Route("flight/delete")]
        public async Task<JsonResult> Delete(FlightDto del)
        {
            string query = @"
                 DELETE FROM FLIGHT
	             WHERE fnumber=@fnumber;

                 SELECT fnumber, ffrom, fto, price, to_char(fdate, 'YYYY-MM-DD') AS fdate, fstate, pid
	             FROM FLIGHT;
            ";

            var flight = await _context.Flights.FindAsync(del.Fnumber);

            if (flight == null)
                return new JsonResult("Vuelo no encontrado");

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@fnumber", del.Fnumber);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        /// <summary>
        /// The FlightExists function checks if a flight with the given id exists in the Userws collection.
        /// </summary>
        /// <param name="id">The "id" parameter is a string that represents the email address of a user.</param>
        /// <returns>
        /// The method is returning a boolean value.
        /// </returns>
        private bool FlightExists(string id)
        {
            return (_context.Userws?.Any(e => e.Email == id)).GetValueOrDefault();
        }
    }
}