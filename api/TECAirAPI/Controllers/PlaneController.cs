using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;
using System.Numerics;
using TECAirAPI.Dtos;
using TECAirAPI.Models;

namespace TECAirAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class PlaneController : ControllerBase
    {
        private readonly TecairContext _context;
        private readonly IConfiguration _configuration;

        public PlaneController(TecairContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        [Route("plane")]
        public JsonResult Get()
        {
            string query = @"
                 SELECT *
	             FROM PLANE;
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

        [HttpPut]
        [Route("plane/modify")]
        public async Task<JsonResult> Put(PlaneDto plane)
        {
            string query = @"
                 UPDATE PLANE
	             SET capacity=@capacity
	             WHERE planeid=@planeid;

                 SELECT *
	             FROM PLANE;
            ";

            var fl = await _context.Planes.FindAsync(plane.Planeid);

            if (fl != null)
                return new JsonResult("Avion no encontrado");

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@planeid", plane.Planeid);
                    myCommand.Parameters.AddWithValue("@capacity", plane.Capacity);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        [Route("plane/new")]
        public async Task<JsonResult> Post(PlaneDto plane)
        {
            string query = @"
                 INSERT INTO PLANE(
	                planeid, capacity)
	             VALUES (@planeid, @capacity);

                 SELECT *
	             FROM PLANE;
            ";

            var number = await _context.Planes.FindAsync(plane.Planeid);

            if (number != null)
                return new JsonResult("Avion ya existe");


            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@planeid", plane.Planeid);
                    myCommand.Parameters.AddWithValue("@capacity", plane.Capacity);
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
        [Route("plane/delete")]
        public async Task<JsonResult> Delete(PlaneDto del)
        {
            string query = @"
                 DELETE FROM PLANE
	             WHERE planeid=@planeid;

                 SELECT *
	             FROM PLANE;
            ";

            var fl = await _context.Planes.FindAsync(del.Planeid);

            if (fl == null)
                return new JsonResult("Avion no encontrado");

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@planeid", del.Planeid);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }
    }
}
