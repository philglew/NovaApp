import React, { useState } from 'react';
import { Employee } from '../../types/employee';

interface AddEmployeeFormProps {
  onSubmit: (employee: Omit<Employee, 'employeeId' | 'createdDate' | 'modifiedDate'>) => void;
  onCancel: () => void;
  managers: Employee[];
  departments: string[];
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({
  onSubmit,
  onCancel,
  managers,
  departments,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    departmentId: departments[0] || '',
    managerId: managers[0]?.employeeId || null,
    startDate: new Date().toISOString().split('T')[0],
    status: 'Active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* ... other form fields ... */}

      <div>
        <label htmlFor="managerId" className="block text-sm font-medium text-gray-700">
          Manager
        </label>
        <select
          id="managerId"
          name="managerId"
          value={formData.managerId || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">No Manager</option>
          {managers.map(manager => (
            <option key={manager.employeeId} value={manager.employeeId}>
              {manager.firstName} {manager.lastName} - {manager.position}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Add Employee
        </button>
      </div>
    </form>
  );
};

export default AddEmployeeForm;