import type Category from "@/types/category";
import http from "./axios";

function getCategories() {
  return http.get("/categories");
}

function saveCategory(category: Category) {
  return http.post("/categories", category);
}

function updateCategory(id: number, category: Category) {
  return http.patch(`/categories/${id}`, category);
}

function deleteCategory(id: number) {
  return http.delete(`/categories/${id}`);
}

export default { getCategories, saveCategory, updateCategory, deleteCategory };
