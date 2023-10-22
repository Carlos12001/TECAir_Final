namespace TECAirAPI.Dtos
{
   /* The StopDto class represents a stop with various properties such as stop ID, source and destination IDs, date, departure and arrival hours, and flight number. */
    public class StopDto
    {
        public int Stopid { get; set; }

        public int Sfrom { get; set; }

        public int Sto { get; set; }

        public DateOnly Sdate { get; set; }

        public TimeOnly DepartureHour { get; set; }

        public TimeOnly ArrivalHour { get; set; }

        public int Fno { get; set; }
    }
}
