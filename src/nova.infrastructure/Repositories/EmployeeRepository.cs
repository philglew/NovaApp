using Microsoft.EntityFrameworkCore;
using Nova.Core.Entities;
using Nova.Core.Interfaces;
using Nova.Infrastructure.Data;

namespace Nova.Infrastructure.Repositories;

public class EmployeeRepository : Repository<Employee>, IEmployeeRepository
{
    public EmployeeRepository(NovaDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Employee>> GetByDepartmentAsync(Guid departmentId)
    {
        return await _dbSet
            .Where(e => e.DepartmentId == departmentId)
            .Include(e => e.Department)
            .Include(e => e.Manager)
            .ToListAsync();
    }

    public async Task<IEnumerable<Employee>> GetDirectReportsAsync(Guid managerId)
    {
        return await _dbSet
            .Where(e => e.ManagerId == managerId)
            .Include(e => e.Department)
            .ToListAsync();
    }

    public async Task<Employee> GetWithDetailsAsync(Guid id)
    {
        return await _dbSet
            .Include(e => e.Department)
            .Include(e => e.Manager)
            .Include(e => e.DirectReports)
            .FirstOrDefaultAsync(e => e.EmployeeId == id);
    }

    public async Task<IEnumerable<Employee>> SearchAsync(string query)
{
    return await _dbSet
        .Where(e => 
            e.FirstName.ToLower().Contains(query) || 
            e.LastName.ToLower().Contains(query))
        .Take(10) // Limit results to 10 for performance
        .ToListAsync();
}
}