using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TECAirAPI.Models;

public partial class Baggage
{
    public int Bnumber { get; set; }

    public string Weight { get; set; } = null!;

    public string Pemail { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<BaggageColor> BaggageColors { get; set; } = new List<BaggageColor>();
    [JsonIgnore]
    public virtual Passenger PemailNavigation { get; set; } = null!;
}
