using Nova.Core.Entities;

namespace Nova.Core.Interfaces;

public interface IDepartmentRepository : IRepository<Department>
{
    Task<IEnumerable<Department>> GetWithEmployeesAsync();
    Task<Department> GetWithEmployeesAsync(Guid id);
    Task<IEnumerable<Department>> GetChildDepartmentsAsync(Guid parentId);
}