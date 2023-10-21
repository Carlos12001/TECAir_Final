using TECAirAPI.Models;
using System.Text.Json.Serialization;

namespace TECAirAPI.Dtos
{
    public class UserDto
    {
        public string Email { get; set; } = null!;

        public string Upassword { get; set; } = null!;

        public string Unumber { get; set; } = null!;

        public string Fname { get; set; } = null!;

        public string? Mname { get; set; }

        public string Lname1 { get; set; } = null!;

        public string Lname2 { get; set; } = null!;

        public string? Studentid { get; set; }

        public string? University { get; set; }

        public string? Adminid { get; set; }

        public int? Miles { get; set; }
    }
}
