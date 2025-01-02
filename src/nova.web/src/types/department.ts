import { Employee } from './employee';

export interface Department {
    departmentId: string;
    name: string;
    managerId: string | null;
    parentDepartmentId: string | null;
    createdDate: string;
    modifiedDate: string;
    managerName: string | null;
    employeeCount: number;
}