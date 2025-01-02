using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Nova.Core.Entities;

namespace Nova.Core.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllAsync();
        Task<Employee> GetByIdAsync(Guid id);
        Task<IEnumerable<Employee>> GetByDepartmentAsync(Guid departmentId);
        Task<IEnumerable<Employee>> GetDirectReportsAsync(Guid managerId);
        Task<Employee> AddAsync(Employee employee);
        Task UpdateAsync(Employee employee);
        Task DeleteAsync(Guid id);
        Task<bool> ExistsAsync(Guid id);
        // Adding our new search method to the existing interface
        Task<IEnumerable<Employee>> SearchAsync(string query);
    }
}