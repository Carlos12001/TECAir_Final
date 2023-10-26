﻿using System;
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

       /* The `UserwController` constructor is initializing the private fields `_context` and `_configuration` with the provided parameters `context` and `configuration`, respectively. These fields are used throughout the controller to access the database context and configuration settings. */
        public UserwController(TecairContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        /// <summary>
        /// This function retrieves user data from multiple tables in a database and returns it as a JSON result.
        /// </summary>
        /// <returns>
        /// The method is returning a JsonResult object, which contains the data from the "table" DataTable.
        /// </returns>
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

        /// <summary>
        /// The above function is a PUT endpoint in a C# API that updates a user's information in a database.
        /// </summary>
        /// <param name="Userw">The "Userw" parameter is a model or class that represents a user in your application. It contains properties such as "Email", "Upassword", "Unumber", "Fname", "Mname", "Lname1", and "Lname2". These properties are used to update</param>
        /// <returns>
        /// The method is returning a JsonResult object with the message "Usuario actualizado" (User updated).
        /// </returns>
        [HttpPut]
        [Route("user")]
        public async Task<JsonResult> Put(Userw user)
        {
            string query = @"
                 UPDATE USERW
	             SET upassword=@upassword, unumber=@unumber, fname=@fname, mname=@mname, lname1=@lname1, lname2=@lname2
	             WHERE email=@email;
            ";

            var email = await _context.Userws.FindAsync(user.Email);

            if (email == null)
                return new JsonResult("No hay usuario existente con este correo");

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
                    myCommand.Parameters.AddWithValue("@mname", user.Mname ?? (object)DBNull.Value);
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

       /// <summary>
       /// This C# function handles a POST request to add a new user to a database table.
       /// </summary>
       /// <param name="Userw">The Userw class represents a user object with the following properties:</param>
       /// <returns>
       /// The method is returning a JsonResult.
       /// </returns>
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
                    myCommand.Parameters.AddWithValue("@mname", user.Mname ?? (object)DBNull.Value);
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

        /// <summary>
        /// This C# function handles a POST request to create a new user, including inserting the user data into the USERW table and optionally into the STUDENT and AIRADMIN tables, and then returns the updated user data as a JSON response.
        /// </summary>
        /// <param name="UserDto">The UserDto is a data transfer object that represents the user information being passed in the HTTP POST request. It contains the following properties:</param>
        /// <returns>
        /// The method is returning a JsonResult object.
        /// </returns>
        [HttpPost]
        [Route("user/new")]
        public async Task<JsonResult> Post(UserDto user)
        {
            // Primero, verifiquemos si el email ya existe
            var existingEmail = await _context.Userws.FindAsync(user.Email);
            if (existingEmail != null)
                return new JsonResult("Ya hay un usuario existente con este correo");

            DataTable table = new DataTable();

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
                        studentCommand.Parameters.AddWithValue("@University", user.University ?? (object)DBNull.Value);
                        studentCommand.Parameters.AddWithValue("@Miles", user.Miles ?? (object)DBNull.Value);
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

                string Lquery = @"
                 SELECT U.*, A.adminid, S.studentid, S.university, S.miles
                 FROM USERW AS U
                 LEFT JOIN STUDENT AS S
                 ON U.Email = S.Uemail
                 LEFT JOIN AIRADMIN AS A 
                 ON U.Email = A.Uemail
                ";

                
                NpgsqlDataReader myReader;
                using (NpgsqlCommand myCommand = new NpgsqlCommand(Lquery, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                }

                myCon.Close();
            }
            // Retornar el JSON recibido como respuesta
            return new JsonResult(table);

        }


       /// <summary>
       /// This function handles the login process for a user by checking their credentials and returning a message indicating whether the login was successful or not.
       /// </summary>
       /// <param name="LoginDto">LoginDto is a data transfer object (DTO) that represents the user's login information. It typically contains properties such as Email and Password, which are used to authenticate the user during the login process.</param>
       /// <returns>
       /// The method is returning a JsonResult. If the userEntity is null, it returns a JsonResult with the message "Credenciales inválidas". Otherwise, it returns a JsonResult with the message "Sesion iniciada".
       /// </returns>
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

       /// <summary>
       /// The above function is a C# code snippet that handles a DELETE request to delete a user from a database table based on their email.
       /// </summary>
       /// <param name="email">The "email" parameter is the email address of the user that you want to delete from the "USERW" table.</param>
       /// <returns>
       /// The method is returning a JsonResult object with the message "Usuario eliminado" (User deleted).
       /// </returns>
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

        [HttpDelete]
        [Route("user/delget/{email}")]
        public JsonResult Delget(string email)
        {
            string sqlDataSource = _configuration.GetConnectionString("TECAir");

            // Primero, realizamos la operación de eliminación
            string deleteQuery = @"
                DELETE FROM USERW
                WHERE Email=@email;
            ";

            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(deleteQuery, myCon))
                {
                    myCommand.Parameters.AddWithValue("@email", email);
                    myCommand.ExecuteNonQuery();
                }
                myCon.Close();
            }

            // Después, obtenemos la lista actualizada de usuarios
            DataTable table = new DataTable();
            string selectQuery = @"
                 SELECT U.*, A.adminid, S.studentid, S.university, S.miles
                 FROM USERW AS U
                 LEFT JOIN STUDENT AS S ON U.Email = S.Uemail
                 LEFT JOIN AIRADMIN AS A ON U.Email = A.Uemail;
            ";

            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(selectQuery, myCon))
                {
                    NpgsqlDataReader myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                }
                myCon.Close();
            }

            return new JsonResult(table); // Retornamos la lista actualizada de usuarios
        }


        /// <summary>
        /// The function checks if a user with a given email exists in the Userws collection.
        /// </summary>
        /// <param name="id">The `id` parameter is a string that represents the email of a user.</param>
        /// <returns>
        /// The method is returning a boolean value.
        /// </returns>
        private bool UserwExists(string id)
        {
            return (_context.Userws?.Any(e => e.Email == id)).GetValueOrDefault();
        }
    }
}
