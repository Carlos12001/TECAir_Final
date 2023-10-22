using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TECAirAPI.Models;

/* The BaggageColor class represents the color of a baggage item and includes properties for the baggage number, color, and a navigation property to the corresponding baggage item. */
public partial class BaggageColor
{
    public int Bno { get; set; }

    public string Color { get; set; } = null!;
    [JsonIgnore]
    public virtual Baggage BnoNavigation { get; set; } = null!;
}
