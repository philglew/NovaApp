import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import employeeService from '../services/api/employeeService';
import departmentService from '../services/api/departmentService';
import { Employee } from '../types/employee';
import { Department } from '../types/department';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empsData, deptsData] = await Promise.all([
          employeeService.getAllEmployees(),
          departmentService.getAllDepartments()
        ]);
        setEmployees(empsData);
        setDepartments(deptsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  // Calculate department statistics
  const departmentStats = departments.map(dept => ({
    name: dept.name,
    count: employees.filter(emp => emp.departmentId === dept.departmentId).length
  }));

  // Calculate role distribution
  const roleStats = employees.reduce((acc, emp) => {
    acc[emp.position] = (acc[emp.position] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const roleData = Object.entries(roleStats).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Total Employees</h3>
          <p className="text-3xl font-bold mt-2">{employees.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Departments</h3>
          <p className="text-3xl font-bold mt-2">{departments.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Managers</h3>
          <p className="text-3xl font-bold mt-2">
            {employees.filter(emp => employees.some(e => e.managerId === emp.employeeId)).length}
          </p>
        </div>
      </div>

      {/* Department Distribution Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Department Size</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Role Distribution Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Roles Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={roleData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {roleData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;