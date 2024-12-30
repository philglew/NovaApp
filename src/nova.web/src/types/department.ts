import { Employee } from './employee';

export interface Department {
    departmentId: string;
    name: string;
    managerId: string | null;
    parentDepartmentId: string | null;
    createdDate: string;
    modifiedDate: string;
    
    // Navigation properties (optional as they might not always be populated)
    manager?: Employee;
    parentDepartment?: Department;
    childDepartments?: Department[];
    employees?: Employee[];
}