import { defineStore } from "pinia";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import popMenuService from "@/services/popMenu";
import type PopMenu from "@/types/PopMenu";
import { ref, watch } from "vue";

export const usePopMenuStore = defineStore("popmenu", () => {
  const messageStore = useMessageStore();
  const loadingStore = useLoadingStore();
  const popMenus = ref<PopMenu[]>([]);
  const dialog = ref(false);
  const categoryNew = ref(1);
  const category = [
    { id: 1, name: "FOOD" },
    { id: 2, name: "DESSERT" },
    { id: 3, name: "BEVERAGE" },
  ];
  watch(categoryNew, async (newCategory, oldCategory) => {
    await getPopMenuByCategory(newCategory);
    console.log(newCategory);
  });
  async function getPopMenuByCategory(categoryB: number) {
    loadingStore.isLoading = true;
    try {
      // for (const pm of category) {
      if (categoryB == 2) {
        const res = await popMenuService.getPopDessert();
        popMenus.value = res.data;
      } else if (categoryB == 3) {
        const res = await popMenuService.getPopBeverage();
        popMenus.value = res.data;
      } else if (categoryB == 1) {
        const res = await popMenuService.getPopFood();
        popMenus.value = res.data;
      }
      // }
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Pop Menu ได้");
    }
    loadingStore.isLoading = false;
  }
  async function getPopMenu() {
    loadingStore.isLoading = true;
    try {
      const res = await popMenuService.getPopFood();
      popMenus.value = res.data;
      // for (const pm of category) {
      //   // console.log(pm.id);
      //   if (pm.id == 2) {
      //     const res = await popMenuService.getPopDessert();
      //     popMenus.value = res.data;
      //
      //   } else if (pm.id == 3) {
      //     const res = await popMenuService.getPopBeverage();
      //     popMenus.value = res.data;
      //
      //   } else if (pm.id == 1) {
      //     const res = await popMenuService.getPopFood();
      //     popMenus.value = res.data;
      //   }
      // }
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Pop Menu ได้");
    }
    loadingStore.isLoading = false;
  }
  return {
    popMenus,
    getPopMenu,
    category,
    categoryNew,
    getPopMenuByCategory,
    dialog,
  };
});
