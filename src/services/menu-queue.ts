import type MenuQueue from "@/types/MenuQueue";
import http from "./axios";

function getMenuQueues() {
  return http.get("/menu-queues");
}
function getMenuQueuesServ() {
  return http.get("/menu-queues/serv");
}
function getMenuQueuesServByTableNum(num: number) {
  return http.get(`/menu-queues/serv/${num}`);
}

function getMenuQueuesHistory() {
  return http.get("/menu-queues/history");
}
function getMenuQueueByCondition(con: number) {
  return http.get(`/menu-queues/category/` + con);
}
function saveMenuQueue(menuQueue: MenuQueue) {
  return http.post("/menu-queues", menuQueue);
}

function getMenuQueueCountServe() {
  return http.get("/menu-queues/serv-count");
}

function getOneMenuQueueServ(id: number) {
  return http.get("/menu-queues/menu-serv/" + id);
}

// function updateMenuQueue(id: number, menuQueue: MenuQueue) {
//   return http.patch(`/menu-queues/${id}`, menuQueue);
// }

function updateMenuQueue(id: number, status: string) {
  return http.patch(`/menu-queues/${id}/status?status=${status}`);
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
  getMenuQueuesHistory,
  getMenuQueueByCondition,
  getMenuQueuesServ,
  getMenuQueuesServByTableNum,
  getMenuQueueCountServe,

  getOneMenuQueueServ,
};
