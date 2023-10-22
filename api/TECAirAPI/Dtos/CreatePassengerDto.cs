namespace TECAirAPI.Dtos
{
   /* The CreatePassengerDto class is a data transfer object that contains properties for email, flight number, and stop ID. */
    public class CreatePassengerDto
    {
        public string Email { get; set; }
        public int Fnumber { get; set; }
        public int StopID { get; set; }
    }
}
