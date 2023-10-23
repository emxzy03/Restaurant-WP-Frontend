import { ref, watch } from "vue";
import { defineStore } from "pinia";
import type Category from "@/types/category";
import categoryService from "@/services/category";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";

export const useCategoryStore = defineStore("category", () => {
  const loadingStore = useLoadingStore();
  const categories = ref<Category[]>([]);
  const messageStore = useMessageStore();
  const dialog = ref(false);
  const editedCategory = ref<Category>({
    name: "",
  });
  const listCategories = ref<String[]>([]);

  watch(dialog, (newDialog, oldDialog) => {
    console.log(newDialog);
    if (!newDialog) {
      clearCategory();
    }
  });

  async function getCategories() {
    loadingStore.isLoading = true;
    try {
      const res = await categoryService.getCategories();
      const list = ref<String[]>([]);
      categories.value = res.data;
      categories.value.forEach((element) => {
        list.value.push(element.name);
      });
      listCategories.value = list.value;
      console.log(res);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Category ได้");
    }
    loadingStore.isLoading = false;
  }

  const nameCategory = () => {
    const items = [];
    for (let i = 0; i < categories.value.length; i++) {
      items.push(categories.value[i].name);
    }

    console.log(items);
    return items;
  };
  async function saveCategory() {
    loadingStore.isLoading = true;
    try {
      if (editedCategory.value.id) {
        await categoryService.updateCategory(
          editedCategory.value.id,
          editedCategory.value
        );
      } else {
        await categoryService.saveCategory(editedCategory.value);
      }
      dialog.value = false;
      // console.log(editedCategory.value);
      await getCategories();
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถบันทึก Category ได้");
    }
    loadingStore.isLoading = false;
  }
  function editCategory(category: Category) {
    loadingStore.isLoading = true;
    editedCategory.value = JSON.parse(JSON.stringify(category));
    dialog.value = true;
    loadingStore.isLoading = false;
  }
  function deleteCategory(id: number) {
    loadingStore.isLoading = true;
    editedCategory.value.id = id;
    messageStore.showConfirm(
      "Do you want to delete this Category?",
      "category"
    );
    loadingStore.isLoading = false;
  }
  async function confirmDelete() {
    try {
      await categoryService.deleteCategory(editedCategory.value.id!);
      await getCategories();
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถลบ Category ได้");
    }
    loadingStore.isLoading = false;
  }

  function clearCategory() {
    editedCategory.value = {
      name: "",
    };
  }

  return {
    categories,
    getCategories,
    dialog,
    editedCategory,
    saveCategory,
    editCategory,
    confirmDelete,
    clearCategory,
    nameCategory,
    deleteCategory,
    listCategories,
  };
});
