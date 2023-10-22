using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TECAirAPI.Models;

/* The Seat class represents a seat with a seat number, class, passenger number, and a reference to the passenger occupying the seat. */
public partial class Seat
{
    public string Snumber { get; set; } = null!;

    public string? Sclass { get; set; }

    public int Pno { get; set; }
    [JsonIgnore]
    public virtual Passenger PnoNavigation { get; set; } = null!;
}
