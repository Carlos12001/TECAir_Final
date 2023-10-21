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
    public class StopController : ControllerBase
    {
        SQLfn sqlfn = new SQLfn();
        private readonly TecairContext _context;
        private readonly IConfiguration _configuration;

        public StopController(TecairContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        [Route("stop")]
        public JsonResult Get()
        {
            string query = @"
                 SELECT *
                 FROM STOP
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
        [Route("stop/available")]
        public JsonResult GetStops()
        {
            string query = sqlfn.AvailableS();

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

        [HttpPut]
        [Route("stop")]
        public async Task<JsonResult> Put(StopDto stop)
        {
            string query = @"
                 UPDATE STOP
	             SET sfrom=@sfrom, sto=@sto, sdate=@sdate, departure_hour=@departure_hour, arrival_hour=@arrival_hour
	             WHERE stopid=@stopid;
            ";

            var layover = await _context.Stops.FindAsync(stop.Stopid);

            if (layover == null)
                return new JsonResult("Escala no encontrada");

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@stopid", stop.Stopid);
                    myCommand.Parameters.AddWithValue("@sfrom", stop.Sfrom);
                    myCommand.Parameters.AddWithValue("@sto", stop.Sto);
                    myCommand.Parameters.AddWithValue("@departure_hour", stop.DepartureHour);
                    myCommand.Parameters.AddWithValue("@arrival_hour", stop.ArrivalHour);
                    myCommand.Parameters.AddWithValue("@sdate", stop.Sdate);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Escala actualizada");
        }

        [HttpPost]
        [Route("stop")]
        public async Task<JsonResult> Post(StopDto stop)
        {
            string query = @"
                 INSERT INTO STOP(
	                    sfrom, sto, sdate, departure_hour, arrival_hour, fno)
	             VALUES (@sfrom, @sto, @sdate, @departure_hour, @arrival_hour, @fno);
            ";

            var from = await _context.Airports.FindAsync(stop.Sfrom);
            var to = await _context.Airports.FindAsync(stop.Sto);
            var plane = await _context.Flights.FindAsync(stop.Fno);

            if (from == null)
                return new JsonResult("Origen no encontrado");
            if (to == null)
                return new JsonResult("Destino no encontrado");
            if (plane == null)
                return new JsonResult("Vuelo no encontrado");

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@sfrom", stop.Sfrom);
                    myCommand.Parameters.AddWithValue("@sto", stop.Sto);
                    myCommand.Parameters.AddWithValue("@sdate", stop.Sdate);
                    myCommand.Parameters.AddWithValue("@departure_hour", stop.DepartureHour);
                    myCommand.Parameters.AddWithValue("@arrival_hour", stop.ArrivalHour);
                    myCommand.Parameters.AddWithValue("@fno", stop.Fno);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Escala aÃ±adida");
        }

        [HttpDelete]
        [Route("stop/{id}")]
        public async Task<JsonResult> Delete(int id)
        {
            string query = @"
                 DELETE FROM STOP
	             WHERE stopid=@stopid;
            ";

            var flight = await _context.Flights.FindAsync(id);

            if (flight == null)
                return new JsonResult("Escala no encontradA");

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@stopid", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Escala eliminada");
        }
    }
}
