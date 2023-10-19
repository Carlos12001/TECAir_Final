using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TECAirAPI.Models;

public partial class BaggageColor
{
    public int Bno { get; set; }

    public string Color { get; set; } = null!;
    [JsonIgnore]
    public virtual Baggage BnoNavigation { get; set; } = null!;
}
