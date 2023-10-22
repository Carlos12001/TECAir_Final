using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Data;
using TECAirAPI.Dtos;
using TECAirAPI.Functions;
using TECAirAPI.Models;

namespace TECAirAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class SeatController : ControllerBase
    {
        private readonly TecairContext _context;
        private readonly IConfiguration _configuration;

        public SeatController(TecairContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("seat/asign")]
        public async Task<JsonResult> PostCreate(SeatDto seat)
        {
            string query = @"
                 INSERT INTO SEAT(
	                snumber, sclass, pno)
	             VALUES (@snumber, @sclass, @pno);

                 SELECT pno AS pnumber, snumber, sclass
                 FROM SEAT 
                 WHERE pno = @pno AND snumber = @snumber
            ";

            var passengerSeat = await _context.Seats
                .FirstOrDefaultAsync(u => u.Snumber == seat.Snumber && u.Pno == seat.Pnumber);

            if (passengerSeat != null)
                return new JsonResult("Ya existe un pasajero asignado a ese asiento");

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@snumber", seat.Snumber);
                    myCommand.Parameters.AddWithValue("@sclass", seat.Sclass);
                    myCommand.Parameters.AddWithValue("@pno", seat.Pnumber);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        [Route("seat/flight")]
        public async Task<JsonResult> PostGetSeats(CheckinDto flight)
        {
            string query = @"
                 SELECT S.snumber, S.sclass, S.pno
                 FROM PASSENGER AS P
                 JOIN SEAT AS S ON P.Pnumber = S.Pno
                 WHERE P.fno = (
                        SELECT fno
                        FROM PASSENGER
                        WHERE Pnumber = @pnumber
                 ) AND P.Checked_in = true;
            ";

            string capacityQuery = @"
                SELECT L.capacity
                FROM PASSENGER AS P
                JOIN FLIGHT AS F ON P.fno = F.Fnumber
                JOIN PLANE AS L ON F.Pid = L.PlaneID
                WHERE P.fno = (
                    SELECT fno
                    FROM PASSENGER
                    WHERE Pnumber = @pnumber
                )
                LIMIT 1;
            ";

            var seats = await _context.Passengers.FindAsync(flight.Pnumber);

            if (seats == null)
                return new JsonResult("No existe el pasajero");

            DataTable table = new DataTable();
            DataTable capacityTable = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TECAir");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                using (NpgsqlCommand capacityCommand = new NpgsqlCommand(capacityQuery, myCon))
                {
                    myCommand.Parameters.AddWithValue("@pnumber", flight.Pnumber);
                    capacityCommand.Parameters.AddWithValue("@pnumber", flight.Pnumber);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();

                    myReader = capacityCommand.ExecuteReader();
                    capacityTable.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            List<object> seatList = new List<object>();

            foreach (DataRow row in table.Rows)
            {
                seatList.Add(new
                {
                    snumber = row["snumber"].ToString(),
                    sclass = row["sclass"].ToString(),
                    pno = Convert.ToInt32(row["pno"])
                });
            }

            int capacity = Convert.ToInt32(capacityTable.Rows[0]["capacity"]);

            var result = new
            {
                capacity = capacity,
                seats = seatList
            };

            return new JsonResult(result);
        }
    }
}
