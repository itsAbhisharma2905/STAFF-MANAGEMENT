export type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  status: string;
  attendance: string;
  leave: string;
  salary: string;
  avatar: string;
  manager: string;
  location: string;
  performance: string;
  risk: string;
};

export type Database = {
  employees: Employee[];
};
