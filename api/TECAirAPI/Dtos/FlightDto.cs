namespace TECAirAPI.Dtos
{
   /* The FlightDto class represents a flight with properties such as flight number, departure and arrival locations, price, date, state, and passenger ID. */
    public class FlightDto
    {
        public int Fnumber { get; set; }

        public int Ffrom { get; set; }

        public int Fto { get; set; }

        public int Price { get; set; }

        public DateOnly Fdate { get; set; }

        public bool Fstate { get; set; }

        public string Pid { get; set; } = null!;
    }
}
