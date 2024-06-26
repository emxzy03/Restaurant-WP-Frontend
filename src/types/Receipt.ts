import type Employee from "./Employee";
import type ReceiptDetail from "./ReceiptDetail";
// import type Table from "./Table";
import type TableMgmt from "./TableManagement";

export default interface Receipt {
  id?: number;
  table_num?: number;
  date?: Date;
  subtotal?: number;
  discount?: number;
  total?: number;
  received?: number;
  change?: number;
  status?: string;
  payment?: string;
  employee?: Employee;
  empid?: number;
  table?: TableMgmt;
  tableId?: number;
  receiptDetail?: ReceiptDetail[];
  uuidI?: string;
  // createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
}
