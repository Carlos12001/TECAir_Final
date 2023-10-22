using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;
using TECAirAPI.Models;

namespace TECAirAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class AirportController : ControllerBase
    {
        /* The line `private readonly TecairContext _context;` is declaring a private readonly field named `_context` of type `TecairContext`. This field is used to hold an instance of the `TecairContext` class, which is a database context class used to interact with the database in the TECAirAPI application. The `readonly` keyword ensures that the value of `_context` cannot be changed once it is assigned in the constructor of the `AirportController` class. */
        private readonly TecairContext _context;
        /* The line `private readonly IConfiguration _configuration;` is declaring a private readonly field named `_configuration` of type `IConfiguration`. This field is used to hold an instance of the `IConfiguration` interface, which is used to access configuration settings in the TECAirAPI application. The `readonly` keyword ensures that the value of `_configuration` cannot be changed once it is assigned in the constructor of the `AirportController` class. */
        private readonly IConfiguration _configuration;

        /* The `public AirportController(TecairContext context, IConfiguration configuration)` is a constructor for the `AirportController` class. It takes two parameters: `context` of type `TecairContext` and `configuration` of type `IConfiguration`. */
        public AirportController(TecairContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

    /// <summary>
    /// The above function retrieves all data from the "Airport" table and returns it as a JSON result.
    /// </summary>
    /// <returns>
    /// The method is returning a JsonResult object, which contains the data from the "Airport" table in the form of a DataTable.
    /// </returns>
        [HttpGet]
        [Route("airport")]
        public JsonResult Get()
        {
            string query = @"
                 SELECT *
	             FROM Airport;
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
    }
}
