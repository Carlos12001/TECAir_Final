namespace TECAirAPI.Dtos
{
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
