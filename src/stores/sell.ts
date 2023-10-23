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
  };

  const confirm = async () => {
    //GET receipt
    await receiptStore.getOneReceiptsByUUid(getReceiptUuid());

    const id = receiptStore.receiptsAt?.id;

    //PATCH receipt
    const updateReceipt = ref<Receipt>({
      receiptDetail: [],
    });
    cartDetail.value.forEach((element) => {
      updateReceipt.value.receiptDetail!.push({
        menuId: element.menuId!,
        quantity: element.quantity!,
      });
    });

    //POST menu_queue
    const listMenuQueue = ref<MenuQueue[]>([]);
    cartDetail.value.forEach((element) => {
      for (let i = 0; i < element.quantity; i++) {
        const menu_queue = ref<MenuQueue>({
          name: element.name!,
          note: element.note!,
          status: "รอทำ",
          menuId: element.menuId,
          receiptId: id,
        });
        listMenuQueue.value.push(menu_queue.value);
      }
    });
    try {
      await receiptService.updateReceipts(id!, updateReceipt.value!);
      listMenuQueue.value.forEach(async (element) => {
        await menuqueueService.saveMenuQueue(element);
      });
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถสั่งอาหารได้");
    }

    await receiptStore.getOneReceiptsByUUid(getReceiptUuid());
    checkReceiptDetail();
    clear();
  };

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
  };
});
