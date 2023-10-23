import type BillMaterialDetail from "./BillMaterialDetail";
import type Employee from "./Employee";

export default interface BillMaterial {
  id?: number;
  shop_name: string;
  date?: Date;
  total?: number;
  buy: number;
  change?: number;
  employee?: Employee;
  employeeId?: number;
  billItems?: BillMaterialDetail[];

  updatedDate?: Date;
  deletedDate?: Date;
}
