using Microsoft.EntityFrameworkCore;
using Nova.Core.Entities;
using Nova.Core.Interfaces;
using Nova.Infrastructure.Data;

namespace Nova.Infrastructure.Repositories;

public class DepartmentRepository : Repository<Department>, IDepartmentRepository
{
    public DepartmentRepository(NovaDbContext context) : base(context)
    {
    }

public override async Task<IEnumerable<Department>> GetAllAsync()
{
    try
    {
        Console.WriteLine("Starting GetAllAsync in DepartmentRepository");
        
        // First get departments with their managers
        var departments = await _dbSet
            .Include(d => d.Manager)
            .Include(d => d.Employees)
            .Include(d => d.ParentDepartment)
            .Select(d => new Department
            {
                DepartmentId = d.DepartmentId,
                Name = d.Name,
                ManagerId = d.ManagerId,
                ParentDepartmentId = d.ParentDepartmentId,
                CreatedDate = d.CreatedDate,
                ModifiedDate = d.ModifiedDate,
                Manager = d.ManagerId != null ? _context.Set<Employee>()
                    .FirstOrDefault(e => e.EmployeeId == d.ManagerId) : null,
                Employees = d.Employees,
                ParentDepartment = d.ParentDepartment
            })
            .ToListAsync();

        // Log what we found for debugging
        foreach (var dept in departments)
        {
            Console.WriteLine($"\nDepartment: {dept.Name}");
            Console.WriteLine($"ManagerId: {dept.ManagerId}");
            if (dept.Manager != null)
            {
                Console.WriteLine($"Manager found: {dept.Manager.FirstName} {dept.Manager.LastName}");
            }
            else
            {
                Console.WriteLine("No manager found for this department");
            }
        }

        return departments;
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error in GetAllAsync: {ex.Message}");
        Console.WriteLine($"Stack trace: {ex.StackTrace}");
        throw;
    }
}

    public async Task<IEnumerable<Department>> GetWithEmployeesAsync()
    {
        return await _dbSet
            .Include(d => d.Employees)
            .ToListAsync();
    }

    public async Task<Department> GetWithEmployeesAsync(Guid id)
    {
        return await _dbSet
            .Include(d => d.Employees)
            .FirstOrDefaultAsync(d => d.DepartmentId == id);
    }

    public async Task<IEnumerable<Department>> GetChildDepartmentsAsync(Guid parentId)
    {
        return await _dbSet
            .Where(d => d.ParentDepartmentId == parentId)
            .ToListAsync();
    }



}