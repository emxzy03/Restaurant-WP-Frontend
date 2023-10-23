import type Category from "./category";

export default interface Menu {
  id?: number;
  name: string;
  price: number;
  category?: Category; //สำหรับ get
  categoryName?: string; //สำหรับ add, edit
  status?: string;
  image?: string;
}
