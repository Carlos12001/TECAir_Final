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
        SQLfn sqlfn = new SQLfn();
        private readonly TecairContext _context;
        private readonly IConfiguration _configuration;

        public PassengerController(TecairContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

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
