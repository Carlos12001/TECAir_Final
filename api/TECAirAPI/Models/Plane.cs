using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TECAirAPI.Models;

public partial class Plane
{
    public string Planeid { get; set; } = null!;

    public int Capacity { get; set; }
    [JsonIgnore]
    public virtual ICollection<Flight> Flights { get; set; } = new List<Flight>();
}
