using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Npgsql;
using System.Data;
using System.Drawing;
using TECAirAPI.Dtos;
using TECAirAPI.Models;

namespace TECAirAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class BaggageController : ControllerBase
    {
        private readonly TecairContext _context;
        private readonly IConfiguration _configuration;

        public BaggageController(TecairContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("baggage/passenger")]
        public async Task<JsonResult> PostCreateBaggages(CreateBaggageDto baggageDto)
        {
            var baggageList = baggageDto.Baggages;
            DataTable table = new DataTable();

            foreach (var baggageInfo in baggageList)
            {
                // Insertar maleta en la tabla BAGGAGE
                string insertBaggageQuery = @"
                    INSERT INTO BAGGAGE (Weight, Pno)
                    VALUES (@Weight, @Pno)
                    RETURNING Bnumber;

                     SELECT *
                     FROM BAGGAGE
                     WHERE Pno = @pnumber
                ";

                NpgsqlDataReader myReader;
                string sqlDataSource = _configuration.GetConnectionString("TECAir");
                int baggageNumber;
                using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (NpgsqlCommand insertBaggageCommand = new NpgsqlCommand(insertBaggageQuery, myCon))
                    {
                        insertBaggageCommand.Parameters.AddWithValue("@Weight", baggageInfo.Weight);
                        insertBaggageCommand.Parameters.AddWithValue("@Pno", baggageDto.Pnumber);
                        insertBaggageCommand.Parameters.AddWithValue("@pnumber", baggageDto.Pnumber);
                        baggageNumber = (int)insertBaggageCommand.ExecuteScalar();

                        myReader = insertBaggageCommand.ExecuteReader();
                        table.Load(myReader);

                        myReader.Close();
                        myCon.Close();
                    }
                    myCon.Close();
                }

                // Insertar colores de la maleta en la tabla BAGGAGE_COLOR
                string insertColorsQuery = @"
                    INSERT INTO BAGGAGE_COLOR (Bno, Color)
                    VALUES (@Bno, @Color);
                ";

                foreach (var color in baggageInfo.Colors)
                {
                    using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
                    {
                        myCon.Open();
                        using (NpgsqlCommand insertColorsCommand = new NpgsqlCommand(insertColorsQuery, myCon))
                        {
                            insertColorsCommand.Parameters.AddWithValue("@Bno", baggageNumber);
                            insertColorsCommand.Parameters.AddWithValue("@Color", color);
                            insertColorsCommand.ExecuteNonQuery();
                        }
                        myCon.Close();
                    }
                }

            }

            return new JsonResult(table);
        }

    }
}
