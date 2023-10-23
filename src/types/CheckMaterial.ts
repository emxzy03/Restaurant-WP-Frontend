import type CheckMaterialDetail from "./CheckMaterialDetail";
import type Employee from "./Employee";

export default interface CheckMaterial {
  id?: number;
  date?: Date;
  employee?: Employee;
  employeeId?: number;
  checkItems?: CheckMaterialDetail[];

  updatedDate?: Date;
  deletedDate?: Date;
}
