namespace TECAirAPI.Dtos
{
   /* The SeatDto class represents a seat with a passenger number, seat number, and optional seat class. */
    public class SeatDto
    {
        public int Pnumber { get; set; }
        public string Snumber { get; set; }
        public string? Sclass { get; set; }
    }
}
