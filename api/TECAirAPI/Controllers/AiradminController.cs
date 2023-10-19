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
        private readonly TecairContext _context;
        private readonly IConfiguration _configuration;

        public AiradminController(TecairContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

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
