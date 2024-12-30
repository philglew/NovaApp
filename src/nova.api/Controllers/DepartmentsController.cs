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
        var departments = await _departmentRepository.GetAllAsync();
        return Ok(departments);
    }
}