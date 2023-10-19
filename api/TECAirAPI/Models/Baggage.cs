using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TECAirAPI.Models;

public partial class Baggage
{
    public int Bnumber { get; set; }

    public string Weight { get; set; } = null!;

    public int Pno { get; set; }
    [JsonIgnore]
    public virtual ICollection<BaggageColor> BaggageColors { get; set; } = new List<BaggageColor>();
    [JsonIgnore]
    public virtual Passenger PnoNavigation { get; set; } = null!;
}
