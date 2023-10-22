using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;
using TECAirAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<TecairContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("TECAir")));
builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});
builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
options.SerializerSettings.ReferenceLoopHandling=Newtonsoft.Json.ReferenceLoopHandling.Ignore)
    .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver 
    = new DefaultContractResolver());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

/* `app.UseHttpsRedirection();` is a middleware that redirects HTTP requests to HTTPS. It ensures that all incoming requests are redirected to the secure HTTPS protocol. This helps to enforce secure communication between the client and the server by automatically redirecting any insecure HTTP requests to the corresponding HTTPS endpoint. */
app.UseHttpsRedirection();

/* `app.UseCors("AllowOrigin");` is configuring Cross-Origin Resource Sharing (CORS) for the application. CORS is a security mechanism that allows web applications running on one domain to access resources from another domain. */
app.UseCors("AllowOrigin");

/* `app.UseAuthorization();` is a middleware that adds authorization capabilities to the HTTP request pipeline. It enables the application to authenticate and authorize incoming requests based on the defined policies and roles. This middleware is typically used in conjunction with authentication middleware to protect certain routes or endpoints from unauthorized access. */
app.UseAuthorization();

/* `app.MapControllers();` is a middleware that maps the controllers in the application to the incoming HTTP requests. It routes the requests to the appropriate controller action based on the URL and HTTP method. This allows the application to handle different types of requests (GET, POST, PUT, DELETE, etc.) and perform the corresponding actions defined in the controllers. */
app.MapControllers();

/* `app.Run();` is the final step in configuring the HTTP request pipeline. It is responsible for handling the incoming HTTP requests and generating the appropriate responses. When a request reaches this point in the pipeline, it will be processed by the middleware components in the pipeline and eventually reach the `app.Run();` statement. The statement itself does not perform any specific action but signifies the end of the pipeline configuration. */
app.Run();
