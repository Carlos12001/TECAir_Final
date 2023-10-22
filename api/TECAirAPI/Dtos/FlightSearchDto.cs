namespace TECAirAPI.Dtos
{
   /* The FlightSearchDto class represents a data transfer object for searching flights, containing the IDs of the departure and arrival airports. */
    public class FlightSearchDto
    {
        public int SfromairportID { get; set; }
        public int StoairportID { get; set; }
    }
}
