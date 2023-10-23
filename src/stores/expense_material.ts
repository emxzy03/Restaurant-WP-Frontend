import { nextTick, ref } from "vue";
import { defineStore } from "pinia";
import { useMessageStore } from "./message";
import ExpenseMService from "@/services/expense-material";
import { useLoadingStore } from "./loading";

export const useExpenseMaterialsStore = defineStore("expense_materials", () => {
  const messageStore = useMessageStore();
  const loadingStore = useLoadingStore();
  const renderComponent = ref(true);
  const disabled = ref(true);
  const dialog = ref(true);
  function forceRerender() {
    // Removing my-component from the DOM
    renderComponent.value = false;

    nextTick(async () => {
      // Adding the component back in
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

  async function getExpenseM() {
    const list = ref([]);
    try {
      const res = await ExpenseMService.getExpenseMaterialsBy(
        rangeMonth.value[0] + 1,
        rangeMonth.value[1] + 1,
        year.value
      );
      list.value = res.data;
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึงข้อมูลได้");
    }
    listExpenseMaterials.value = list.value;
  }

  const yearList = ref([]);
  const yearUnique: string[] = ["All Time"];
  const years = ref();

  async function getYear() {
    loadingStore.isLoading = true;
    try {
      const res = await ExpenseMService.getMaterialYear();
      yearList.value = res.data;
      for (let i = 0; i < yearList.value.length; i++) {
        const t = JSON.stringify(yearList.value[i]);
        yearUnique.push(t.toString().substring(9, 13));
        years.value = [...new Set(yearUnique)];
      }
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Year ได้");
    }
    loadingStore.isLoading = false;
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
        //add day
        list.value.push(i + "");
        //check feb month
        if (rangeMonth.value[0] == 1 && i == 28) {
          const numYear = parseInt(year.value);
          if (numYear % 400 == 0 || (numYear % 4 == 0 && numYear % 100 != 0)) {
            //add day 29 in feb
            list.value.push("29");
          }
          break;
        }
        //check month have 30 days
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
    await getExpenseM();
    await getExpenseM();
    if (year.value != "All Time") {
      disabled.value = false;
    } else {
      disabled.value = true;
    }
    loadingStore.isLoading = false;
  };

  const year = ref("All Time");
  const listExpenseMaterials = ref([]);
  getExpenseM();
  getYear();
  const listRangeBy = ref(selectRange());

  return {
    listExpenseMaterials,
    rangeMonth,
    month,
    listRangeBy,
    selectRange,
    updateRange,
    renderComponent,
    getExpenseM,
    year,
    forceRerender,
    getYear,
    years,
    disabled,
    dialog,
  };
});
