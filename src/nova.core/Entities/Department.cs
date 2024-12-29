namespace Nova.Core.Entities;
// rest of the code...

public class Department
{
    public Guid DepartmentId { get; set; }
    public required string Name { get; set; }
    public Guid? ManagerId { get; set; }
    public Guid? ParentDepartmentId { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime ModifiedDate { get; set; }

    // Navigation properties
    public Employee? Manager { get; set; }
    public Department? ParentDepartment { get; set; }
    public ICollection<Department> ChildDepartments { get; set; } = new List<Department>();
    public ICollection<Employee> Employees { get; set; } = new List<Employee>();
}