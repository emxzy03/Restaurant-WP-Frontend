import { ref, watch } from "vue";
import { defineStore } from "pinia";
import type Material from "@/types/Material";
import materialService from "@/services/material";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";

export const useMaterialStore = defineStore("material", () => {
  const loadingStore = useLoadingStore();
  const materials = ref<Material[]>([]);
  const nearly = ref<Material[]>([]);
  const messageStore = useMessageStore();
  const dialog = ref(false);
  const editedMaterial = ref<Material>({
    name: "",
    min_quantity: 0,
    quantity: 0,
    unit: "",
    unit_price: 0,
  });

  watch(dialog, (newDialog, oldDialog) => {
    console.log(newDialog);
    if (!newDialog) {
      clearMaterial();
    }
  });

  async function getMaterials() {
    loadingStore.isLoading = true;
    try {
      const res = await materialService.getMaterials();
      materials.value = res.data;
      console.log(res);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Material ได้");
    }
    loadingStore.isLoading = false;
  }

  async function getNearly() {
    loadingStore.isLoading = true;
    try {
      const res = await materialService.getNearly();
      nearly.value = res.data;
      console.log(res);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Nearly out of Material List ได้");
    }
    loadingStore.isLoading = false;
  }

  const nameMaterial = () => {
    const items = [];
    for (let i = 0; i < materials.value.length; i++) {
      items.push(materials.value[i].name);
    }

    console.log(items);
    return items;
  };

  async function saveMaterial() {
    loadingStore.isLoading = true;
    try {
      if (editedMaterial.value.id) {
        await materialService.updateMaterial(
          editedMaterial.value.id,
          editedMaterial.value
        );
      } else {
        await materialService.saveMaterial(editedMaterial.value);
      }
      dialog.value = false;
      // console.log(editedMaterial.value);
      await getMaterials();
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถบันทึก Material ได้");
    }
    loadingStore.isLoading = false;
  }

  function editMaterial(material: Material) {
    loadingStore.isLoading = true;
    editedMaterial.value = JSON.parse(JSON.stringify(material));
    dialog.value = true;
    loadingStore.isLoading = false;
  }

  function deleteMaterial(id: number) {
    loadingStore.isLoading = true;
    editedMaterial.value.id = id;
    messageStore.showConfirm(
      "Do you want to delete this Material?",
      "material"
    );
    loadingStore.isLoading = false;
  }

  async function confirmDelete() {
    try {
      await materialService.deleteMaterial(editedMaterial.value.id!);
      await getMaterials();
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถลบ Material ได้");
    }
    loadingStore.isLoading = false;
  }

  function clearMaterial() {
    editedMaterial.value = {
      name: "",
      min_quantity: 0,
      quantity: 0,
      unit: "",
      unit_price: 0,
    };
  }

  return {
    materials,
    getMaterials,
    dialog,
    editedMaterial,
    saveMaterial,
    editMaterial,
    deleteMaterial,
    confirmDelete,
    clearMaterial,
    nameMaterial,
    getNearly,
    nearly,
  };
});
