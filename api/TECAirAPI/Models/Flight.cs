using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TECAirAPI.Models;

public partial class Flight
{
    public int Fnumber { get; set; }

    public int Ffrom { get; set; }

    public int Fto { get; set; }

    public int Price { get; set; }

    public DateOnly Fdate { get; set; }

    public bool Fstate { get; set; }

    public string Pid { get; set; } = null!;
    [JsonIgnore]
    public virtual Airport FfromNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual Airport FtoNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Passenger> Passengers { get; set; } = new List<Passenger>();
    [JsonIgnore]
    public virtual Plane PidNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Promo> Promos { get; set; } = new List<Promo>();
    [JsonIgnore]
    public virtual ICollection<Stop> Stops { get; set; } = new List<Stop>();
}
