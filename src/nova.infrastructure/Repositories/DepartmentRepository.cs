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

    public async Task<IEnumerable<Department>> GetWithEmployeesAsync()
    {
        return await _dbSet
            .Include(d => d.Employees)
            .Include(d => d.Manager)
            .Include(d => d.ParentDepartment)
            .Include(d => d.ChildDepartments)
            .ToListAsync();
    }

    public async Task<Department> GetWithEmployeesAsync(Guid id)
    {
        return await _dbSet
            .Include(d => d.Employees)
            .Include(d => d.Manager)
            .Include(d => d.ParentDepartment)
            .Include(d => d.ChildDepartments)
            .FirstOrDefaultAsync(d => d.DepartmentId == id);
    }

    public async Task<IEnumerable<Department>> GetChildDepartmentsAsync(Guid parentId)
    {
        return await _dbSet
            .Where(d => d.ParentDepartmentId == parentId)
            .Include(d => d.Manager)
            .ToListAsync();
    }
}