export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    department: string;
    managerId?: string;
    startDate: string;
    status: 'active' | 'inactive';
  }
  
  export interface Department {
    id: string;
    name: string;
    managerId?: string;
    parentDepartmentId?: string;
  }
  
  export interface UserRole {
    id: string;
    name: 'Admin' | 'DepartmentHead' | 'Manager' | 'Employee' | 'ViewOnly';
    permissions: string[];
  }
  
  export interface User {
    id: string;
    email: string;
    roles: UserRole[];
    employeeId?: string;
  }
  
  export interface ApiResponse<T> {
    data: T;
    message?: string;
    errors?: string[];
  }