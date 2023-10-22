using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace TECAirAPI.Functions
{
    /* The SQLfn class contains SQL queries for retrieving flight information and performing operations related to flights and passengers. */
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

/// <summary>
/// The function "AvailableF" returns the value of the variable "availableF" as a string.
/// </summary>
/// <returns>
/// The method is returning the value of the variable "availableF", which is a string.
/// </returns>
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

/// <summary>
/// The SpecificFlight function returns a string representing a specific flight.
/// </summary>
/// <returns>
/// The method is returning a string value.
/// </returns>
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
     /// <summary>
		 /// The function returns the value of the variable "availableS" as a string.
		 /// </summary>
		 /// <returns>
		 /// The method is returning a string value.
		 /// </returns>
		    public string AvailableS()
        {
            return availableS;
        }

		static string fromto = @"
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
				s.Sfrom = @sfrom AND
				s.Sto = @sto AND
				f.Fstate = true AND
				(
				   (s.Sdate = CURRENT_DATE AND s.Departure_hour > (CURRENT_TIME + INTERVAL '2 hour'))
				   OR 
				   s.Sdate > CURRENT_DATE
				) AND
				(SELECT COUNT(*) FROM PASSENGER WHERE Fno = f.Fnumber) < p.Capacity
			GROUP BY f.Fnumber, s.StopID, a1.City, a2.City, a2.Image, f.Fdate, f.Price;
		";

     /// <summary>
		 /// The function "Fromto" returns a string value.
		 /// </summary>
		 /// <returns>
		 /// The method is returning a string value.
		 /// </returns>
		    public string Fromto()
        {
            return fromto;
        }

		static string cpassenger = @"
			INSERT INTO PASSENGER(
				uemail, fno)
				VALUES (@email, @fnumber);
			
			INSERT INTO USER_STOP(
				uemail, sid)
				VALUES (@email, @stopid);
			
			UPDATE STUDENT
			SET Miles = Miles + 100
			WHERE Uemail = @email AND EXISTS (SELECT 1 FROM STUDENT WHERE Uemail = @email);

			SELECT U.Email, P.Pnumber, S.Departure_hour
			FROM USERW AS U
			JOIN PASSENGER AS P
			ON U.Email = P.Uemail
			JOIN FLIGHT AS F
			ON F.Fnumber = P.Fno
			JOIN STOP AS S
			ON F.Fnumber = S.Fno
			WHERE U.Email = @email AND
				  S.StopID = @stopid
		";

       /// <summary>
			 /// The function Cpassenger returns a string value.
			 /// </summary>
			 /// <returns>
			 /// The method is returning a string value.
			 /// </returns>
			  public string Cpassenger()
        {
            return cpassenger;
        }

        private static string passengerflightsTemplate = @"
			SELECT 
				p.Pnumber,
				f.Fnumber,
				s.StopID,
				afrom.City AS sfromCity,
				ato.City AS stoCity,
				to_char(f.Fdate, 'YYYY-MM-DD') AS fdate,
				f.Price AS fprice
			FROM PASSENGER p
			INNER JOIN FLIGHT f ON p.Fno = f.Fnumber
			INNER JOIN STOP s ON s.Fno = f.Fnumber
			INNER JOIN AIRPORT afrom ON s.Sfrom = afrom.AirportID
			INNER JOIN AIRPORT ato ON s.Sto = ato.AirportID
			WHERE p.Uemail = '{0}' AND
				  f.fstate = true AND p.checked_in=false;
		";

       /// <summary>
			 /// The function "PassengerFlights" takes an email as input and returns a formatted string using a template.
			 /// </summary>
			 /// <param name="email">The email parameter is a string that represents the email address of a passenger.</param>
			 /// <returns>
			 /// The method is returning a string that is formatted using the "passengerflightsTemplate" and the provided email parameter.
			 /// </returns>
			  public string PassengerFlights(string email)
        {
            // Inyeccion sql posible jeje.
            return string.Format(passengerflightsTemplate, email); // Esto inserta el email en la consulta.
        }

        private static string flightspromotions = @"
			SELECT 
				f.Fnumber,
				s.StopID,
				a1.City AS sfromCity,
				a2.City AS stoCity,
				a2.Image AS stoImage,
				to_char(f.Fdate, 'YYYY-MM-DD') AS fdate,
				f.Price AS Fprice,
				COALESCE(pr.dpercent, 0) AS depercent  -- Usamos COALESCE para manejar los nulos
			FROM FLIGHT f
			JOIN STOP s ON f.Fnumber = s.Fno
			JOIN AIRPORT a1 ON s.Sfrom = a1.AirportID
			JOIN AIRPORT a2 ON s.Sto = a2.AirportID
			LEFT JOIN PASSENGER pas ON pas.Fno = f.Fnumber
			LEFT JOIN PLANE p ON p.PlaneID = f.Pid
			LEFT JOIN PROMO pr ON pr.Fno = f.Fnumber  -- Usamos el correcto nombre de la tabla
			WHERE 
				f.Fstate = true AND
				(
				   (s.Sdate = CURRENT_DATE AND s.Departure_hour > (CURRENT_TIME + INTERVAL '2 hour'))
				   OR 
				   s.Sdate > CURRENT_DATE
				) AND
				(SELECT COUNT(*) FROM PASSENGER WHERE Fno = f.Fnumber) < p.Capacity
			GROUP BY f.Fnumber, s.StopID, a1.City, a2.City, a2.Image, f.Fdate, f.Price, pr.dpercent;
		";


        /// <summary>
				/// The function FPromotions returns a string containing flight promotions.
				/// </summary>
				/// <returns>
				/// The method is returning a string value.
				/// </returns>
				public string FPromotions()
        {
            return flightspromotions;
        }

    }
}
