import axios from 'axios';
import { Department } from '../../types/department';

const API_URL = 'https://localhost:7151/api';  // Make sure this is HTTPS

const departmentService = {
  getAllDepartments: async (): Promise<Department[]> => {
    try {
      console.log('Attempting to fetch from:', `${API_URL}/departments`);
      const response = await axios.get(`${API_URL}/departments`);
      console.log('Response received:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching departments:', error.message);
      throw new Error('Failed to fetch departments');
    }
  },

  getDepartmentById: async (id: string): Promise<Department> => {
    const response = await axios.get(`${API_URL}/departments/${id}`);
    return response.data;
  }
};

export default departmentService;