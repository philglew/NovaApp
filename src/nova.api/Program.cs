using Microsoft.EntityFrameworkCore;
using Nova.API.Services;
using Nova.Core.Interfaces;
using Nova.Infrastructure.Data;
using Nova.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add services to the container
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

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();
app.MapControllers();

// Configure port
app.Urls.Add(builder.Configuration["Kestrel:Endpoints:Https:Url"] ?? "https://localhost:7151");

app.Run();