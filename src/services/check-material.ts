import type CheckMaterial from "@/types/CheckMaterial";
import http from "./axios";

function getCheckMaterials() {
  return http.get("/check-materials");
}

function getOneCheckMaterials(id: number) {
  return http.get(`/check-materials/${id}`);
}

function saveCheckMaterials(checkMaterial: CheckMaterial) {
  console.log(checkMaterial);
  return http.post("/check-materials", checkMaterial);
}

function updateCheckMaterials(id: number, updateCheckMaterial: CheckMaterial) {
  console.log(updateCheckMaterial);
  return http.patch(`/check-materials/${id}`, updateCheckMaterial);
}

function deleteCheckMaterial(id: number) {
  return http.delete(`/check-materials/${id}`);
}

export default {
  getCheckMaterials,
  getOneCheckMaterials,
  saveCheckMaterials,
  updateCheckMaterials,
  deleteCheckMaterial,
};
