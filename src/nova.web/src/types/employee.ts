import { Department } from './department';
export interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  departmentId: string | null;
  managerId: string | null;
  startDate: string;
  status: string;
  createdDate: string;
  modifiedDate: string;

  // Navigation properties (optional)
  department?: Department;
  manager?: Employee;
  directReports?: Employee[];
}

export interface TreeItem {
  id: string;
  children: TreeItem[];
  data: Employee;
  collapsed?: boolean;
}