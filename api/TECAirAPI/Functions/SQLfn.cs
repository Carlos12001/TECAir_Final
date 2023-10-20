using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace TECAirAPI.Functions
{
    public class SQLfn
    {
		static string available = @"
			SELECT 
				f.Fnumber,
				s.StopID,
				a1.City AS SfromCity,
				a2.City AS StoCity,
				a2.Image AS StoImage,
				f.Fdate,
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

		public string Available() {
			return available;
		}
    }
}
