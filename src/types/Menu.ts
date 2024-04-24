import type Category from "./category";

export default interface Menu {
  id?: number;
  name: string;
  price: number;
  categoryName?: string; //สำหรับ add, edit
  status?: string;
  image?: string;
  category?: Category; //สำหรับ get
}
