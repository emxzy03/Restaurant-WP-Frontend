import type CheckMaterial from "./CheckMaterial";
import type Material from "./Material";

export default interface CheckMaterialDetail {
  id?: number;
  material?: Material;
  materialId?: number;
  name?: string;
  last_quantity?: number;
  quantity: number;
  now_q?: number;
  bill?: CheckMaterial;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
}
