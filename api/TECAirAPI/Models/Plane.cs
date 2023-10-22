using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TECAirAPI.Models;

/* The Plane class represents a plane with properties such as Planeid and Capacity, and a collection of Flights. */
public partial class Plane
{
    public string Planeid { get; set; } = null!;

    public int Capacity { get; set; }
    [JsonIgnore]
    public virtual ICollection<Flight> Flights { get; set; } = new List<Flight>();
}
