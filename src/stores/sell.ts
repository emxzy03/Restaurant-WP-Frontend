import { ref } from "vue";
import { defineStore } from "pinia";
import type RecieptDetail from "@/types/ReceiptDetail";
import type Menu from "@/types/Menu";
import receiptService from "@/services/receipt";
import menuqueueService from "@/services/menu-queue";
import { useMessageStore } from "./message";
import type Receipt from "@/types/Receipt";
import type MenuQueue from "@/types/MenuQueue";
import { useRoute } from "vue-router";
import { useReceiptStore } from "./receipt";
import tableMgmt from "@/services/table-mgmt";

export const useSellStore = defineStore("sell", () => {
  const colorStatus = ref("#EEEEEE");
  const route = useRoute();
  const messageStore = useMessageStore();
  const receiptStore = useReceiptStore();
  const isPos = ref(false);
  const isOrder = ref(false);
  const textSearch = ref("");
  const dialog = ref(false);
  const billDialog = ref(false);
  const orderOnTable = ref<MenuQueue[]>([]);
  // const isTableId =
  const menuDetail = ref<
    Menu & { quantity?: number; total?: number; note?: string }
  >({
    id: 0,
    name: "",
    price: 0,
    quantity: 1,
  });

  const getReceiptUuid = () => {
    return route.params.id.toString();
  };

  const cartDetail = ref<
    (RecieptDetail & { menuId?: number; note?: string })[]
  >([]);
  const menuCart = ref<RecieptDetail & { menuId?: number; note?: string }>();

  const showMenuDetail = (menu: Menu, id: number) => {
    menuDetail.value!.id = menu.id;
    menuDetail.value!.name = menu.name;
    menuDetail.value!.price = menu.price;
    menuDetail.value!.image = menu.image;
    if (id != -1) {
      menuDetail.value!.quantity = cartDetail.value[id].quantity!;
      menuDetail.value.note = cartDetail.value[id].note;
    } else {
      menuDetail.value!.quantity = 1;
      menuDetail.value.note = "";
    }
    dialog.value = true;
  };

  const saveMenuDetail = (
    menu: Menu & { quantity?: number; total?: number; note?: string }
  ) => {
    const item = ref<RecieptDetail & { menuId?: number; note?: string }>({
      menuId: menu.id,
      name: menu.name,
      price: menu.price,
      quantity: menu.quantity!,
      total: menu.total,
      note: menu.note,
    });
    const added = ref(false);
    if (cartDetail.value.length > 0) {
      cartDetail.value.forEach((element) => {
        if (element.name == item.value.name) {
          element.quantity = item.value.quantity;
          element.total! = item.value.total!;
          element.note = item.value.note;
          added.value = true;
        }
      });
    }
    if (!added.value && item.value.quantity != 0) {
      cartDetail.value.push(item.value);
    }
  };

  const cancelOneMenu = (
    menu: RecieptDetail & { menuId?: number; note?: string }
  ) => {
    menuCart.value = menu;
    messageStore.showConfirm(
      `คุณต้องการยกเลิกคำสั่งซื้อสำหรับ ${menuCart.value.name} จริงหรือไม่?`,
      "oneCart"
    );
  };

  const cancelAll = () => {
    messageStore.showConfirm(
      `คุณต้องการยกเลิกคำสั่งซื้อทั้งหมดจริงหรือไม่?`,
      "allCart"
    );
  };

  const confirmCancel = () => {
    const index = cartDetail.value.indexOf(menuCart.value!);
    cartDetail.value.splice(index, 1);
  };

  const clear = () => {
    cartDetail.value = [];
    console.log("cartDetail => ", cartDetail.value);
  };
  const confirm = async (tableId: number) => {
    try {
      const orderOn = await checkReceiptInTable(tableId);
      const updateReceipt = ref<Receipt>({ receiptDetail: [] });
      const receipted = ref<Receipt>();
      if (orderOn) {
        //if found receipt on table
        // PATCH
        const receiptOntable = await receiptService.getOneReceiptsByTableId(
          tableId
        );
        receipted.value = receiptOntable.data;
        updateReceipt.value.table = receiptOntable.data.table;
        cartDetail.value.forEach((element) => {
          updateReceipt.value!.receiptDetail!.push({
            menuId: element.menuId!,
            quantity: element.quantity!,
          });
        });
        //insert receipt detail to receipt on table
        const receiptNew = await receiptService.updateReceiptDetail(
          receiptOntable.data.id,
          updateReceipt.value
        );
        receipted.value = receiptNew.data;
      } else {
        //if not found receipt on table
        //Get Table
        const table = await tableMgmt.getOneTableMgmt(tableId);
        //POST receipt
        updateReceipt.value.table = table.data;
        cartDetail.value.forEach((element) => {
          updateReceipt.value.receiptDetail!.push({
            menuId: element.menuId!,
            quantity: element.quantity!,
          });
        });
        // console.log("receipt data for POST => ", updateReceipt);
        const receiptNew = await receiptService.saveReceipts(
          updateReceipt.value
        );
        // console.log("receipt after POST => ", updateReceipt);
        receipted.value = receiptNew.data;
      }

      // console.log("receipt befor save =>", receipted);
      //POST menu_queue
      const listMenuQueue: MenuQueue[] = [];
      cartDetail.value.forEach((element) => {
        const menuQueue: MenuQueue = {
          name: element.name!,
          note: element.note!,
          status: "รอทำ",
          menuId: element.menuId,
          quantity: element.quantity,
          receipt: receipted.value,
          receiptId: receipted.value?.id,
        };
        listMenuQueue.push(menuQueue);
      });
      listMenuQueue.forEach(async (element) => {
        await menuqueueService.saveMenuQueue(element);
        // console.log("menuQueue for save => ", element);
      });
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถสั่งอาหารได้");
    }

    // await receiptStore.getOneReceiptsByUUid(getReceiptUuid());
    checkReceiptDetail();
    clear();
  };
  const checkReceiptInTable = async (tableId: number) => {
    orderOnTable.value = [];
    try {
      const receipt = await tableMgmt.getReceiptOnTable(tableId);
      if (receipt.data.length === 0 || receipt === null || !receipt) {
        return false;
      }
      orderOnTable.value = receipt.data;
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่พบอาหารในโต๊ะ");
    }
    return true;
  };

  // const confirm = async () => {
  //   //GET receipt
  //   await receiptStore.getOneReceiptsByUUid(getReceiptUuid());

  //   const id = receiptStore.receiptsAt?.id;

  //   //PATCH receipt
  //   const updateReceipt = ref<Receipt>({
  //     receiptDetail: [],
  //   });
  //   cartDetail.value.forEach((element) => {
  //     updateReceipt.value.receiptDetail!.push({
  //       menuId: element.menuId!,
  //       quantity: element.quantity!,
  //     });
  //   });

  //   //POST menu_queue
  //   const listMenuQueue = ref<MenuQueue[]>([]);
  //   cartDetail.value.forEach((element) => {
  //     for (let i = 0; i < element.quantity; i++) {
  //       const menu_queue = ref<MenuQueue>({
  //         name: element.name!,
  //         note: element.note!,
  //         status: "รอทำ",
  //         menuId: element.menuId,
  //         receiptId: id,
  //         quantity: 1,
  //       });
  //       listMenuQueue.value.push(menu_queue.value);
  //     }
  //   });
  //   try {
  //     await receiptService.updateReceipts(id!, updateReceipt.value!);
  //     listMenuQueue.value.forEach(async (element) => {
  //       await menuqueueService.saveMenuQueue(element);
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     messageStore.showMessage("ไม่สามารถสั่งอาหารได้");
  //   }

  //   await receiptStore.getOneReceiptsByUUid(getReceiptUuid());
  //   checkReceiptDetail();
  //   clear();
  // };

  const checkReceiptDetail = () => {
    if (receiptStore.receiptsAt?.receiptDetail != undefined) {
      if (receiptStore.receiptsAt!.receiptDetail!.length! > 0) {
        colorStatus.value = "red";
      } else {
        colorStatus.value = "#EEEEEE";
      }
    }
  };

  return {
    isPos,
    isOrder,
    saveMenuDetail,
    clear,
    textSearch,
    confirm,
    cartDetail,
    dialog,
    menuDetail,
    showMenuDetail,
    getReceiptUuid,
    billDialog,
    cancelOneMenu,
    confirmCancel,
    cancelAll,
    checkReceiptDetail,
    colorStatus,
    checkReceiptInTable,
    orderOnTable,
  };
});
