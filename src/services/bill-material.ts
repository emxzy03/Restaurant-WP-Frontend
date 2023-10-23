import type BillMaterial from "@/types/BillMaterial";
import http from "./axios";

function getBillMaterials() {
  return http.get("/bill-materials");
}

function getOneBillMaterials(id: number) {
  return http.get(`/bill-materials/${id}`);
}

function saveBillMaterials(billMaterial: BillMaterial) {
  console.log(billMaterial);
  return http.post("/bill-materials", billMaterial);
}

function updateBillMaterials(id: number, updateBillMaterial: BillMaterial) {
  console.log(updateBillMaterial);
  return http.patch(`/bill-materials/${id}`, updateBillMaterial);
}

function deleteBillMaterial(id: number) {
  return http.delete(`/bill-materials/${id}`);
}

function deleteBillItem(id: number) {
  return http.delete(`/bill-materials/rmItem/${id}`);
}

export default {
  getBillMaterials,
  getOneBillMaterials,
  saveBillMaterials,
  updateBillMaterials,
  deleteBillItem,
  deleteBillMaterial,
};
