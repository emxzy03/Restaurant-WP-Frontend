import type Menu from "./Menu";
import type Receipt from "./Receipt";

export default interface ReceiptDetail {
  id?: number;
  name?: string;
  quantity: number;
  price?: number;
  total?: number;
  receipt?: Receipt;
  menu?: Menu;
  menuId?: number;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
}
