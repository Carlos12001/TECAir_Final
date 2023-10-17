using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TECAirAPI.Models;

public partial class Userw
{
    public string Email { get; set; } = null!;

    public string Upassword { get; set; } = null!;

    public string Unumber { get; set; } = null!;

    public string Fname { get; set; } = null!;

    public string? Mname { get; set; }

    public string Lname1 { get; set; } = null!;

    public string Lname2 { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Airadmin> Airadmins { get; set; } = new List<Airadmin>();
    [JsonIgnore]
    public virtual Passenger? Passenger { get; set; }
    [JsonIgnore]
    public virtual ICollection<Student> Students { get; set; } = new List<Student>();
    [JsonIgnore]
    public virtual ICollection<Stop> Sids { get; set; } = new List<Stop>();
}
