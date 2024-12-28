using Microsoft.AspNetCore.Mvc;
using Nova.Core.Entities;
using Nova.Core.Interfaces;

namespace Nova.API.Controllers;

public class EmployeesController : BaseApiController
{
    private readonly IEmployeeRepository _employeeRepository;

    public EmployeesController(IEmployeeRepository employeeRepository)
    {
        _employeeRepository = employeeRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
    {
        var employees = await _employeeRepository.GetAllAsync();
        return Ok(employees);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Employee>> GetEmployee(Guid id)
    {
        var employee = await _employeeRepository.GetWithDetailsAsync(id);

        if (employee == null)
        {
            return NotFound();
        }

        return Ok(employee);
    }

    [HttpGet("department/{departmentId}")]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployeesByDepartment(Guid departmentId)
    {
        var employees = await _employeeRepository.GetByDepartmentAsync(departmentId);
        return Ok(employees);
    }

    [HttpGet("manager/{managerId}")]
    public async Task<ActionResult<IEnumerable<Employee>>> GetDirectReports(Guid managerId)
    {
        var employees = await _employeeRepository.GetDirectReportsAsync(managerId);
        return Ok(employees);
    }

    [HttpPost]
    public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
    {
        employee.EmployeeId = Guid.NewGuid();
        employee.CreatedDate = DateTime.UtcNow;
        employee.ModifiedDate = DateTime.UtcNow;

        var created = await _employeeRepository.AddAsync(employee);
        return CreatedAtAction(nameof(GetEmployee), new { id = created.EmployeeId }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployee(Guid id, Employee employee)
    {
        if (id != employee.EmployeeId)
        {
            return BadRequest();
        }

        if (!await _employeeRepository.ExistsAsync(id))
        {
            return NotFound();
        }

        employee.ModifiedDate = DateTime.UtcNow;
        await _employeeRepository.UpdateAsync(employee);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(Guid id)
    {
        if (!await _employeeRepository.ExistsAsync(id))
        {
            return NotFound();
        }

        await _employeeRepository.DeleteAsync(id);
        return NoContent();
    }
}