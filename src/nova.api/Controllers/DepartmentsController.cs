using Microsoft.AspNetCore.Mvc;
using Nova.Core.Entities;
using Nova.Core.Interfaces;

namespace Nova.API.Controllers;

public class DepartmentsController : BaseApiController
{
    private readonly IDepartmentRepository _departmentRepository;

    public DepartmentsController(IDepartmentRepository departmentRepository)
    {
        _departmentRepository = departmentRepository;
    }

    [HttpGet]
public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
{
    try
    {
        Console.WriteLine("GetDepartments endpoint called");
        var departments = await _departmentRepository.GetAllAsync();

        // Let's examine what we get from the repository
        foreach (var dept in departments)
        {
            Console.WriteLine($"\nDepartment: {dept.Name}");
            Console.WriteLine($"ManagerId: {dept.ManagerId}");
            Console.WriteLine($"Manager object present: {dept.Manager != null}");
            if (dept.Manager != null)
            {
                Console.WriteLine($"Manager details: {dept.Manager.FirstName} {dept.Manager.LastName}");
            }
        }

        var departmentDtos = departments.Select(d => new
        {
            d.DepartmentId,
            d.Name,
            d.ManagerId,
            d.ParentDepartmentId,
            d.CreatedDate,
            d.ModifiedDate,
            // Let's be explicit about constructing the manager name
            ManagerName = d.Manager != null 
                ? $"{d.Manager.FirstName} {d.Manager.LastName}"
                : "Not Assigned",
            EmployeeCount = d.Employees?.Count ?? 0,
            ParentDepartmentName = d.ParentDepartment?.Name
        }).ToList();

        // Log what we're sending back
        Console.WriteLine("\nSending back to client:");
        foreach (var dto in departmentDtos)
        {
            Console.WriteLine($"Department: {dto.Name}, Manager: {dto.ManagerName}");
        }

        return Ok(departmentDtos);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error in GetDepartments: {ex.Message}");
        Console.WriteLine($"Stack trace: {ex.StackTrace}");
        return StatusCode(500, new { message = "Error retrieving departments", error = ex.Message });
    }
}
}