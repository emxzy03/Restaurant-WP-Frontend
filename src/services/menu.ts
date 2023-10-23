import type Menu from "@/types/Menu";
import http from "./axios";

function getMenus() {
  return http.get("/menus");
}

function saveMenu(menu: Menu & { files: File[] }) {
  const formData = new FormData();
  formData.append("name", menu.name);
  formData.append("price", menu.price + "");
  formData.append("status", menu.status!);
  formData.append("categoryName", menu.categoryName!);
  if (menu.files.length > 0) {
    formData.append("file", menu.files[0]);
  }
  return http.post("/menus", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function updateMenu(id: number, menu: Menu & { files: File[] }) {
  const formData = new FormData();
  formData.append("name", menu.name);
  formData.append("price", menu.price + "");
  formData.append("status", menu.status!);
  formData.append("categoryName", menu.categoryName!);
  if (menu.files) {
    formData.append("file", menu.files[0]);
  }
  return http.patch(`/menus/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function deleteMenu(id: number) {
  return http.delete(`/menus/${id}`);
}

export default { getMenus, saveMenu, updateMenu, deleteMenu };
