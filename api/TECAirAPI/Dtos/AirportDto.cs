namespace TECAirAPI.Dtos
{
/* The `AirportDto` class represents an airport with properties for its ID, code, city, name, and an optional image. */
    public class AirportDto
    {
        public int Airportid { get; set; }

        public string Code { get; set; } = null!;

        public string City { get; set; } = null!;

        public string Aname { get; set; } = null!;

        public string? Image { get; set; }
    }
}
