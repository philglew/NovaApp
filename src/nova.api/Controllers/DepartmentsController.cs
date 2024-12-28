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
        var departments = await _departmentRepository.GetWithEmployeesAsync();
        return Ok(departments);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Department>> GetDepartment(Guid id)
    {
        var department = await _departmentRepository.GetWithEmployeesAsync(id);

        if (department == null)
        {
            return NotFound();
        }

        return Ok(department);
    }

    [HttpPost]
    public async Task<ActionResult<Department>> CreateDepartment(Department department)
    {
        department.DepartmentId = Guid.NewGuid();
        department.CreatedDate = DateTime.UtcNow;
        department.ModifiedDate = DateTime.UtcNow;

        var created = await _departmentRepository.AddAsync(department);
        return CreatedAtAction(nameof(GetDepartment), new { id = created.DepartmentId }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDepartment(Guid id, Department department)
    {
        if (id != department.DepartmentId)
        {
            return BadRequest();
        }

        if (!await _departmentRepository.ExistsAsync(id))
        {
            return NotFound();
        }

        department.ModifiedDate = DateTime.UtcNow;
        await _departmentRepository.UpdateAsync(department);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDepartment(Guid id)
    {
        if (!await _departmentRepository.ExistsAsync(id))
        {
            return NotFound();
        }

        await _departmentRepository.DeleteAsync(id);
        return NoContent();
    }
}