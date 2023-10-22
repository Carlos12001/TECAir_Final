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

        public FlightController(TecairContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

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

        private bool FlightExists(string id)
        {
            return (_context.Userws?.Any(e => e.Email == id)).GetValueOrDefault();
        }
    }
}