namespace TECAirAPI.Dtos
{
   /* The LoginDto class is a C# class that represents a data transfer object for login information, including an email and password. */
    public class LoginDto
    {
        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;
    }
}
