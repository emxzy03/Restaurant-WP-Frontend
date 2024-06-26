import type Receipt from "@/types/Receipt";
import http from "./axios";

function getReceipts() {
  return http.get("/receipts");
}

function getOneReceipts(id: number) {
  return http.get(`/receipts/${id}`);
}
function getOneReceiptsByTableId(id: number) {
  return http.get(`/receipts/table/${id}`);
}

function getOneReceiptsByUuid(uuidI: string) {
  return http.get(`/receipts/guuid/${uuidI}`);
}
function saveReceipts(receipt: Receipt) {
  console.log(receipt);
  return http.post(
    "/receipts",
    receipt
    // {
    //   discount: 0,
    //   received: 0,
    //   status: "รอชำระเงิน",
    //   payment: "-",
    //   tableid: receipt.table.id,
    // }
  );
}
function updateReceiptDetail(id: number, updateReceipt: Receipt) {
  return http.patch(`/receipts/receipt-detail/${id}`, updateReceipt);
}

function updateReceipts(id: number, updateReceipt: Receipt) {
  updateReceipt.empid = updateReceipt.employee?.id!;
  updateReceipt.tableId = updateReceipt.table?.id;
  return http.patch(`/receipts/${id}`, updateReceipt);
}

function deleteReceipts(id: number) {
  return http.delete(`/receipts/${id}`);
}
function deleteReceiptItems(id: number) {
  return http.delete(`/receipts/rmItem/${id}`);
}
export default {
  getReceipts,
  getOneReceipts,
  saveReceipts,
  updateReceipts,
  deleteReceipts,
  getOneReceiptsByUuid,
  deleteReceiptItems,
  getOneReceiptsByTableId,
  updateReceiptDetail,
};
