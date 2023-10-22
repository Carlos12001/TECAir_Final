using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TECAirAPI.Models;

/* The Airadmin class represents an administrator in an air travel system and contains properties for the admin ID, email, and a navigation property to the associated user. */
public partial class Airadmin
{
    public string Adminid { get; set; } = null!;

    public string Uemail { get; set; } = null!;
    [JsonIgnore]
    public virtual Userw UemailNavigation { get; set; } = null!;
}
