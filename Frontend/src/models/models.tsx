export interface Department{
  departmentId: number;
  name: string;
  capacity: number;
}

export interface Employee{
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  title: string;
  photograph_path: string;
  department: Department;
  role:string;
}


