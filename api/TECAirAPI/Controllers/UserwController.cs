using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using TECAirAPI.Dtos;
using TECAirAPI.Models;

namespace TECAirAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class UserwController : ControllerBase
    {
        private readonly TecairContext _context;
        private readonly IConfiguration _configuration;

        public UserwController(TecairContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        [Route("user")]
        public JsonResult Get()
        {
            string query = @"
                 SELECT U.*, A.adminid, S.studentid, S.university, S.miles
                 FROM USERW AS U
                 LEFT JOIN STUDENT AS S
                 ON U.Email = S.Uemail
                 LEFT JOIN AIRADMIN AS A 
                 ON U.Email = A.Uemail
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
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
        [Route("user")]
        public JsonResult Put(Userw user)
        {
            string query = @"
                 UPDATE USERW
	             SET upassword=@upassword, unumber=@unumber, fname=@fname, mname=@mname, lname1=@lname1, lname2=@lname2
	             WHERE email=@email;
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@email", user.Email);
                    myCommand.Parameters.AddWithValue("@upassword", user.Upassword);
                    myCommand.Parameters.AddWithValue("@unumber", user.Unumber);
                    myCommand.Parameters.AddWithValue("@fname", user.Fname);
                    myCommand.Parameters.AddWithValue("@mname", user.Mname);
                    myCommand.Parameters.AddWithValue("@lname1", user.Lname1);
                    myCommand.Parameters.AddWithValue("@lname2", user.Lname2);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Usuario actualizado");
        }

        [HttpPost]
        [Route("user")]
        public async Task<JsonResult> Post(Userw user)
        {
            string query = @"
                 INSERT INTO USERW(
	                email, upassword, unumber, fname, mname, lname1, lname2)
	             VALUES (@email, @upassword, @unumber, @fname, @mname, @lname1, @lname2);
            ";

            var email= await _context.Userws.FindAsync(user.Email);

            if (email != null)
                return new JsonResult("Ya hay un usuario existente con este correo");

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@email", user.Email);
                    myCommand.Parameters.AddWithValue("@upassword", user.Upassword);
                    myCommand.Parameters.AddWithValue("@unumber", user.Unumber);
                    myCommand.Parameters.AddWithValue("@fname", user.Fname);
                    myCommand.Parameters.AddWithValue("@mname", user.Mname);
                    myCommand.Parameters.AddWithValue("@lname1", user.Lname1);
                    myCommand.Parameters.AddWithValue("@lname2", user.Lname2);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Usuario añadido");
        }

        [HttpPost]
        [Route("user/new")]
        public async Task<JsonResult> Post(UserDto user)
        {
            // Primero, verifiquemos si el email ya existe
            var existingEmail = await _context.Userws.FindAsync(user.Email);
            if (existingEmail != null)
                return new JsonResult("Ya hay un usuario existente con este correo");

            // Conexión y consulta para USERW
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();

                // Inserción en USERW
                string query = @"
                INSERT INTO USERW(email, upassword, unumber, fname, mname, lname1, lname2)
                VALUES (@email, @upassword, @unumber, @fname, @mname, @lname1, @lname2);
                ";

                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@email", user.Email);
                    myCommand.Parameters.AddWithValue("@upassword", user.Upassword);
                    myCommand.Parameters.AddWithValue("@unumber", user.Unumber);
                    myCommand.Parameters.AddWithValue("@fname", user.Fname);
                    myCommand.Parameters.AddWithValue("@mname", user.Mname ?? (object)DBNull.Value);
                    myCommand.Parameters.AddWithValue("@lname1", user.Lname1);
                    myCommand.Parameters.AddWithValue("@lname2", user.Lname2);

                    await myCommand.ExecuteNonQueryAsync();
                }

                // Suponiendo que el campo 'Studentid' y 'Adminid' existen en la clase Userw
                // Inserción en STUDENT, si corresponde
                if (!string.IsNullOrEmpty(user.Studentid))
                {
                    string studentQuery = @"
                    INSERT INTO STUDENT(StudentID, University, Miles, Uemail)
                    VALUES (@StudentID, @University, @Miles, @Uemail);
                    ";

                    using (NpgsqlCommand studentCommand = new NpgsqlCommand(studentQuery, myCon))
                    {
                        studentCommand.Parameters.AddWithValue("@StudentID", user.Studentid);
                        studentCommand.Parameters.AddWithValue("@University", user.University);
                        studentCommand.Parameters.AddWithValue("@Miles", user.Miles);
                        studentCommand.Parameters.AddWithValue("@Uemail", user.Email);

                        await studentCommand.ExecuteNonQueryAsync();
                    }
                }

                // Inserción en AIRADMIN, si corresponde
                if (!string.IsNullOrEmpty(user.Adminid))
                {
                    string adminQuery = @"
                    INSERT INTO AIRADMIN(AdminID, Uemail)
                    VALUES (@AdminID, @Uemail);
                    ";

                    using (NpgsqlCommand adminCommand = new NpgsqlCommand(adminQuery, myCon))
                    {
                        adminCommand.Parameters.AddWithValue("@AdminID", user.Adminid);
                        adminCommand.Parameters.AddWithValue("@Uemail", user.Email);

                        await adminCommand.ExecuteNonQueryAsync();
                    }
                }

                myCon.Close();
            }
            // Retornar el JSON recibido como respuesta
            return new JsonResult(user);

        }


        [HttpPost]
        [Route("user/login")]
        public async Task<JsonResult> PostLogin(LoginDto user)
        {
            var userEntity = await _context.Userws
                .FirstOrDefaultAsync(u => u.Email == user.Email && u.Upassword == user.Password);

            if (userEntity == null)
                return new JsonResult("Credenciales inválidas");

            return new JsonResult("Sesion iniciada");
        }

        [HttpDelete]
        [Route("user/{email}")]
        public JsonResult Delete(string email)
        {
            string query = @"
                 DELETE FROM USERW
	             WHERE email=@email;
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@email", email);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Usuario eliminado");
        }

        private bool UserwExists(string id)
        {
            return (_context.Userws?.Any(e => e.Email == id)).GetValueOrDefault();
        }
    }
}
