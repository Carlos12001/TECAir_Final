using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;
using TECAirAPI.Dtos;
using TECAirAPI.Functions;
using TECAirAPI.Models;

namespace TECAirAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class PassengerController : ControllerBase
    {
        /* The line `SQLfn sqlfn = new SQLfn();` is creating an instance of the `SQLfn` class. This allows the controller to access the methods and properties defined in the `SQLfn` class. */
        SQLfn sqlfn = new SQLfn();
        private readonly TecairContext _context;
        private readonly IConfiguration _configuration;

        /* The `public PassengerController(TecairContext context, IConfiguration configuration)` is a constructor for the `PassengerController` class. It takes two parameters: `context` of type `TecairContext` and `configuration` of type `IConfiguration`. */
        public PassengerController(TecairContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

       /// <summary>
       /// This function retrieves all the records from the PASSENGER table and returns them as a JSON result.
       /// </summary>
       /// <returns>
       /// The method is returning a JsonResult object, which contains the data from the PASSENGER table in the TECAir database.
       /// </returns>
        [HttpGet]
        [Route("passenger")]
        public JsonResult Get()
        {
            string query = @"
                 SELECT *
                 FROM PASSENGER
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
        /// This C# function creates a passenger by calling a SQL function and returns the result as a JSON object.
        /// </summary>
        /// <param name="CreatePassengerDto">CreatePassengerDto is a data transfer object (DTO) that contains the information needed to create a passenger. It likely has properties such as:</param>
        /// <returns>
        /// The method is returning a JsonResult object.
        /// </returns>
        [HttpPost]
        [Route("passenger/create")]
        public async Task<JsonResult> PostCreate(CreatePassengerDto create)
        {
            string query = sqlfn.Cpassenger(); // SQL function stored in SQLfn class to create a passenger 

            var email = await _context.Userws.FindAsync(create.Email);
            var flight = await _context.Flights.FindAsync(create.Fnumber);
            var stop = await _context.Stops.FindAsync(create.StopID);

            if (email == null)
                return new JsonResult("No existe un usuario asociado a ese email");
            if (flight == null)
                return new JsonResult("No existe numero de vuelo");
            if (stop == null)
                return new JsonResult("No existe numero de escala");

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@email", create.Email);
                    myCommand.Parameters.AddWithValue("@fnumber", create.Fnumber);
                    myCommand.Parameters.AddWithValue("@stopid", create.StopID);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

/// <summary>
/// The above function updates the check-in status of a passenger in a database and returns a JSON result.
/// </summary>
/// <param name="CheckinDto">CheckinDto is a data transfer object that represents the information needed to perform a passenger check-in. It likely contains properties such as "Pnumber" (passenger number) to identify the passenger to be checked in.</param>
/// <returns>
/// The method is returning a JsonResult object.
/// </returns>
        [HttpPut]
        [Route("passenger/checkin")]
        public async Task<JsonResult> Put(CheckinDto passenger)
        {
            string query = @"
                 UPDATE PASSENGER
	             SET checked_in = true
	             WHERE pnumber=@pnumber;

                 SELECT Pnumber
                 FROM PASSENGER
                 WHERE pnumber=@pnumber
            ";

            var email = await _context.Passengers.FindAsync(passenger.Pnumber);

            if (email == null)
                return new JsonResult("No existe pasajero asociado a ese numero");

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@pnumber", passenger.Pnumber);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Usuario actualizado");
        }
    }
}
