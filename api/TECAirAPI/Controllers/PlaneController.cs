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

       /// <summary>
       /// This function retrieves all rows from the PLANE table in a PostgreSQL database and returns them as a JSON result.
       /// </summary>
       /// <returns>
       /// The method is returning a JsonResult object, which contains the data from the PLANE table in the TECAir database.
       /// </returns>
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

/// <summary>
/// The above function is a C# code snippet that handles a PUT request to modify the capacity of a plane in a database.
/// </summary>
/// <param name="PlaneDto">A data transfer object (DTO) representing a plane. It contains the following properties:</param>
/// <returns>
/// The code is returning a JsonResult object.
/// </returns>
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

       /// <summary>
       /// The above function is a C# code snippet that handles a HTTP POST request to create a new plane record in a database table.
       /// </summary>
       /// <param name="PlaneDto">PlaneDto is a data transfer object that represents a plane. It contains the following properties:</param>
       /// <returns>
       /// The method is returning a JsonResult object.
       /// </returns>
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
       /// <summary>
       /// This C# function deletes a plane from a database and returns the updated list of planes.
       /// </summary>
       /// <param name="PlaneDto">The PlaneDto is a data transfer object that represents a plane. It contains properties such as PlaneId, which is the unique identifier of the plane.</param>
       /// <returns>
       /// The method is returning a JsonResult object.
       /// </returns>
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
