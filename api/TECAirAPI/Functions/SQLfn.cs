using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace TECAirAPI.Functions
{
    public class SQLfn
    {
		static string availableF = @"
			SELECT 
				f.Fnumber,
				s.StopID,
				a1.City AS sfromCity,
				a2.City AS StoCity,
				a2.Image AS StoImage,
				to_char(fDate, 'YYYY-MM-DD') AS fdate,
				f.Price AS Fprice
			FROM FLIGHT f
			JOIN STOP s ON f.Fnumber = s.Fno
			JOIN AIRPORT a1 ON s.Sfrom = a1.AirportID
			JOIN AIRPORT a2 ON s.Sto = a2.AirportID
			LEFT JOIN PASSENGER pas ON pas.Fno = f.Fnumber
			LEFT JOIN PLANE p ON p.PlaneID = f.Pid
			WHERE 
				f.Fstate = true AND
				(
				   (s.Sdate = CURRENT_DATE AND s.Departure_hour > (CURRENT_TIME + INTERVAL '2 hour'))
				   OR 
				   s.Sdate > CURRENT_DATE
				) AND
				(SELECT COUNT(*) FROM PASSENGER WHERE Fno = f.Fnumber) < p.Capacity
			GROUP BY f.Fnumber, s.StopID, a1.City, a2.City, a2.Image, f.Fdate, f.Price;
        ";

		public string AvailableF() {
			return availableF;
		}

		static string specificFlight = @"
			SELECT 
				f.Fnumber,
				s.StopID,
				a1.City AS SfromCity,
				a2.City AS StoCity,
				a2.Image AS StoImage,
				to_char(fDate, 'YYYY-MM-DD') AS fdate,
				f.Price AS Fprice,
				d.dpercent
			FROM FLIGHT f
			JOIN STOP s ON f.Fnumber = s.Fno
			JOIN AIRPORT a1 ON s.Sfrom = a1.AirportID
			JOIN AIRPORT a2 ON s.Sto = a2.AirportID
			LEFT JOIN PASSENGER pas ON pas.Fno = f.Fnumber
			LEFT JOIN PLANE p ON p.PlaneID = f.Pid
			LEFT JOIN PROMO d ON f.Fnumber = d.Fno 
			WHERE 
				f.Fnumber = @fnumber AND
				f.Fstate = true AND
				(
				   (s.Sdate = CURRENT_DATE AND s.Departure_hour > (CURRENT_TIME + INTERVAL '2 hour'))
				   OR 
				   s.Sdate > CURRENT_DATE
				) AND
				(SELECT COUNT(*) FROM PASSENGER WHERE Fno = f.Fnumber) < p.Capacity
			GROUP BY f.Fnumber, s.StopID, a1.City, a2.City, a2.Image, f.Fdate, f.Price, d.dpercent;
		";

        public string SpecificFlight()
        {
            return specificFlight;
        }

		static string availableS = @"
			SELECT 
				a1.airportid AS sfromairportid,
				a1.City AS sfromCity,
				a2.airportid AS Stoairportid,
				a2.City AS StoCity
			FROM FLIGHT f
			JOIN STOP s ON f.Fnumber = s.Fno
			JOIN AIRPORT a1 ON s.Sfrom = a1.AirportID
			JOIN AIRPORT a2 ON s.Sto = a2.AirportID
			LEFT JOIN PASSENGER pas ON pas.Fno = f.Fnumber
			LEFT JOIN PLANE p ON p.PlaneID = f.Pid
			WHERE 
				f.Fstate = true AND
				(
				   (s.Sdate = CURRENT_DATE AND s.Departure_hour > (CURRENT_TIME + INTERVAL '2 hour'))
				   OR 
				   s.Sdate > CURRENT_DATE
				) AND
				(SELECT COUNT(*) FROM PASSENGER WHERE Fno = f.Fnumber) < p.Capacity
			GROUP BY a1.airportid, a1.City, a2.airportid, a2.City
		";
        public string AvailableS()
        {
            return availableS;
        }
    }
}
