import materialService from "@/services/material";
import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";
import type CheckMaterial from "@/types/CheckMaterial";
import checkMatService from "@/services/check-material";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import type CheckMaterialDetail from "@/types/CheckMaterialDetail";
import type Material from "@/types/Material";

export const useCheckMaterialStore = defineStore("check-material", () => {
  const loadingStore = useLoadingStore();
  const checkMaterials = ref<CheckMaterial[]>([]);
  const checkMatDetails = ref<CheckMaterialDetail[]>([]);
  const checkMaterialsAt = ref<CheckMaterial>();
  const messageStore = useMessageStore();
  const editedCheckMaterial = ref<CheckMaterial>({
    employeeId: parseInt(localStorage.getItem("userIDNow")!),
    checkItems: [],
  });
  const nameCheckMaterial = () => {
    const items: string[] = [];
    for (let i = 0; i < checkMaterials.value.length; i++) {
      if (
        !items.includes(
          checkMaterials.value[i].date!.toString().substring(0, 10)
        )
      ) {
        items.push(checkMaterials.value[i].date!.toString().substring(0, 10));
      }
    }

    console.log(items);
    return items;
  };
  const dialog = ref(false);
  const editedCheckItem = ref<CheckMaterialDetail>({
    materialId: 1,
    quantity: 1,
  });
  const dialogD = ref(false);

  async function getCheckMaterials() {
    loadingStore.isLoading = true;
    try {
      const res = await checkMatService.getCheckMaterials();
      checkMaterials.value = res.data;
      console.log(res);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Check Material ได้");
    }
    loadingStore.isLoading = false;
  }

  async function getCheckItemsAt(id: number) {
    loadingStore.isLoading = true;
    try {
      const check = await checkMatService.getOneCheckMaterials(id);
      checkMaterialsAt.value = check.data;
      console.log(checkMaterialsAt.value?.checkItems);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Check Material detail ได้");
    }
    loadingStore.isLoading = false;
  }

  async function saveCheckMaterial() {
    loadingStore.isLoading = true;
    try {
      console.log(editedCheckMaterial.value.id);
      if (editedCheckMaterial.value.id != undefined) {
        // editedCheckMaterial.value.checkItems = undefined;
        editedCheckMaterial.value.checkItems = [];
        checkMatDetails.value.forEach((element) => {
          editedCheckMaterial.value.checkItems!.push({
            materialId: element.materialId,
            quantity: element.now_q!,
          });
        });
        await checkMatService.updateCheckMaterials(
          editedCheckMaterial.value.id,
          editedCheckMaterial.value
        );
        console.log(editedCheckMaterial.value);
      } else {
        console.log(editedCheckMaterial.value);
        checkMatDetails.value.forEach((element) => {
          editedCheckMaterial.value.checkItems!.push({
            materialId: element.materialId,
            quantity: element.now_q!,
          });
        });
        await checkMatService.saveCheckMaterials(editedCheckMaterial.value);
      }
      dialog.value = false;
      await getCheckMaterials();
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถบันทึก CheckMaterial Management ได้");
    }
    loadingStore.isLoading = false;
  }

  function clear() {
    editedCheckMaterial.value = {};
  }

  watch(dialog, (newDialog, oldDialog) => {
    if (!newDialog) {
      clear();
      for (const c of checkMatDetails.value) {
        c.now_q = -1;
      }
    }
  });

  function editCheckMaterial(checkMaterial: CheckMaterial) {
    checkMatDetails.value = [];
    loadingStore.isLoading = true;
    editedCheckMaterial.value = JSON.parse(JSON.stringify(checkMaterial));
    editedCheckMaterial.value.employeeId = checkMaterial.employee!.id;
    const orderList = computed(() => {
      return [...editedCheckMaterial.value.checkItems!].sort(
        (n1, n2) => n1.id! - n2.id!
      );
    });
    for (const cd of orderList.value) {
      editedCheckItem.value.id = cd.id;
      editedCheckItem.value.materialId = cd.material?.id;
      editedCheckItem.value.name = cd.material?.name;
      editedCheckItem.value.last_quantity = cd.last_quantity;
      editedCheckItem.value.now_q = cd.quantity;
      checkMatDetails.value.push(editedCheckItem.value);
      clearDetail();
    }
    console.log(editedCheckMaterial);
    dialog.value = true;
    loadingStore.isLoading = false;
  }

  const setCheckMatd = (materials: Material[]) => {
    checkMatDetails.value = [];
    for (const mat of materials) {
      editedCheckItem.value.materialId = mat.id;
      editedCheckItem.value.name = mat.name;
      editedCheckItem.value.last_quantity = mat.quantity;
      editedCheckItem.value.now_q = -1;
      checkMatDetails.value.push(editedCheckItem.value);
      clearDetail();
    }
    console.log(checkMatDetails.value);
  };

  // const saveCheckItems = async (checkId: number) => {
  //   await getCheckItemsAt(checkId);

  //   const id = checkMaterialsAt.value?.id;
  //   console.log(checkMaterialsAt.value);
  //   const updateCheckMaterial = ref<CheckMaterial>({
  //     employeeId: checkMaterialsAt.value!.employeeId,
  //     checkItems: [], //checkMaterialsAt.value!.checkItems,
  //   });
  //   console.log(updateCheckMaterial.value.checkItems);
  //   checkMatDetails.value.forEach((element) => {
  //     updateCheckMaterial.value.checkItems!.push({
  //       materialId: element.materialId,
  //       quantity: element.quantity,
  //     });
  //   });
  //   console.log(updateCheckMaterial.value.checkItems);

  //   try {
  //     await checkMatService.updateCheckMaterials(
  //       id!,
  //       updateCheckMaterial.value!
  //     );
  //   } catch (e) {
  //     console.log(e);
  //     messageStore.showMessage("ไม่สามารถบันทึก check detail ได้");
  //   }

  //   await getCheckItemsAt(checkId);
  // };

  // function editCheckItem(checkItem: CheckMaterialDetail) {
  //   console.log(checkItem.material);
  //   loadingStore.isLoading = true;
  //   editedCheckItem.value = JSON.parse(JSON.stringify(checkItem));
  //   editedCheckItem.value.materialId = checkItem.material!.id;
  //   dialogD.value = true;
  //   loadingStore.isLoading = false;
  // }

  function clearDetail() {
    editedCheckItem.value = {
      quantity: 1,
    };
  }

  watch(dialogD, (newDialog, oldDialog) => {
    if (!newDialog) {
      clearDetail();
    }
  });

  function deleteCheck(id: number) {
    loadingStore.isLoading = true;
    editedCheckMaterial.value.id = id;
    messageStore.showConfirm("Do you want to delete this check?", "checkmat");
    loadingStore.isLoading = false;
  }

  async function confirmDelete() {
    try {
      await checkMatService.deleteCheckMaterial(editedCheckMaterial.value.id!);
      await getCheckMaterials();
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถลบ Check ได้");
    }
    loadingStore.isLoading = false;
  }

  return {
    checkMaterials,
    getCheckMaterials,
    checkMaterialsAt,
    getCheckItemsAt,
    saveCheckMaterial,
    dialog,
    editedCheckMaterial,
    clear,
    editCheckMaterial,
    checkMatDetails,
    // saveCheckItems,
    dialogD,
    editedCheckItem,
    clearDetail,
    // editCheckItem,
    deleteCheck,
    confirmDelete,
    setCheckMatd,
    nameCheckMaterial,
  };
});
