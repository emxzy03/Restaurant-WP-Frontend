import { ref, watch } from "vue";
import { defineStore } from "pinia";
import type CheckInOut from "@/types/CheckInOut";
import checkinoutService from "@/services/check-in-out";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";

export const useCheckInOutStore = defineStore("checkinout", () => {
  const loadingStore = useLoadingStore();
  const checkinouts = ref<CheckInOut[]>([]);
  const messageStore = useMessageStore();
  const editedCheckInOut = ref<CheckInOut>({});

  async function saveCheckInOut() {
    console.log(editedCheckInOut.value.id);
    loadingStore.isLoading = true;
    try {
      if (editedCheckInOut.value.id) {
        await checkinoutService.updateCheckInOut(
          editedCheckInOut.value.id,
          editedCheckInOut.value
        );
      } else {
        console.log(editedCheckInOut.value.employeeId);
        if (editedCheckInOut.value.employeeId) {
          await checkinoutService.saveCheckInOut(editedCheckInOut.value);
        }
      }
      // console.log(editedCheckInOut.value);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถบันทึก CheckIn/Out ได้");
    }
    loadingStore.isLoading = false;
  }

  // function editCheckInOut(checkinout: CheckInOut) {
  //   loadingStore.isLoading = true;
  //   // editedCheckInOut.value = JSON.parse(JSON.stringify(checkinout));
  //   // dialog.value = true;
  //   loadingStore.isLoading = false;
  // }

  async function tsCheckout(empid: number) {
    loadingStore.isLoading = true;
    try {
      const res = await checkinoutService.getOneCheckInOut(empid);
      editedCheckInOut.value.id = res.data.id;
      editedCheckInOut.value.employee = res.data.employee;
      console.log(res);
      editedCheckInOut.value.datetimeOut = new Date();
      console.log(editedCheckInOut.value);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถ CheckOut ได้");
    }
    loadingStore.isLoading = false;
  }

  function clearCheckInOut() {
    editedCheckInOut.value = {};
  }
  async function getCheckInOuts() {
    loadingStore.isLoading = true;
    try {
      const res = await checkinoutService.getCheckInOuts();

      checkinouts.value = res.data;

      console.log(res);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง checkinout ได้");
    }
    loadingStore.isLoading = false;
  }

  return {
    checkinouts,
    editedCheckInOut,
    saveCheckInOut,
    // editCheckInOut,
    clearCheckInOut,
    tsCheckout,
    getCheckInOuts,
  };
});
