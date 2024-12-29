using Microsoft.EntityFrameworkCore;
using Nova.API.Services;
using Nova.Core.Interfaces;
using Nova.Infrastructure.Data;
using Nova.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Configuration Service
builder.Services.AddSingleton<ConfigurationService>();

// Add DbContext
builder.Services.AddDbContext<NovaDbContext>((serviceProvider, options) =>
{
    var configService = serviceProvider.GetRequiredService<ConfigurationService>();
    var connectionString = configService.GetConnectionString().Result;
    options.UseSqlServer(connectionString);
});

// Register repositories
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

var port = builder.Configuration["Kestrel:Endpoints:Https:Url"] ?? "https://localhost:7151";


app.Run();