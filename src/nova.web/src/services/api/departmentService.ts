import axios from 'axios';
import { Department } from '../../types/department';

const API_URL = 'https://localhost:7151/api';

const departmentService = {
  getAllDepartments: async (): Promise<Department[]> => {
    try {
      const response = await axios.get(`${API_URL}/departments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw error;
    }
  }
};

export default departmentService;