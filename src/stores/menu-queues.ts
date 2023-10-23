import { useLoginStore } from "./login";
import employeeService from "@/services/employee";
import { ref } from "vue";
import { defineStore } from "pinia";
import type MenuQueue from "@/types/MenuQueue";
import type Menu from "@/types/Menu";
import menuQueueService from "@/services/menu-queue";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import type Receipt from "@/types/Receipt";
import type TableMgmt from "@/types/TableManagement";
import type Serve from "@/types/Serve";

export const useMenuQueueStore = defineStore("menuQueue", () => {
  const loadingStore = useLoadingStore();
  const menuQueues = ref<MenuQueue[]>([]);
  const menuQueuesC = ref<MenuQueue[]>([]);
  const menuQueuesDo = ref<MenuQueue[]>([]);
  const menuQueuesW = ref<MenuQueue[]>([]);
  const messageStore = useMessageStore();
  const loginStore = useLoginStore();
  const editedMenuQueue = ref<MenuQueue>({
    name: "",
    note: "",
    status: "",
    menu: <Menu>{},
    receipt: <Receipt>{},
  });
  const serveList = ref<MenuQueue[]>([]);
  const tableNumm = ref(0);
  const countSList = ref<Serve[]>([]);
  const select = ref();
  const selectS = ref();

  async function getMenuQueues() {
    menuQueuesC.value = [];
    loadingStore.isLoading = true;
    try {
      const res = await menuQueueService.getMenuQueues();
      for (const r of res.data) {
        if (r.receipt?.status === "รอชำระเงิน") {
          menuQueuesC.value.push(r);
        }
      }
      // menuQueues.value = res.data;
      menuQueues.value = menuQueuesC.value;
      console.log(res);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Menu Queues ได้");
    }
    await getByCateDo(select.value);
    await getByCateW(select.value);
    await getServeList(tableNumm.value);
    loadingStore.isLoading = false;
  }

  async function getByCateDo(select: number) {
    menuQueuesDo.value = [];
    // await getMenuQueues();
    for (const q of menuQueues.value) {
      if (q.status === "กำลังทำ" && q.menu?.category?.id == select) {
        menuQueuesDo.value.push(q);
      }
    }
  }

  async function getByCateW(select: number) {
    menuQueuesW.value = [];
    // await getMenuQueues();
    for (const q of menuQueues.value) {
      if (q.status === "รอทำ" && q.menu?.category?.id == select) {
        menuQueuesW.value.push(q);
      }
    }
  }

  async function saveMenuQueue() {
    loadingStore.isLoading = true;
    try {
      //     if (editedMenuQueue.value.id) {
      //       await menuQueueService.updateMenuQueue(
      //         editedMenuQueue.value.id,
      //         editedMenuQueue.value
      //       );
      //     } else {
      await menuQueueService.saveMenuQueue(editedMenuQueue.value);
      //     }
      console.log(editedMenuQueue.value);
      await getMenuQueues();
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถบันทึก Menu Queue ได้");
    }
    loadingStore.isLoading = false;
  }

  async function updateStsMenuQ(menuQueue: MenuQueue, status?: string) {
    loadingStore.isLoading = true;

    try {
      const resM = await menuQueueService.getOneMenuQueue(menuQueue.id!);
      const menuQ = resM.data;
      const resE = await employeeService.getOneEmployee(
        parseInt(loginStore.userIdNow)
      );
      const empDo = resE.data;

      if (
        empDo.role === "waitress" &&
        status === "เสิร์ฟแล้ว" &&
        menuQ.status === "รอเสิร์ฟ" &&
        menuQ.receipt?.status === "รอชำระเงิน"
      ) {
        console.log(
          empDo.role +
            status +
            menuQ.status +
            (status === "เสิร์ฟแล้ว" && menuQ.status === "รอเสิร์ฟ")
        );
        menuQ.waitress = empDo;
        // if (status === "เสิร์ฟแล้ว" && menuQ.status === "รอเสิร์ฟ") {
        menuQ.status = status;
        await menuQueueService.updateMenuQueue(menuQ.id, menuQ);
        // }
      } else if (empDo.role !== "waitress" && status !== "เสิร์ฟแล้ว") {
        // console.log(empDo);
        menuQ.chef = empDo;
        if (
          status === "รอเสิร์ฟ" &&
          menuQ.status !== "กำลังทำ" &&
          menuQ.receipt?.status === "รอชำระเงิน"
        ) {
          messageStore.showMessage("Menu Queue นี้ยังไม่ถูกทำ");
        } else if (status === "กำลังทำ" && menuQ.status !== "รอทำ") {
          messageStore.showMessage("Menu Queue ถูกรับรายการไปแล้ว");
        } else {
          menuQ.status = status;
          await menuQueueService.updateMenuQueue(menuQ.id, menuQ);
        }
      } else {
        messageStore.showMessage("ไม่สามารถบันทึก Menu Queue ได้");
      }
      await getMenuQueues();
      await getServeList(tableNumm.value);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถบันทึก Menu Queue ได้");
    }
    loadingStore.isLoading = false;
  }

  // function editMenuQueue(MenuQueue: MenuQueue) {
  //   loadingStore.isLoading = true;
  //   editedMenuQueue.value = JSON.parse(JSON.stringify(MenuQueue));
  //   loadingStore.isLoading = false;
  // }

  function clearMenuQueue() {
    editedMenuQueue.value = {
      name: "",
      note: "",
      status: "",
      menu: <Menu>{},
      receipt: <Receipt>{},
    };
  }

  async function cancelMenuQueue(menuQueue: MenuQueue) {
    loadingStore.isLoading = true;
    try {
      await menuQueueService.deleteMenuQueue(menuQueue.id!);
      await getMenuQueues();
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถยกเลิก Menu Queue นี้ได้");
    }
    loadingStore.isLoading = false;
  }

  async function getServeList(num: number) {
    serveList.value = [];
    for (const mQueue of menuQueues.value) {
      if (
        mQueue.receipt?.table?.num == num &&
        // mQueue.receipt?.status === "รอชำระเงิน" &&
        mQueue.status === "รอเสิร์ฟ"
      ) {
        await serveList.value.push(mQueue);
      }
    }
    for (const mQueue of menuQueues.value) {
      if (
        mQueue.receipt?.table?.num == num &&
        // mQueue.receipt?.status === "รอชำระเงิน" &&
        mQueue.status !== "รอเสิร์ฟ"
      ) {
        await serveList.value.push(mQueue);
      }
    }
  }
  const countS = (item: number): number => {
    let count = 0;
    for (let i = 0; i < menuQueues.value.length; i++) {
      if (
        menuQueues.value[i].receipt?.table?.num === item &&
        menuQueues.value[i].status === "รอเสิร์ฟ" &&
        menuQueues.value[i].receipt?.status === "รอชำระเงิน"
      ) {
        count += 1;
      }
    }
    console.log(count);
    return count;
  };

  function getCountSList(tables: TableMgmt[]) {
    countSList.value = [];
    for (let i = 0; i < tables.length; i++) {
      const numServe = countS(tables[i].num);
      const numAll = countAllIn(tables[i].num);
      getServeList(tables[i].num);
      const table = tables[i];
      const serveLs = serveList.value;
      countSList.value.push({ table, serveLs, numServe, numAll });
    }
  }

  const countAllIn = (item: number): number => {
    let count = 0;
    for (let i = 0; i < menuQueues.value.length; i++) {
      if (
        menuQueues.value[i].receipt?.table?.num === item &&
        menuQueues.value[i].receipt?.status === "รอชำระเงิน"
      ) {
        count += 1;
      }
    }
    console.log(count);
    return count;
  };

  return {
    menuQueues,
    getMenuQueues,
    updateStsMenuQ,
    cancelMenuQueue,
    editedMenuQueue,
    saveMenuQueue,
    // editMenuQueue,
    clearMenuQueue,
    serveList,
    getServeList,
    countS,
    countAllIn,
    tableNumm,
    countSList,
    getCountSList,
    getByCateDo,
    getByCateW,
    menuQueuesW,
    menuQueuesDo,
    select,
    selectS,
  };
});
