import { nextTick, ref } from "vue";
import { defineStore } from "pinia";
import { useMessageStore } from "./message";
import Income from "@/services/income";
import { useLoadingStore } from "./loading";

export const useIncomeStore = defineStore("incom", () => {
  const messageStore = useMessageStore();
  const loadingStore = useLoadingStore();
  const renderComponent = ref(true);
  const dialog = ref(false);
  function forceRerender() {
    renderComponent.value = false;

    nextTick(async () => {
      await updateRange();
      renderComponent.value = true;
    });
  }
  const month = ref({
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "July",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  });
  const listOfMonth = ref([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);

  async function getIncomes() {
    const list = ref([]);
    try {
      const res = await Income.getIncomesBy(
        rangeMonth.value[0] + 1,
        rangeMonth.value[1] + 1,
        year.value
      );
      list.value = res.data;
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึงข้อมูลได้");
    }
    listIncome.value = list.value;
  }
  const rangeMonth = ref([0, 11]);
  function selectRange() {
    const list = ref<string[]>([]);
    if (year.value == "All Time") {
      const end = new Date().getFullYear();
      for (let i = 2020; i <= end; i++) {
        list.value.push(i + "");
      }
      return list.value;
    }
    if (rangeMonth.value[0] != rangeMonth.value[1]) {
      for (let i = rangeMonth.value[0]; i <= rangeMonth.value[1]; i++) {
        list.value.push(listOfMonth.value[i]);
      }
    } else {
      for (let i = 1; i <= 31; i++) {
        list.value.push(i + "");
        if (rangeMonth.value[0] == 1 && i == 28) {
          const numYear = parseInt(year.value);
          if (numYear % 400 == 0 || (numYear % 4 == 0 && numYear % 100 != 0)) {
            list.value.push("29");
          }
          break;
        }
        if (
          (rangeMonth.value[0] == 3 ||
            rangeMonth.value[0] == 5 ||
            rangeMonth.value[0] == 8 ||
            rangeMonth.value[0] == 10) &&
          i == 30
        ) {
          break;
        }
      }
    }
    return list.value;
  }
  const updateRange = async () => {
    loadingStore.isLoading = true;
    listRangeBy.value = selectRange();
    await getIncomes();
    await getIncomes();
    if (year.value != "All Time") {
      disabled.value = false;
    } else {
      disabled.value = true;
    }
    loadingStore.isLoading = false;
  };
  const year = ref("All Time");
  const listIncome = ref([]);
  getIncomes();

  const listRangeBy = ref(selectRange());
  const disabled = ref(true);

  return {
    getIncomes,
    listIncome,
    rangeMonth,
    month,
    listRangeBy,
    selectRange,
    updateRange,
    renderComponent,
    year,
    forceRerender,
    disabled,
    dialog,
  };
});
