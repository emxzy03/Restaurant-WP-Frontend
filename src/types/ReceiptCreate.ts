import type Employee from "./Employee";
import type ReceiptDetail from "./ReceiptDetail";
// import type Table from "./Table";
import type TableMgmt from "./TableManagement";

export default interface ReceiptCreate {
  id?: number;
  tablenum?: number;
  date?: Date;
  subtotal?: number;
  discount: number;
  total?: number;
  received: number;
  change?: number;
  status: string;
  payment: string;
  employee?: Employee;
  tableid: number;
  receiptDetail?: ReceiptDetail[];

  // createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
}
