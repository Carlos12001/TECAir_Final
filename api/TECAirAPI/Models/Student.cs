using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TECAirAPI.Models;

public partial class Student
{
    public string Studentid { get; set; } = null!;

    public string University { get; set; } = null!;

    public int? Miles { get; set; }

    public string Uemail { get; set; } = null!;
    [JsonIgnore]
    public virtual Userw UemailNavigation { get; set; } = null!;
}
