using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TECAirAPI.Models;

public partial class Seat
{
    public string Snumber { get; set; } = null!;

    public string? Sclass { get; set; }

    public string Pemail { get; set; } = null!;

    public string Pid { get; set; } = null!;
    [JsonIgnore]
    public virtual Passenger PemailNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual Plane PidNavigation { get; set; } = null!;
}
