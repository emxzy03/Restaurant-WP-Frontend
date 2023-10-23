import type BillMaterial from "./BillMaterial";
import type Material from "./Material";

export default interface BillMaterialDetail {
  id?: number;
  material?: Material;
  materialId?: number;
  name?: string;
  quantity: number;
  price: number;
  total?: number;
  bill?: BillMaterial;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
}
