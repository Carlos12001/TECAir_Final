using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TECAirAPI.Models;

public partial class Promo
{
    public int Fno { get; set; }

    public string Image { get; set; } = null!;

    public int Dpercent { get; set; }

    public DateOnly FinalDate { get; set; }
    [JsonIgnore]
    public virtual Flight FnoNavigation { get; set; } = null!;
}
