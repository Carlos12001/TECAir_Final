namespace TECAirAPI.Dtos
{
    public class PromoDto
    {
        public int Fno { get; set; }

        public string Image { get; set; } = null!;

        public int Dpercent { get; set; }

        public DateOnly FinalDate { get; set; }
    }
}
