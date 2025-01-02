import React, { useEffect, useState } from 'react';
import { Department } from '../types/department';
import departmentService from '../services/api/departmentService';

const Departments: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await departmentService.getAllDepartments();
        console.log('Fetched departments:', data); // Debug log
        setDepartments(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch departments');
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Departments</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map(dept => (
          <div key={dept.departmentId} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{dept.name}</h2>
            <div className="space-y-2 mt-4">
              <p className="text-gray-600">
                Manager: {dept.managerName || 'Not Assigned'}
              </p>
              <p className="text-gray-600">
                Employees: {dept.employeeCount}
              </p>
              {dept.parentDepartmentId && (
                <p className="text-gray-600 mt-2 text-sm">
                  Reports to: {departments.find(d => d.departmentId === dept.parentDepartmentId)?.name}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;