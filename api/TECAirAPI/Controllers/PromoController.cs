using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;
using TECAirAPI.Dtos;
using TECAirAPI.Models;

namespace TECAirAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class PromoController : ControllerBase
    {
        private readonly TecairContext _context;
        private readonly IConfiguration _configuration;

        public PromoController(TecairContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

      /// <summary>
      /// The above function is a GET request that retrieves data from a PostgreSQL database table called "PROMO" and returns it as a JSON result.
      /// </summary>
      /// <returns>
      /// The method is returning a JsonResult object, which contains the data from the "PROMO" table in the TECAir database.
      /// </returns>
        [HttpGet]
        [Route("promo")]
        public JsonResult Get()
        {
            string query = @"
                 SELECT fno, image, dpercent, to_char(final_date, 'YYYY-MM-DD') AS final_date
	             FROM PROMO;
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
        /// This C# function updates a promo in a database and returns the updated promo information as a JSON result.
        /// </summary>
        /// <param name="PromoDto">PromoDto is a data transfer object that represents a promo. It contains the following properties:</param>
        /// <returns>
        /// The method is returning a JsonResult object.
        /// </returns>
        [HttpPut]
        [Route("promo/modify")]
        public async Task<JsonResult> Put(PromoDto promo)
        {
            string query = @"
                 UPDATE public.promo
	             SET image=@image, dpercent=@dpercent, final_date=@final_date
	             WHERE fno=@fno;

                 SELECT fno, image, dpercent, to_char(final_date, 'YYYY-MM-DD') AS final_date
	             FROM PROMO;
            ";

            var fl = await _context.Promos.FindAsync(promo.Fno);

            if (fl == null)
                return new JsonResult("Promo no encontrada");

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@fno", promo.Fno);
                    myCommand.Parameters.AddWithValue("@image", promo.Image);
                    myCommand.Parameters.AddWithValue("@dpercent", promo.Dpercent);
                    myCommand.Parameters.AddWithValue("@final_date", promo.FinalDate);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        /// <summary>
        /// The above function is a C# code snippet that handles a POST request to create a new promo in a database and returns the created promo as a JSON result.
        /// </summary>
        /// <param name="PromoDto">PromoDto is a data transfer object that represents the data for creating a new promo. It contains the following properties:</param>
        /// <returns>
        /// The method is returning a JsonResult object.
        /// </returns>
        [HttpPost]
        [Route("promo/new")]
        public async Task<JsonResult> Post(PromoDto promo)
        {
            string query = @"
                 INSERT INTO PROMO(
	                fno, image, dpercent, final_date)
	             VALUES (@fno, @image, @dpercent, @final_date);

                 SELECT fno, image, dpercent, to_char(final_date, 'YYYY-MM-DD') AS final_date
	             FROM PROMO;
            ";

            var number = await _context.Flights.FindAsync(promo.Fno);

            if (number == null)
                return new JsonResult("Numero de vuelo no existe");


            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@fno", promo.Fno);
                    myCommand.Parameters.AddWithValue("@image", promo.Image);
                    myCommand.Parameters.AddWithValue("@dpercent", promo.Dpercent);
                    myCommand.Parameters.AddWithValue("@final_date", promo.FinalDate);
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
        /// This C# function deletes a promo from a database table and returns the updated list of promos.
        /// </summary>
        /// <param name="PromoDto">PromoDto is a data transfer object that represents a promo. It contains the following properties:</param>
        /// <returns>
        /// The method is returning a JsonResult object.
        /// </returns>
        [HttpDelete]
        [Route("promo/delete")]
        public async Task<JsonResult> Delete(PromoDto del)
        {
            string query = @"
                 DELETE FROM PROMO
	             WHERE fno=@fno;

                 SELECT fno, image, dpercent, to_char(final_date, 'YYYY-MM-DD') AS final_date
	             FROM PROMO;
            ";

            var fl = await _context.Promos.FindAsync(del.Fno);

            if (fl == null)
                return new JsonResult("Promo no encontrada");

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@fno", del.Fno);
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
