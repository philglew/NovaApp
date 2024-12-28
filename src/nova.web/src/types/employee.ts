export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    department: string;
    managerId: string | null;
    imageUrl?: string;
    directReports?: Employee[];
  }
  
  export interface TreeItem {
    id: string;
    children: TreeItem[];
    collapsed?: boolean;
    data: Employee;
  }