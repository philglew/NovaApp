namespace Nova.Core.Entities;

public class Employee
{
    public Guid EmployeeId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Position { get; set; }
    public Guid? DepartmentId { get; set; }
    public Guid? ManagerId { get; set; }
    public DateTime StartDate { get; set; }
    public string Status { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime ModifiedDate { get; set; }

    // Navigation properties
    public Department Department { get; set; }
    public Employee Manager { get; set; }
    public ICollection<Employee> DirectReports { get; set; }
}