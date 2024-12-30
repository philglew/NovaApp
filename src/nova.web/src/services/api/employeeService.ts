import axios from 'axios';
import { Employee } from '../../types/employee';

const API_URL = 'https://localhost:7151/api'; // Update this with your API URL

const employeeService = {
  getAllEmployees: async (): Promise<Employee[]> => {
    const response = await axios.get(`${API_URL}/employees`);
    return response.data;
  },

  getEmployeeById: async (id: string): Promise<Employee> => {
    const response = await axios.get(`${API_URL}/employees/${id}`);
    return response.data;
  },

  getDirectReports: async (managerId: string): Promise<Employee[]> => {
    const response = await axios.get(`${API_URL}/employees/manager/${managerId}`);
    return response.data;
  },

  updateEmployee: async (id: string, employee: Employee): Promise<void> => {
    await axios.put(`${API_URL}/employees/${id}`, employee);
  }
};

export default employeeService;