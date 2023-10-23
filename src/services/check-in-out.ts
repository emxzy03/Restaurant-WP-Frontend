import type CheckInOut from "@/types/CheckInOut";
import http from "./axios";

function getOneCheckInOut(id: number) {
  return http.get(`/checkinout/${id}`);
}

function saveCheckInOut(checkinout: CheckInOut) {
  return http.post("/checkinout", checkinout);
}

function updateCheckInOut(id: number, checkinout: CheckInOut) {
  return http.patch(`/checkinout/${id}`, checkinout);
}
function getCheckInOuts() {
  return http.get(`/checkinout`);
}

export default {
  saveCheckInOut,
  updateCheckInOut,
  getOneCheckInOut,
  getCheckInOuts,
};
