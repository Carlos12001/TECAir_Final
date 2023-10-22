using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TECAirAPI.Models;

/* The class "Airport" represents an airport and contains properties such as airport ID, code, city, name, image, and collections of flights and stops. */
public partial class Airport
{
    public int Airportid { get; set; }

    public string Code { get; set; } = null!;

    public string City { get; set; } = null!;

    public string Aname { get; set; } = null!;

    public string? Image { get; set; }
    [JsonIgnore]
    public virtual ICollection<Flight> FlightFfromNavigations { get; set; } = new List<Flight>();
    [JsonIgnore]
    public virtual ICollection<Flight> FlightFtoNavigations { get; set; } = new List<Flight>();
    [JsonIgnore]
    public virtual ICollection<Stop> StopSfromNavigations { get; set; } = new List<Stop>();
    [JsonIgnore]
    public virtual ICollection<Stop> StopStoNavigations { get; set; } = new List<Stop>();
}
