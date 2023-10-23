import http from "./axios";

function getPopFood() {
  return http.get(`/reports/popfood`);
}
function getPopDessert() {
  return http.get(`/reports/popdessert`);
}
function getPopBeverage() {
  return http.get(`/reports/popbeverage`);
}
export default { getPopFood, getPopDessert, getPopBeverage };
