import materialService from "@/services/material";
import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";
import type BillMaterial from "@/types/BillMaterial";
import billMatService from "@/services/bill-material";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import type BillMaterialDetail from "@/types/BillMaterialDetail";

export const useBillMaterialStore = defineStore("bill-material", () => {
  const loadingStore = useLoadingStore();
  const billMaterials = ref<BillMaterial[]>([]);
  const billMatDetails = ref<BillMaterialDetail[]>([]);
  const billMaterialsAt = ref<BillMaterial>();
  const messageStore = useMessageStore();
  const editedBillMaterial = ref<BillMaterial>({
    shop_name: "",
    buy: 0,
    total: 0,
    change: 0,
    employeeId: parseInt(localStorage.getItem("userIDNow")!),
  });
  const dialog = ref(false);
  const editedBillItem = ref<BillMaterialDetail>({
    materialId: 1,
    quantity: 1,
    price: 0,
    total: 0,
  });
  const dialogD = ref(false);
  const date = ref<string[]>([]);
  const year = ref<string[]>([]);
  const month = [
    { valuem: "01", mnth: "มกราคม" },
    { valuem: "02", mnth: "กุมภาพันธ์" },
    { valuem: "03", mnth: "มีนาคม" },
    { valuem: "04", mnth: "เมษายน" },
    { valuem: "05", mnth: "พฤษภาคม" },
    { valuem: "06", mnth: "มิถุนายน" },
    { valuem: "07", mnth: "กรกฎาคม" },
    { valuem: "08", mnth: "สิงหาคม" },
    { valuem: "09", mnth: "กันยายน" },
    { valuem: "10", mnth: "ตุลาคม" },
    { valuem: "11", mnth: "พฤศจิกายน" },
    { valuem: "12", mnth: "ธันวาคม" },
  ];
  const selectDate = ref();
  const selectMonth = ref();
  const selectYear = ref();
  const strDate = ref("");
  async function getBillMaterials() {
    loadingStore.isLoading = true;
    try {
      const res = await billMatService.getBillMaterials();
      billMaterials.value = res.data;
      console.log(res);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Bill Material ได้");
    }
    loadingStore.isLoading = false;
  }

  const nameBillMaterial = () => {
    const items: string[] = [];
    for (let i = 0; i < billMaterials.value.length; i++) {
      if (!items.includes(billMaterials.value[i].shop_name)) {
        items.push(billMaterials.value[i].shop_name);
      }
    }
    for (let i = 0; i < billMaterials.value.length; i++) {
      if (
        !items.includes(
          billMaterials.value[i].date!.toString().substring(0, 10)
        )
      ) {
        items.push(billMaterials.value[i].date!.toString().substring(0, 10));
      }
    }

    console.log(items);
    return items;
  };

  function setDateNow() {
    if (new Date().getUTCDate() < 10) {
      selectDate.value = "0" + (new Date().getUTCDate() + 1);
    } else {
      selectDate.value = new Date().getUTCDate() + 1;
    }
    if (new Date().getUTCMonth() + 1 < 10) {
      selectMonth.value = "0" + (new Date().getUTCMonth() + 1);
    } else {
      selectMonth.value = new Date().getUTCMonth() + 1;
    }
    selectYear.value = new Date().getUTCFullYear();
  }

  function setYears() {
    year.value = [];
    for (let i = 2020; i <= new Date().getUTCFullYear(); i++) {
      year.value.push(i + "");
    }
  }

  function setDates() {
    console.log(selectMonth.value);
    date.value = [];
    for (let i = 1; i <= 31; i++) {
      if (i < 10) {
        date.value.push("0" + i);
      } else if (selectMonth.value == "02" && i == 28) {
        date.value.push("" + i);
        const tyear = parseInt(selectYear.value);
        if (tyear % 400 == 0 || (tyear % 4 == 0 && tyear % 100 != 0)) {
          date.value.push("29");
        }
        break;
      } else if (
        (selectMonth.value == "04" ||
          selectMonth.value == "06" ||
          selectMonth.value == "09" ||
          selectMonth.value == "11") &&
        i == 30
      ) {
        date.value.push("" + i);
        break;
      } else {
        date.value.push("" + i);
      }
    }
    console.log(date);
  }

  async function getBillItemsAt(id: number) {
    loadingStore.isLoading = true;
    try {
      const bill = await billMatService.getOneBillMaterials(id);
      billMaterialsAt.value = bill.data;
      console.log(billMaterialsAt.value?.billItems);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Bill Material detail ได้");
    }
    loadingStore.isLoading = false;
  }

  async function saveBillMaterial() {
    loadingStore.isLoading = true;
    try {
      console.log(editedBillMaterial.value.id);
      if (editedBillMaterial.value.id != undefined) {
        editedBillMaterial.value.billItems = undefined;
        await billMatService.updateBillMaterials(
          editedBillMaterial.value.id,
          editedBillMaterial.value
        );
        console.log(editedBillMaterial.value);
      } else {
        console.log(editedBillMaterial.value);
        await billMatService.saveBillMaterials(editedBillMaterial.value);
      }
      dialog.value = false;
      await getBillMaterials();
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถบันทึก BillMaterial Management ได้");
    }
    loadingStore.isLoading = false;
  }

  function clear() {
    editedBillMaterial.value = {
      shop_name: "",
      buy: 0,
      total: 0,
      change: 0,
    };
  }

  watch(dialog, (newDialog, oldDialog) => {
    if (!newDialog) {
      clear();
    }
  });

  function editBillMaterial(billMaterial: BillMaterial) {
    loadingStore.isLoading = true;
    editedBillMaterial.value = JSON.parse(JSON.stringify(billMaterial));
    editedBillMaterial.value.employeeId = billMaterial.employee!.id;
    selectDate.value = editedBillMaterial.value
      .date!.toString()
      .substring(8, 10);
    selectMonth.value = editedBillMaterial.value
      .date!.toString()
      .substring(5, 7);
    selectYear.value = editedBillMaterial.value
      .date!.toString()
      .substring(0, 4);
    console.log(editedBillMaterial);
    dialog.value = true;
    loadingStore.isLoading = false;
  }

  const saveBillItems = async (billId: number) => {
    await getBillItemsAt(billId);

    const id = billMaterialsAt.value?.id;
    console.log(billMaterialsAt.value);
    const updateBillMaterial = ref<BillMaterial>({
      shop_name: billMaterialsAt.value!.shop_name,
      buy: billMaterialsAt.value!.buy,
      total: billMaterialsAt.value!.total,
      change: billMaterialsAt.value!.change,
      employeeId: billMaterialsAt.value!.employeeId,
      billItems: [], //billMaterialsAt.value!.billItems,
    });
    console.log(updateBillMaterial.value.billItems);
    billMatDetails.value.forEach((element) => {
      updateBillMaterial.value.billItems!.push({
        materialId: element.materialId,
        quantity: element.quantity,
        price: element.price!,
        // total: element.total,
        total: element.quantity * element.price!,
      });
    });
    console.log(updateBillMaterial.value.billItems);

    try {
      await billMatService.updateBillMaterials(id!, updateBillMaterial.value!);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถบันทึก bill detail ได้");
    }

    await getBillItemsAt(billId);
  };

  function editBillItem(billItem: BillMaterialDetail) {
    console.log(billItem.material);
    loadingStore.isLoading = true;
    editedBillItem.value = JSON.parse(JSON.stringify(billItem));
    editedBillItem.value.materialId = billItem.material!.id;
    dialogD.value = true;
    loadingStore.isLoading = false;
  }

  const getMatPrice = async () => {
    const res = await materialService.getOneMaterial(
      editedBillItem.value.materialId!
    );
    const material = res.data;
    editedBillItem.value.price = material.unit_price;
    console.log(material);

    editedBillItem.value.total = computed(
      () => editedBillItem.value.quantity * editedBillItem.value.price
    ).value;
  };

  function clearDetail() {
    editedBillItem.value = {
      quantity: 1,
      price: 0,
    };
  }

  watch(dialogD, (newDialog, oldDialog) => {
    if (!newDialog) {
      clearDetail();
    }
  });

  function deleteBillItem(id: number) {
    loadingStore.isLoading = true;
    editedBillItem.value.id = id;
    messageStore.showConfirm(
      "Do you want to delete this bill item?",
      "billitem"
    );
    loadingStore.isLoading = false;
  }

  async function confirmDeleteItem() {
    try {
      await billMatService.deleteBillItem(editedBillItem.value.id!);
      await getBillItemsAt(billMaterialsAt.value!.id!);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถลบ Bill Item ได้");
    }
    loadingStore.isLoading = false;
  }

  function deleteBill(id: number) {
    loadingStore.isLoading = true;
    editedBillMaterial.value.id = id;
    messageStore.showConfirm("Do you want to delete this bill?", "bill");
    loadingStore.isLoading = false;
  }

  async function confirmDelete() {
    try {
      await billMatService.deleteBillMaterial(editedBillMaterial.value.id!);
      await getBillMaterials();
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถลบ Bill ได้");
    }
    loadingStore.isLoading = false;
  }

  return {
    billMaterials,
    getBillMaterials,
    billMaterialsAt,
    getBillItemsAt,
    saveBillMaterial,
    dialog,
    editedBillMaterial,
    clear,
    editBillMaterial,
    billMatDetails,
    saveBillItems,
    dialogD,
    editedBillItem,
    clearDetail,
    getMatPrice,
    editBillItem,
    deleteBillItem,
    confirmDeleteItem,
    deleteBill,
    confirmDelete,
    nameBillMaterial,
    selectDate,
    selectMonth,
    selectYear,
    strDate,
    date,
    month,
    year,
    setDates,
    setDateNow,
    setYears,
  };
});
