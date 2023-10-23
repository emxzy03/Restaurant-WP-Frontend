import { ref } from "vue";
import { defineStore } from "pinia";
import { useMaterialStore } from "./materials";
import { useMenuStore } from "./menu";
import { useTableMgmtStore } from "./table-mgmt";
import { useCategoryStore } from "./category";
import receipt from "@/services/receipt";
import { useReceiptStore } from "./receipt";
import { useSellStore } from "./sell";
import { useBillMaterialStore } from "./bill-materials";
import { useSalaryStore } from "./salary";
import { useCheckMaterialStore } from "./check-materials";
import { useEmployeeStore } from "./employee";

export const useMessageStore = defineStore("message", () => {
  const isShow = ref(false);
  const message = ref("");
  const timeout = ref(2000);
  const isConfirm = ref(false);
  const callNow = ref("");

  const employeeStore = useEmployeeStore();
  const materialStore = useMaterialStore();
  const menuStore = useMenuStore();
  const tableMgmtStore = useTableMgmtStore();
  const categoryStore = useCategoryStore();
  const receiptStore = useReceiptStore();
  const sellStore = useSellStore();
  const billMatStore = useBillMaterialStore();
  const salaryStore = useSalaryStore();
  const checkMatStore = useCheckMaterialStore();

  const showMessage = (msg: string, tout: number = 2000) => {
    message.value = msg;
    isShow.value = true;
    timeout.value = tout;
  };

  const closeMessage = () => {
    message.value = "";
    isShow.value = false;
  };

  function showConfirm(msg: string, whoCall: string) {
    message.value = msg;
    callNow.value = whoCall;
    isConfirm.value = true;
  }

  function cancel() {
    isConfirm.value = false;
    if (callNow.value == "material") {
      materialStore.clearMaterial();
    }
    if (callNow.value == "menu") {
      menuStore.clearMenu();
    }
    if (callNow.value == "tablemanagement") {
      tableMgmtStore.clearTableMgmt();
    }
    if (callNow.value == "category") {
      categoryStore.clearCategory();
    }
    if (callNow.value == "billitem") {
      billMatStore.clearDetail();
    }
    if (callNow.value == "bill") {
      billMatStore.clear();
    }
    if (callNow.value == "checkmat") {
      checkMatStore.clear();
    }
  }

  function confirm() {
    isConfirm.value = false;
    if (callNow.value == "material") {
      materialStore.confirmDelete();
    }
    if (callNow.value == "menu") {
      menuStore.confirmDelete();
    }
    if (callNow.value == "tablemanagement") {
      tableMgmtStore.confirmDelete();
    }
    if (callNow.value == "category") {
      categoryStore.confirmDelete();
    }
    if (callNow.value == "receipt") {
      receiptStore.confirmDelete();
    }
    if (callNow.value == "oneCart") {
      sellStore.confirmCancel();
    }
    if (callNow.value == "allCart") {
      sellStore.clear();
    }
    if (callNow.value == "billitem") {
      billMatStore.confirmDeleteItem();
    }
    if (callNow.value == "bill") {
      billMatStore.confirmDelete();
    }
    if (callNow.value == "salary") {
      salaryStore.confirmDelete();
    }
    if (callNow.value == "checkmat") {
      checkMatStore.confirmDelete();
    }
    if (callNow.value == "receiptitem") {
      receiptStore.confirmDeleteItem();
    }
    if (callNow.value == "employee") {
      employeeStore.confirmDelete();
    }
  }

  return {
    isShow,
    message,
    showMessage,
    closeMessage,
    timeout,
    isConfirm,
    showConfirm,
    confirm,
    cancel,
  };
});
