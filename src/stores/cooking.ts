import { ref } from "vue";
import { defineStore } from "pinia";
import type Cooking from "@/types/Cooking";
// import type RecieptDetail from "@/types/RecieptDetail";
import { useMenuStore } from "@/stores/menu";
import { useRecieptDetailStore } from "@/stores/receipt_detail";
const menuStore = useMenuStore();
const recieptDetailStore = useRecieptDetailStore();

export const useCookingStore = defineStore("cooking", () => {
  const menus = menuStore.menus;
  // const recieptDetail = recieptDetailStore.recieptDetails;
  const cookingList = ref(<Cooking[]>[]);
  const beverageList = ref(<Cooking[]>[]);
  const cookingListc = ref(<Cooking[]>[]);
  const tableNum = 3;
  const statuss = "รอ";
  const cooking = ref({
    id: -1,
    tableNumber: 0,
    menuName: "",
    quantity: 1,
    status: "",
  });
  let n = 0;

  const divide = (menuName: string): number => {
    // console.log(menuName);
    const index = menus.findIndex((item) => item.name === menuName);
    // console.log(index);
    return index;
  };

  // const normal = (): void => {
  // for (let i = 0; i < recieptDetail.length; i++) {
  //   const index = divide(recieptDetail[i].menuName);
  //   if (index >= 0) {
  //     const menu = menus[index];
  //     console.log(menu);
  //     if (menu.category !== "เครื่องดื่ม") {
  //       const q = recieptDetail[i].quantity;
  //       const name = recieptDetail[i].menuName;
  //       for (let i = 0; i < q; i++) {
  //         cooking.value.id = ++n;
  //         console.log(n);
  //         cooking.value.tableNumber = tableNum;
  //         cooking.value.menuName = name;
  //         cooking.value.quantity = 1;
  //         cooking.value.status = statuss;
  //         cookingList.value.push(cooking.value);
  //         clear();
  //       }
  //       // console.log(cookingList);
  //     } else {
  //       cooking.value.id = recieptDetail[i].id;
  //       cooking.value.tableNumber = tableNum;
  //       cooking.value.menuName = recieptDetail[i].menuName;
  //       cooking.value.quantity = recieptDetail[i].quantity;
  //       cooking.value.status = statuss;
  //       beverageList.value.push(cooking.value);
  //       clear();
  //     }
  //   }
  // }
  // };

  function clear() {
    cooking.value = {
      id: -1,
      tableNumber: 0,
      menuName: "",
      quantity: 1,
      status: "",
    };
  }

  const cate = (category: string): void => {
    n = 0;
    if (category === "ทั้งหมด" || category === "") {
      cookingListc.value = cookingList.value;
      // console.log(cookingListc.value);
      return;
    }
    cookingListc.value = <Cooking[]>[];
    for (let i = 0; i < cookingList.value.length; i++) {
      const index = divide(cookingList.value[i].menuName);
      if (index >= 0) {
        const menu = menus[index];
        // if (menu.category === category) {
        //   cooking.value.id = cookingList.value[i].id;
        //   console.log(cooking.value.id);
        //   cooking.value.tableNumber = cookingList.value[i].tableNumber;
        //   cooking.value.menuName = cookingList.value[i].menuName;
        //   cooking.value.quantity = cookingList.value[i].quantity;
        //   cooking.value.status = cookingList.value[i].status;
        //   cookingListc.value.push(cooking.value);
        //   clear();
        // }
      }
    }
  };

  const queueItems = (id: number): number => {
    const idd = cookingListc.value.findIndex((item) => item.id === id);
    return idd + 1;
  };

  const queueItemsB = (id: number): number => {
    const idd = beverageList.value.findIndex((item) => item.id === id);
    return idd + 1;
  };

  const deleteItem = (id: number, select: string): void => {
    console.log(id);
    // const index = cookingListc.value.findIndex((item) => item.id === id);
    const indeX = cookingList.value.findIndex((item) => item.id === id);
    console.log(indeX);
    // cookingListc.value.splice(index, 1);
    // const ind = divide(cookingList.value[indeX].menuName);
    // const cat = menus[ind].category;
    cookingList.value.splice(indeX, 1);
    if (select !== "ทั้งหมด" && select !== "") {
      cate(select);
    }
  };

  return {
    cookingList,
    beverageList,
    cate,
    cookingListc,
    queueItems,
    queueItemsB,
    deleteItem,
  };
});
