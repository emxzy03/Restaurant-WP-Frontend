import type Employee from "./Employee";
import type Menu from "./Menu";
import type Receipt from "./Receipt";

export default interface MenuQueue {
  id?: number;
  name: string;
  note: string;
  quantity: number;
  status: string;
  menu?: Menu;
  menuId?: number;
  receipt?: Receipt;
  receiptId?: number;
  chef?: Employee;
  waitress?: Employee;
  // chef_id?: number;
  // waitress_id?: number;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
