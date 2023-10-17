using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TECAirAPI.Models;

public partial class Airadmin
{
    public string Adminid { get; set; } = null!;

    public string Uemail { get; set; } = null!;
    [JsonIgnore]
    public virtual Userw UemailNavigation { get; set; } = null!;
}
