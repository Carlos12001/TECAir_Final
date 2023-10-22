using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Data;
using TECAirAPI.Dtos;
using TECAirAPI.Models;

namespace TECAirAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class AiradminController : ControllerBase
    {
      /* The line `private readonly TecairContext _context;` is declaring a private readonly field `_context` of type `TecairContext`. This field is used to hold an instance of the `TecairContext` class, which is a database context class used for interacting with the database in the TECAirAPI application. The `readonly` keyword ensures that the field can only be assigned a value once, typically in the constructor of the class. */
        private readonly TecairContext _context;
        /* The line `private readonly IConfiguration _configuration;` is declaring a private readonly field `_configuration` of type `IConfiguration`. This field is used to hold an instance of the `IConfiguration` interface, which is used to access configuration settings in the application. The `IConfiguration` interface provides methods and properties to read configuration values from various sources, such as appsettings.json files or environment variables. In this case, it is used to retrieve the connection string for the database from the configuration settings. */
        private readonly IConfiguration _configuration;

      /* The code `public AiradminController(TecairContext context, IConfiguration configuration)` is a constructor for the `AiradminController` class. It takes two parameters: `context` of type `TecairContext` and `configuration` of type `IConfiguration`. */
        public AiradminController(TecairContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

       /// <summary>
       /// This function retrieves all records from the AIRADMIN table and returns them as a JSON result.
       /// </summary>
       /// <returns>
       /// The method is returning a JsonResult object, which contains the data from the "AIRADMIN" table in the TECAir database.
       /// </returns>
        [HttpGet]
        [Route("admin")]
        public JsonResult Get()
        {
            string query = @"
                 SELECT *
                 FROM AIRADMIN
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
     /// The above function is a C# code snippet that handles a POST request for user login, checking if the user is an admin or a regular user.
     /// </summary>
     /// <param name="LoginDto">LoginDto is a data transfer object that contains the user's email and password. It is used to receive the user's login credentials from the client-side and pass them to the server-side for authentication.</param>
     /// <returns>
     /// The method is returning a JsonResult. The content of the JsonResult depends on the conditions in the if statements. If the userEntity is null, it returns "Credenciales inválidas". If the admin is null, it returns "Usuario no es admin". Otherwise, it returns "Sesion iniciada".
     /// </returns>
        [HttpPost]
        [Route("admin/login")]
        public async Task<JsonResult> PostLogin(LoginDto user)
        {
            var admin = await _context.Airadmins.FirstOrDefaultAsync(u => u.Uemail == user.Email);

            var userEntity = await _context.Userws
                .FirstOrDefaultAsync(u => u.Email == user.Email && u.Upassword == user.Password);

            if (userEntity == null) 
                return new JsonResult("Credenciales inválidas");
            if (admin == null)
                return new JsonResult("Usuario no es admin");

            return new JsonResult("Sesion iniciada");
        }
    }
}
