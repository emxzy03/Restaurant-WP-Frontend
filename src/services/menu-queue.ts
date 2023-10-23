import type MenuQueue from "@/types/MenuQueue";
import http from "./axios";

function getMenuQueues() {
  return http.get("/menu-queues");
}

function saveMenuQueue(menuQueue: MenuQueue) {
  return http.post("/menu-queues", menuQueue);
}

function updateMenuQueue(id: number, menuQueue: MenuQueue) {
  return http.patch(`/menu-queues/${id}`, menuQueue);
}

function getOneMenuQueue(id: number) {
  return http.get(`/menu-queues/${id}`);
}

function deleteMenuQueue(id: number) {
  return http.delete(`/menu-queues/${id}`);
}

export default {
  getMenuQueues,
  updateMenuQueue,
  getOneMenuQueue,
  deleteMenuQueue,
  saveMenuQueue,
};
