using Microsoft.EntityFrameworkCore;
using Nova.API.Services;
using Nova.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Add this to your existing service registrations
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();

// Add Configuration Service
builder.Services.AddSingleton<ConfigurationService>();

// Add DbContext
builder.Services.AddDbContext<NovaDbContext>((serviceProvider, options) =>
{
    var configService = serviceProvider.GetRequiredService<ConfigurationService>();
    var connectionString = configService.GetConnectionString().Result;
    options.UseSqlServer(connectionString);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();