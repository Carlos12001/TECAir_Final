namespace TECAirAPI.Dtos
{
/* The CreateBaggageDto class represents a data transfer object for creating a baggage with a passenger number and a list of baggage information. */
    public class CreateBaggageDto
    {
        public int Pnumber { get; set; }
        public List<BaggageInfo> Baggages { get; set; }

    }
    public class BaggageInfo
    {
        public string Weight { get; set; }
        public List<string> Colors { get; set; }
    }
}
