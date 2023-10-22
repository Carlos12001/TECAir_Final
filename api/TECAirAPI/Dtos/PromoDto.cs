namespace TECAirAPI.Dtos
{
   /* The PromoDto class represents a promotional item with properties for the item number, image, discount percentage, and final date. */
    public class PromoDto
    {
        public int Fno { get; set; }

        public string Image { get; set; } = null!;

        public int Dpercent { get; set; }

        public DateOnly FinalDate { get; set; }
    }
}
