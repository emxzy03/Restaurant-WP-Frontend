import type Employee from "./Employee";
import type Salary from "./Salary";

export default interface SalaryDetail {
  id?: number;
  emp_name?: string;
  emp_whours: Date;
  emp_rate?: number;
  emp_total?: number;
  salaryId?: Salary;
  employeeId?: Employee;
  emp_id?: number;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
}
