namespace TECAirAPI.Dtos
{
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
