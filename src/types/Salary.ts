import type SalaryDetail from "./SalaryDetail";

export default interface Salary {
  id?: number;
  date_start: string;
  date_end: string;
  date_salary: Date;
  total?: number;
  salaryDetailLists: SalaryDetail[];
  cionum?: number[];
  updatedDate?: Date;
  deletedDate?: Date;
}
