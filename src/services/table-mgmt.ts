import type TableMgmt from "@/types/TableManagement";
import http from "./axios";

function getTableMgmts() {
  return http.get("/tables");
}
function getOneTableMgmt(id: number) {
  return http.get(`/tables/${id}`);
}

function getReceiptOnTable(id: number) {
  return http.get(`/tables/receipt-on/${id}`);
}

function saveTableMgmt(tablemgmt: TableMgmt) {
  return http.post("/tables", tablemgmt);
}

function updateTableMgmt(id: number, tablemgmt: TableMgmt) {
  return http.patch(`/tables/${id}`, tablemgmt);
}

function deleteTableMgmt(id: number) {
  return http.delete(`/tables/${id}`);
}

export default {
  getTableMgmts,
  saveTableMgmt,
  updateTableMgmt,
  deleteTableMgmt,
  getOneTableMgmt,
  getReceiptOnTable,
};
