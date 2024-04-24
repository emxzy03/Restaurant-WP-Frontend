import { ref, watch } from "vue";
import { defineStore } from "pinia";
import type Menu from "@/types/Menu";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import menuService from "@/services/menu";

export const useMenuStore = defineStore("menu", () => {
  const isBeverage = ref(false);
  const loadingStore = useLoadingStore();
  const menus = ref<Menu[]>([]);
  const messageStore = useMessageStore();
  const dialog = ref(false);
  const editedMenu = ref<Menu & { files: File[] }>({
    name: "",
    price: 0,
    files: [],
  });

  function clearMenu() {
    editedMenu.value = {
      name: "",
      price: 0,
      files: [],
    };
  }

  watch(dialog, (newDialog, oldDialog) => {
    if (!newDialog) {
      clearMenu();
    }
  });

  async function getMenus() {
    loadingStore.isLoading = true;
    try {
      const res = await menuService.getMenus();
      menus.value = res.data;
      console.log(menus.value);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Menu ได้");
    }
    loadingStore.isLoading = false;
  }

  const nameMenu = () => {
    const items = [];
    for (let i = 0; i < menus.value.length; i++) {
      items.push(menus.value[i].name);
    }
    return items;
  };

  async function saveMenu() {
    loadingStore.isLoading = true;
    try {
      if (editedMenu.value.id) {
        await menuService.updateMenu(editedMenu.value.id, editedMenu.value);
      } else {
        await menuService.saveMenu(editedMenu.value);
      }
      dialog.value = false;
      await getMenus();
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถบันทึก Menu ได้");
    }
    loadingStore.isLoading = false;
  }

  function editMenu(menu: Menu) {
    loadingStore.isLoading = true;
    editedMenu.value = JSON.parse(JSON.stringify(menu));
    editedMenu.value.categoryName = editedMenu.value.category?.name;
    dialog.value = true;
    loadingStore.isLoading = false;
  }

  function deleteMenu(id: number) {
    loadingStore.isLoading = true;
    editedMenu.value.id = id;
    messageStore.showConfirm("Do you want to delete this Menu?", "menu");
    loadingStore.isLoading = false;
  }

  async function confirmDelete() {
    try {
      await menuService.deleteMenu(editedMenu.value.id!);
      await getMenus();
    } catch (e) {
      messageStore.showMessage("ไม่สามารถลบ Menu ได้");
    }
    loadingStore.isLoading = false;
  }

  /* ที่ไปเจอมา cate: เมนูแนะนำ เมนูผัด-ทอด เมนูอบ-นึ่ง เมนูเผา-ย่าง เมนูแกง-ต้ม เมนูเส้น เมนูขนมหวาน เมนูเครื่องดื่ม */

  return {
    menus,
    isBeverage,
    getMenus,
    nameMenu,
    dialog,
    editedMenu,
    saveMenu,
    editMenu,
    deleteMenu,
    confirmDelete,
    clearMenu,
  };
});
