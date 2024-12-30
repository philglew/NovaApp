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
            <h2 className="text-xl font-semibold mb-4">{dept.name}</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                Manager: {dept.manager ? `${dept.manager.firstName} ${dept.manager.lastName}` : 'Not Assigned'}
              </p>
              <p className="text-gray-600">
                Employees: {dept.employees?.length || 0}
              </p>
              {dept.parentDepartment && (
                <p className="text-gray-600">
                  Reports to: {dept.parentDepartment.name}
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