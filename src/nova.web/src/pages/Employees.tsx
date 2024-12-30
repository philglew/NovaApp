import React, { useEffect, useState } from 'react';
import { Employee } from '../types/employee';
import employeeService from '../services/api/employeeService';

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await employeeService.getAllEmployees();
        setEmployees(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch employees');
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Organization Chart</h1>
      </div>

      {/* Hierarchical view of employees */}
      <div className="bg-white shadow rounded-lg p-6">
        {employees.filter(emp => !emp.managerId).map(topLevel => (
          <EmployeeNode 
            key={topLevel.employeeId} 
            employee={topLevel} 
            allEmployees={employees} 
            level={0} 
          />
        ))}
      </div>
    </div>
  );
};

interface EmployeeNodeProps {
  employee: Employee;
  allEmployees: Employee[];
  level: number;
}

const EmployeeNode: React.FC<EmployeeNodeProps> = ({ employee, allEmployees, level }) => {
  const directReports = allEmployees.filter(emp => emp.managerId === employee.employeeId);
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={`ml-${level * 8}`}>
      <div className="flex items-center p-2 hover:bg-gray-50">
        <button 
          onClick={() => setExpanded(!expanded)}
          className="mr-2 w-6 text-gray-400"
        >
          {directReports.length > 0 && (
            expanded ? '▼' : '▶'
          )}
        </button>
        
        <div className="flex-1">
          <div className="font-medium">{employee.firstName} {employee.lastName}</div>
          <div className="text-sm text-gray-500">{employee.position}</div>
        </div>
      </div>

      {expanded && directReports.length > 0 && (
        <div className="ml-6 border-l border-gray-200">
          {directReports.map(report => (
            <EmployeeNode
              key={report.employeeId}
              employee={report}
              allEmployees={allEmployees}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Employees;