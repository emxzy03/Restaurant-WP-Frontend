import type Category from "@/types/category";
import http from "./axios";

function getCategories() {
  return http.get("/categorys");
}

function saveCategory(category: Category) {
  return http.post("/categorys", category);
}

function updateCategory(id: number, category: Category) {
  return http.patch(`/categorys/${id}`, category);
}

function deleteCategory(id: number) {
  return http.delete(`/categorys/${id}`);
}

export default { getCategories, saveCategory, updateCategory, deleteCategory };
