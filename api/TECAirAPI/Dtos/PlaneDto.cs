namespace TECAirAPI.Dtos
{
    /* The PlaneDto class represents a plane with properties for plane ID and capacity. */
    public class PlaneDto
    {
        public string Planeid { get; set; } = null!;

        public int Capacity { get; set; }
    }
}
