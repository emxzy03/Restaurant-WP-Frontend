import type SalaryDetail from "./SalaryDetail";
import type Employee from "./Employee";

export default interface CheckInOut {
  id?: number;
  datetimeIn?: Date;
  datetimeOut?: Date;
  total_hour?: number;
  employee?: Employee;
  employeeId?: number;
  salaryDetail?: SalaryDetail;
  salaryDetailId?: number;

  updatedDate?: Date;
  deletedDate?: Date;
}
