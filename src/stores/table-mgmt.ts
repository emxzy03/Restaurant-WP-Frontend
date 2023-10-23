import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import type TableMgmt from "@/types/TableManagement";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import tableMgmtService from "@/services/table-mgmt";
import tableMgmt from "@/services/table-mgmt";
import { useReceiptStore } from "./receipt";

export const useTableMgmtStore = defineStore("table-magmt", () => {
  const loadingStore = useLoadingStore();
  const tableMgmts = ref<TableMgmt[]>([]);
  const messageStore = useMessageStore();
  const receiptStore = useReceiptStore();
  const dialog = ref(false);
  const dialogM = ref(false);

  const editedTableMgmt = ref<TableMgmt>({
    num: 0,
    status: "ว่าง",
    seat: 0,
  });
  const moveTableMgmt = ref<TableMgmt>({
    num: 0,
    status: "ว่าง",
    seat: 0,
  });
  const numBusy = ref(0);
  const numClean = ref(0);
  const numReady = ref(0);
  const needStatus = ref("");

  watch(dialog, (newDialog, oldDialog) => {
    console.log(newDialog);
    if (!newDialog) {
      clearTableMgmt();
    }
  });

  async function getTableMgmts() {
    loadingStore.isLoading = true;
    try {
      const res = await tableMgmtService.getTableMgmts();
      tableMgmts.value = res.data;
      console.log(res);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Table Management ได้");
    }
    getNumReady();
    getNumBusy();
    getNumClean();
    loadingStore.isLoading = false;
  }
  const nameTableMgmt = () => {
    const items = [];
    for (let i = 0; i < tableMgmts.value.length; i++) {
      items.push(tableMgmts.value[i].num);
    }

    console.log(items);
    return items;
  };
  const seatTableMgmt = () => {
    const items = [];
    for (let i = 0; i < tableMgmts.value.length; i++) {
      items.push(tableMgmts.value[i].seat);
    }
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        if (items[i] === items[j]) {
          items.splice(i, 1);
        }
      }
    }

    console.log(items);
    return items;
  };
  const reservedTable = async (id: number, value: TableMgmt) => {
    loadingStore.isLoading = true;
    editedTableMgmt.value = value;
    dialog.value = true;
    if (editedTableMgmt.value.status == "ว่าง") {
      // console.log(editedTableMgmt.value.id);
      editedTableMgmt.value.status = "ไม่ว่าง";
      await tableMgmtService.updateTableMgmt(id, editedTableMgmt.value);
      await getTableMgmts();
    } else {
      // dialog.value = false;
      messageStore.showMessage(
        "ไม่สามารถจองโต๊ะที่ " + editedTableMgmt.value.num + " ได้"
      );
    }
    await getTableMgmts();
    loadingStore.isLoading = false;
  };
  const canceledTable = async (id: number, value: TableMgmt) => {
    loadingStore.isLoading = true;
    editedTableMgmt.value = value;
    // dialog.value = false;
    if (editedTableMgmt.value.status == "ไม่ว่าง") {
      console.log(editedTableMgmt.value);
      editedTableMgmt.value.status = "กำลังจะว่าง";
      await tableMgmtService.updateTableMgmt(id, editedTableMgmt.value);
      receiptStore.cancelTableRec(value);
      await getTableMgmts();
      dialog.value = false;
    } else {
      messageStore.showMessage(
        "ไม่สามารถยกเลิกโต๊ะที่ " + editedTableMgmt.value.num + " ได้"
      );
    }
    await getTableMgmts();
    loadingStore.isLoading = false;
  };
  const movedTable = async (value: TableMgmt, goalTable: number) => {
    loadingStore.isLoading = true;
    // editedTableMgmt.value.id = goalTable;
    editedTableMgmt.value = value;
    const items = [];
    const haveTable = ref(false);
    for (let i = 0; i < tableMgmts.value.length; i++) {
      items.push(tableMgmts.value[i].num);
    }
    console.log(items);
    // console.log("Backend: " + editedTableMgmt.value.id);
    for (let i = 0; i < tableMgmts.value.length; i++) {
      if (items[i] == goalTable) {
        haveTable.value = true;
      }
    }
    const res = await tableMgmtService.getOneTableMgmt(goalTable);
    moveTableMgmt.value = res.data;
    if (
      editedTableMgmt.value.status == "ไม่ว่าง" &&
      haveTable.value &&
      moveTableMgmt.value.status == "ว่าง"
    ) {
      console.log("goal: " + goalTable);
      editedTableMgmt.value.status = "กำลังจะว่าง";
      await tableMgmtService.updateTableMgmt(
        editedTableMgmt.value.id!,
        editedTableMgmt.value
      );
      // const res = await tableMgmtService.getOneTableMgmt(goalTable);
      // moveTableMgmt.value = res.data;
      moveTableMgmt.value.status = "ไม่ว่าง";
      await tableMgmtService.updateTableMgmt(
        moveTableMgmt.value.id!,
        moveTableMgmt.value
      );
      console.log(moveTableMgmt.value);
      dialogM.value = false;
      dialog.value = false;
      receiptStore.updateTableRec(value, moveTableMgmt.value);
      await getTableMgmts();
    } else {
      messageStore.showMessage(
        "ไม่สามารถย้ายโต๊ะที่ " + editedTableMgmt.value.num + " ได้"
      );
    }
    // dialogM.value = false;
    // dialog.value = false;
    loadingStore.isLoading = false;
  };
  const cleanedTable = async (id: number, value: TableMgmt) => {
    loadingStore.isLoading = true;
    editedTableMgmt.value = value;
    if (editedTableMgmt.value.status == "กำลังจะว่าง") {
      console.log(editedTableMgmt.value.id);
      editedTableMgmt.value.status = "ว่าง";
      await tableMgmtService.updateTableMgmt(id, editedTableMgmt.value);
      await getTableMgmts();
    } else {
      messageStore.showMessage(
        "ไม่สามารถเก็บโต๊ะที่ " + editedTableMgmt.value.num + " ได้"
      );
    }
    await getTableMgmts();
    loadingStore.isLoading = false;
  };
  async function saveTableMgmt() {
    loadingStore.isLoading = true;
    try {
      if (editedTableMgmt.value.id) {
        await tableMgmtService.updateTableMgmt(
          editedTableMgmt.value.id,
          editedTableMgmt.value
        );
      } else {
        await tableMgmtService.saveTableMgmt(editedTableMgmt.value);
      }
      dialog.value = false;
      // console.log(editedTableMgmt.value);
      await getTableMgmts();
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถบันทึก Table Management ได้");
    }
    loadingStore.isLoading = false;
  }

  function editTableMgmt(tablemgmt: TableMgmt) {
    loadingStore.isLoading = true;
    editedTableMgmt.value = JSON.parse(JSON.stringify(tablemgmt));
    dialog.value = true;
    loadingStore.isLoading = false;
  }

  function deleteTableMgmt(id: number, num: number) {
    loadingStore.isLoading = true;
    editedTableMgmt.value.id = id;
    editedTableMgmt.value.num = num;
    // console.log(tableMgmts.value[id].num);
    messageStore.showConfirm(
      "ต้องการลบโต๊ะ " + editedTableMgmt.value.num + " หรือไม่",
      "tablemanagement"
    );
    loadingStore.isLoading = false;
  }

  async function confirmDelete() {
    try {
      await tableMgmtService.deleteTableMgmt(editedTableMgmt.value.id!);
      await getTableMgmts();
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถลบ Table Management ได้");
    }
    loadingStore.isLoading = false;
  }

  function clearTableMgmt() {
    editedTableMgmt.value = {
      num: 0,
      status: "",
      seat: 0,
    };
  }
  ///numStatus
  async function getNumReady() {
    numReady.value = 0;
    for (let i = 0; i < tableMgmts.value.length; i++) {
      if (tableMgmts.value[i].status == "ว่าง") {
        numReady.value++;
      }
    }
  }
  async function getNumClean() {
    numClean.value = 0;
    for (let i = 0; i < tableMgmts.value.length; i++) {
      if (tableMgmts.value[i].status == "กำลังจะว่าง") {
        numClean.value++;
      }
    }
  }
  async function getNumBusy() {
    numBusy.value = 0;
    for (let i = 0; i < tableMgmts.value.length; i++) {
      if (tableMgmts.value[i].status == "ไม่ว่าง") {
        numBusy.value++;
      }
    }
  }

  ///getTable

  function getTableAll() {
    needStatus.value = "";
  }
  function getTableReady() {
    needStatus.value = "ว่าง";
  }
  function getTableClean() {
    needStatus.value = "กำลังจะว่าง";
  }
  function getTableBusy() {
    needStatus.value = "ไม่ว่าง";
  }

  const statusTable = async (id: number) => {
    const res = await tableMgmtService.getOneTableMgmt(id);
    editedTableMgmt.value = res.data;
    try {
      if (editedTableMgmt.value.status == "ไม่ว่าง") {
        editedTableMgmt.value.status = "กำลังจะว่าง";
        await tableMgmtService.updateTableMgmt(
          editedTableMgmt.value.id!,
          editedTableMgmt.value
        );
        await getTableMgmts();
      } else {
        messageStore.showMessage(
          "ไม่สามารถเปลี่ยนสถานะโต๊ะที่ " + editedTableMgmt.value.num + " ได้"
        );
      }
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถเปลี่ยนสถานะ Table ได้");
    }
  };

  return {
    tableMgmts,
    getTableMgmts,
    dialog,
    dialogM,
    editedTableMgmt,
    saveTableMgmt,
    editTableMgmt,
    deleteTableMgmt,
    confirmDelete,
    clearTableMgmt,
    nameTableMgmt,
    seatTableMgmt,
    reservedTable,
    cleanedTable,
    canceledTable,
    movedTable,
    numBusy,
    numClean,
    numReady,
    getNumReady,
    getNumClean,
    getNumBusy,
    getTableReady,
    getTableBusy,
    getTableClean,
    getTableAll,
    needStatus,
    statusTable,
  };
});
