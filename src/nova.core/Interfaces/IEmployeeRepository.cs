using Nova.Core.Entities;

namespace Nova.Core.Interfaces;

public interface IEmployeeRepository : IRepository<Employee>
{
    Task<IEnumerable<Employee>> GetByDepartmentAsync(Guid departmentId);
    Task<IEnumerable<Employee>> GetDirectReportsAsync(Guid managerId);
    Task<Employee> GetWithDetailsAsync(Guid id);
}