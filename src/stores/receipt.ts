import { ref, watch } from "vue";
import { defineStore } from "pinia";
import type Receipt from "@/types/Receipt";
import type ReceiptCreate from "@/types/ReceiptCreate";
import receiptService from "@/services/receipt";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import type TableMgmt from "@/types/TableManagement";
import type ReceiptDetail from "@/types/ReceiptDetail";
import employeeService from "@/services/employee";
import { useLoginStore } from "./login";
import tableMgmtService from "@/services/table-mgmt";
import { useTableMgmtStore } from "./table-mgmt";

export const useReceiptStore = defineStore("receipt", () => {
  const loadingStore = useLoadingStore();
  const receipts = ref<Receipt[]>([]);
  const receiptsAt = ref<Receipt>();
  const messageStore = useMessageStore();
  const dialog = ref(false);
  const dialogP = ref(false);
  const showPay = ref(false);
  const idReceipt = ref(0);
  const tableCheckBill = ref(0);
  const showBill = ref(false);
  const showText = ref(false);
  const date = ref(new Date());
  const loginStore = useLoginStore();
  const uuidReceipt = ref("");
  const ReceiptDetails = ref<ReceiptDetail[]>([]);
  const baseUrlSellView = ref("http://localhost:5173/receipt/");
  const baseUrlPOS = ref("http://localhost:5173/receipt/");
  const urlSellView = ref("");
  const checkBillItem = ref<Receipt>();
  const tableMgmtStore = useTableMgmtStore();

  async function getCheckBill(id: number) {
    const bill = await receiptService.getOneReceiptsByTableId(id);
    if (!bill) messageStore.showMessage("ไม่สามารถดึง Receipt item ได้");
    return (checkBillItem.value = bill.data);
  }

  const setUrlSellView = async (table: TableMgmt) => {
    await openR(table);
    urlSellView.value = baseUrlSellView.value + uuidReceipt.value;
  };

  const editedReceipt = ref<Receipt>({
    // subtotal: 0,
    discount: 1,
    // total: 0,
    // received: 1,
    received: 0,
    change: 0,
    status: "รอชำระเงิน",
    payment: "-",
    // table: <TableMgmt>{},
  });
  const editedReceiptItem = ref<ReceiptDetail>({
    menuId: 1,
    name: "",
    quantity: 1,
    price: 0,
    total: 0,
  });
  const createR = ref(true);
  const editedReceiptCreate = ref<ReceiptCreate>({
    discount: 1,
    received: 1,
    status: "รอชำระเงิน",
    payment: "-",
    tableid: 0,
  });
  const listReceipts = ref<String[]>([]);
  const showBillPay = ref<Receipt>({
    received: 0,
    change: 0,
    status: "รอชำระเงิน",
    payment: "-",
    discount: 0,
  });
  const dialogD = ref(false);
  async function getReceipts() {
    loadingStore.isLoading = true;
    try {
      const res = await receiptService.getReceipts();
      const list = ref<String[]>([]);
      receipts.value = res.data;
      // receipts.value.forEach((element) => {
      //   list.value.push(element.employee.id);
      // });
      console.log(res);
      listReceipts.value = list.value;
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Receipts ได้");
    }
    loadingStore.isLoading = false;
  }
  const Employeeid = () => {
    const items = [];
    for (let i = 0; i < receipts.value.length; i++) {
      items.push(receipts.value[i].employee?.id);
    }
    return items;
  };
  async function getReceiptitemAt(id: number) {
    loadingStore.isLoading = true;
    try {
      const rec = await receiptService.getOneReceipts(id);
      receiptsAt.value = rec.data;
      // console.log(receiptsAt.value?.receiptDetail);
      console.log("receipt at => ", receiptsAt.value);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Receipt item ได้");
    }
    loadingStore.isLoading = false;
  }
  async function getOneReceiptsByUUid(uuidI: string) {
    loadingStore.isLoading = true;
    try {
      const rec = await receiptService.getOneReceiptsByUuid(uuidI);
      receiptsAt.value = rec.data;
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Receipt ได้");
    }
    loadingStore.isLoading = false;
  }
  function editReceipt(receipt: Receipt) {
    loadingStore.isLoading = true;
    editedReceipt.value = JSON.parse(JSON.stringify(receipt));
    dialog.value = true;
    loadingStore.isLoading = false;
  }
  function deleteReceipt(id: number, num: number) {
    loadingStore.isLoading = true;
    editedReceipt.value.id = id;
    editedReceipt.value.table_num = num;
    // console.log(tableMgmts.value[id].num);
    messageStore.showConfirm(
      "ต้องการลบออเดอร์โต๊ะที่ " + editedReceipt.value.table_num + " หรือไม่",
      "receipt"
    );
    loadingStore.isLoading = false;
  }
  async function confirmDelete() {
    try {
      await receiptService.deleteReceipts(editedReceipt.value.id!);
      await getReceipts();
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถลบ Receipt Management ได้");
    }
    loadingStore.isLoading = false;
  }
  const saveReceiptsItems = async (recId: number) => {
    await getReceiptitemAt(recId);

    const id = receiptsAt.value?.id;
    console.log(receiptsAt.value);
    const updateReceipt = ref<Receipt>({
      table_num: receiptsAt.value!.table_num,
      subtotal: receiptsAt.value!.subtotal,
      discount: receiptsAt.value!.discount,
      change: receiptsAt.value!.change,
      total: receiptsAt.value!.total,
      received: receiptsAt.value!.received,
      status: receiptsAt.value!.status,
      payment: receiptsAt.value!.payment,
      employee: receiptsAt.value!.employee,
      empid: receiptsAt.value!.empid,
      table: receiptsAt.value!.table,
      receiptDetail: [],

      //billMaterialsAt.value!.billItems,
    });

    ReceiptDetails.value.forEach((element) => {
      updateReceipt.value.receiptDetail!.push({
        name: element.name,
        quantity: element.quantity,
        price: element.price!,
        // total: element.total,
        total: element.quantity * element.price!,
      });
    });
    console.log(updateReceipt.value.receiptDetail);

    try {
      await receiptService.updateReceipts(id!, updateReceipt.value!);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถบันทึก receipt detail ได้");
    }

    await getReceiptItems(recId);
  };
  async function saveReceipt() {
    loadingStore.isLoading = true;
    try {
      if (editedReceipt.value.id) {
        console.log("----");
        console.log(editedReceipt.value);
        editedReceipt.value.receiptDetail = undefined;
        await receiptService.updateReceipts(
          editedReceipt.value.id,
          editedReceipt.value
        );
      } else {
        console.log(editedReceiptCreate.value);
        await receiptService.saveReceipts(editedReceiptCreate.value);
        // idReceipt.value = editedReceipt.value.id;
      }
      dialog.value = false;
      // console.log(editedTableMgmt.value);
      await getReceipts();
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถบันทึก Receipt Management ได้");
    }
    loadingStore.isLoading = false;
  }

  async function openR(table: TableMgmt) {
    // console.log(receipts.value[2]);
    // console.log(table.id);
    // console.log(
    //   receipts.value[2].table.id == table.id &&
    //     receipts.value[2].status == "รอชำระเงิน"
    // );
    await getReceipts();
    thisRec(table);
    console.log(createR.value);
    if (createR.value) {
      idReceipt.value = 0;
      editedReceiptCreate.value.tableid = table.id!;
      console.log(editedReceiptCreate.value.tableid);
      console.log(editedReceiptCreate.value);
      await saveReceipt();
      thisRec(table);
    }
    console.log(idReceipt.value);
  }

  function thisRec(table: TableMgmt) {
    idReceipt.value = 0;
    for (const rec of receipts.value) {
      if (rec.table!.id == table.id && rec.status == "รอชำระเงิน") {
        // console.log(rec.id);
        idReceipt.value = rec.id!;
        uuidReceipt.value = rec.uuidI!;
        createR.value = false;
        break;
      }
    }
    if (idReceipt.value == 0) {
      createR.value = true;
    }
  }

  async function updateTableRec(oldTable: TableMgmt, newTable: TableMgmt) {
    thisRec(oldTable);
    console.log(idReceipt.value);
    const res = await receiptService.getOneReceipts(idReceipt.value);
    const goalReceipt = res.data;
    console.log(goalReceipt);
    editedReceiptCreate.value = {
      // id: goalReceipt.id,
      discount: goalReceipt.discount,
      received: goalReceipt.received,
      status: goalReceipt.status,
      payment: goalReceipt.payment,
      tableid: newTable.id!,
    };
    console.log(editedReceiptCreate.value);
    // await saveReceipt();
    await receiptService.updateReceipts(
      goalReceipt.id,
      editedReceiptCreate.value
    );
    await getReceipts();
  }
  async function cancelTableRec(table: TableMgmt) {
    thisRec(table);
    receiptService.deleteReceipts(idReceipt.value);
    await getReceipts();
  }

  async function getDetails() {
    await getReceipts();
    const id = ref(0);
    for (const rec of receipts.value) {
      if (rec.table!.id == tableCheckBill.value && rec.status == "รอชำระเงิน") {
        id.value = rec.id!;
        break;
      }
    }
    console.log(tableCheckBill.value);
    console.log(id.value);
    getReceiptitemAt(id.value);
  }

  async function updateBill(rec: number, itemRec: Receipt) {
    loadingStore.isLoading = true;
    try {
      //PATCH Bill
      const resBill = await receiptService.getOneReceipts(rec!);
      const updateTable: TableMgmt = resBill.data.table;
      const userId = localStorage.getItem("userIDNow");
      const empId = await employeeService.getOneEmployee(
        userId ? parseInt(userId) : 0
      );
      resBill.data.payment = itemRec.payment || "-";
      resBill.data.discount = itemRec.discount || 0;
      resBill.data.received = itemRec.received || 0;
      resBill.data.total = itemRec.total;
      resBill.data.change = itemRec.change ? itemRec.change >= 0 : 0;
      resBill.data.status = "เสร็จสิ้น";
      resBill.data.empid = empId.data.id;

      await receiptService.updateReceipts(resBill.data.id, resBill.data);
      // Update status table
      updateTable.status = "กำลังจะว่าง";
      await tableMgmtService.updateTableMgmt(updateTable.id!, updateTable);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถบันทึก Bill ได้");
    }
    await tableMgmtStore.getTableMgmts();
    loadingStore.isLoading = false;
  }

  // async function updateBill(rec: number, itemRec: Receipt) {
  //   try {
  //     const resM = await receiptService.getOneReceipts(rec!);

  //     const resBill = resM.data;

  //     const resE = await employeeService.getOneEmployee(
  //       parseInt(loginStore.userIdNow)
  //     );
  //     const empDo = resE.data;

  //     if (resBill.status === "รอชำระเงิน") {
  //       resBill.received = itemRec.received;
  //       resBill.change = itemRec.change;
  //       resBill.status = itemRec.status;
  //       resBill.payment = itemRec.payment;
  //       resBill.receiptDetail = undefined;
  //       resBill.employee = empDo;

  //       await receiptService.updateReceipts(resBill.id, resBill);
  //     } else {
  //       messageStore.showMessage("ไม่สามารถบันทึก Bill ได้");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     messageStore.showMessage("ไม่สามารถบันทึก Bill ได้");
  //   }
  // }
  async function getReceiptItems(id: number) {
    loadingStore.isLoading = true;
    try {
      const bill = await receiptService.getOneReceipts(id);
      receiptsAt.value = bill.data;
      console.log(receiptsAt.value?.receiptDetail);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Receipt detail ได้");
    }
    loadingStore.isLoading = false;
  }
  function deleteReceiptItem(id: number) {
    loadingStore.isLoading = true;
    editedReceiptItem.value.id = id;
    messageStore.showConfirm(
      "Do you want to delete this receipt item?",
      "receiptitem"
    );
    loadingStore.isLoading = false;
  }

  async function confirmDeleteItem() {
    try {
      await receiptService.deleteReceiptItems(editedReceiptItem.value.id!);
      await getReceiptItems(receiptsAt.value!.id!);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถลบ Receipt Item ได้");
    }
    loadingStore.isLoading = false;
  }

  function editReceiptItem(receiptItem: ReceiptDetail) {
    console.log(receiptItem.receipt);
    loadingStore.isLoading = true;
    editedReceiptItem.value = JSON.parse(JSON.stringify(receiptItem));
    editedReceiptItem.value.menuId = receiptItem.receipt!.id;
    dialogD.value = true;
    loadingStore.isLoading = false;
  }
  const nameReceipt = () => {
    const items: string[] = [];
    for (let i = 0; i < receipts.value.length; i++) {
      if (
        !items.includes(receipts.value[i].date!.toString().substring(0, 10))
      ) {
        items.push(receipts.value[i].date!.toString().substring(0, 10));
      }
    }
    for (let i = 0; i < receipts.value.length; i++) {
      console.log(receipts.value[i].table?.num);
      if (!items.includes(receipts.value[i].table?.num + "")) {
        items.push(receipts.value[i].table?.num + "");
      }
    }

    console.log(items);
    return items;
  };

  return {
    receipts,
    getReceipts,
    receiptsAt,
    getReceiptitemAt,
    deleteReceipt,
    editReceipt,
    saveReceipt,
    dialog,
    editedReceipt,
    listReceipts,
    Employeeid,
    confirmDelete,
    idReceipt,
    openR,
    updateTableRec,
    cancelTableRec,
    showBill,
    getDetails,
    tableCheckBill,
    showPay,
    showBillPay,
    updateBill,
    showText,
    getOneReceiptsByUUid,
    uuidReceipt,
    dialogP,
    date,
    confirmDeleteItem,
    deleteReceiptItem,
    editReceiptItem,
    saveReceiptsItems,
    ReceiptDetails,
    editedReceiptItem,
    dialogD,
    nameReceipt,
    urlSellView,
    setUrlSellView,
    getCheckBill,
    checkBillItem,
  };
});
