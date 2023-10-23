import { ref } from "vue";
import { defineStore } from "pinia";
import type Salary from "@/types/Salary";
import salaryService from "@/services/salary";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import type SalaryDetail from "@/types/SalaryDetail";
import type CheckInOut from "@/types/CheckInOut";

export const useSalaryStore = defineStore("salary", () => {
  const loadingStore = useLoadingStore();
  const salaries = ref<Salary[]>([]);
  const salariesAt = ref<Salary>();
  const salaryDetailsAt = ref<SalaryDetail>();
  const messageStore = useMessageStore();
  const selectDStart = ref();
  const selectMStart = ref();
  const selectYStart = ref();
  const selectDEnd = ref();
  const selectMEnd = ref();
  const selectYEnd = ref();
  const strDateStart = ref("");
  const strDateEnd = ref("");
  const salaryDList = ref<SalaryDetail[]>([]);
  const total = ref(0);
  const day: string[] = [];
  const month = [
    { valuem: "01", mnth: "มกราคม" },
    { valuem: "02", mnth: "กุมภาพันธ์" },
    { valuem: "03", mnth: "มีนาคม" },
    { valuem: "04", mnth: "เมษายน" },
    { valuem: "05", mnth: "พฤษภาคม" },
    { valuem: "06", mnth: "มิถุนายน" },
    { valuem: "07", mnth: "กรกฎาคม" },
    { valuem: "08", mnth: "สิงหาคม" },
    { valuem: "09", mnth: "กันยายน" },
    { valuem: "10", mnth: "ตุลาคม" },
    { valuem: "11", mnth: "พฤศจิกายน" },
    { valuem: "12", mnth: "ธันวาคม" },
  ];
  const editedSalary = ref<Salary>({
    date_start: "",
    date_end: "",
    date_salary: new Date(),
    salaryDetailLists: [],
    cionum: [],
  });
  const cionum = ref<number[]>([]);
  const cio = ref<CheckInOut[]>([]);
  // const month = [
  //   "01 มกราคม",
  //   "02 กุมภาพันธ์",
  //   "03 มีนาคม",
  //   "04 เมษายน ",
  //   "05 พฤษภาคม",
  //   "06 มิถุนายน",
  //   "07 กรกฎาคม",
  //   "08 สิงหาคม",
  //   "09 กันยายน",
  //   "10 ตุลาคม",
  //   "11 พฤศจิกายน",
  //   "12 ธันวาคม",
  // ];
  // const month = [
  //   "มกราคม",
  //   "กุมภาพันธ์",
  //   "มีนาคม",
  //   "เมษายน ",
  //   "พฤษภาคม",
  //   "มิถุนายน",
  //   "กรกฎาคม",
  //   "สิงหาคม",
  //   "กันยายน",
  //   "ตุลาคม",
  //   "พฤศจิกายน",
  //   "ธันวาคม",
  // ];

  // const monthNum = [
  //   "01",
  //   "02",
  //   "03",
  //   "04",
  //   "05",
  //   "06",
  //   "07",
  //   "08",
  //   "09",
  //   "10",
  //   "11",
  //   "12",
  // ];

  async function getSelectDate() {
    try {
      const res = await salaryService.getSalaryDate(
        strDateStart.value,
        strDateEnd.value
      );
      salaryDList.value = res.data;
      for (const sr of salaryDList.value) {
        total.value += sr.emp_total!;
      }
      console.log(res);
      const rescio = await salaryService.getSalaryCIO(
        strDateStart.value,
        strDateEnd.value
      );
      cio.value = rescio.data;
      cio.value.forEach((element) => {
        cionum.value.push(element.id!);
      });
      console.log(cio.value);
      console.log(cionum.value);
    } catch (e) {
      messageStore.showMessage("ไม่สามารถดึงข้อมูลที่ query ได้");
    }
  }
  const yearList = ref([]);
  const year: string[] = [];
  function days() {
    for (let i = 1; i <= 31; i++) {
      if (i < 10) {
        day.push("0" + i);
      } else {
        day.push("" + i);
      }
    }
    // console.log(day);
  }
  async function getYear() {
    try {
      const res = await salaryService.getSalaryYearMgmts();
      yearList.value = res.data;
      for (let i = 0; i < yearList.value.length; i++) {
        const t = JSON.stringify(yearList.value[i]);
        year.push(t.toString().substring(9, 13));
        // console.log(t.toString().substring(9, 13));
      }
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Year Salary ได้");
    }
  }
  async function getSalaryMgmts() {
    loadingStore.isLoading = true;
    try {
      const res = await salaryService.getSalaryMgmts();
      salaries.value = res.data;
      console.log(res);
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Salary ได้");
    }
    loadingStore.isLoading = false;
  }

  async function getSalaryMgmtsAt(id: number) {
    loadingStore.isLoading = true;
    try {
      const salary = await salaryService.getOneSalaryMgmt(id);
      salariesAt.value = salary.data;
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึง Salary Detail ได้");
    }
    loadingStore.isLoading = false;
  }
  async function saveSalary() {
    loadingStore.isLoading = true;
    try {
      editedSalary.value.date_start = strDateStart.value;
      editedSalary.value.date_end = strDateEnd.value;
      editedSalary.value.date_salary = new Date();
      // editedSalary.value.salaryDetailLists = salaryDList.value;
      console.log(salaryDList.value);
      salaryDList.value.forEach((element) => {
        editedSalary.value.salaryDetailLists!.push({
          emp_id: element.emp_id,
          emp_whours: element.emp_whours,
        });
      });
      cionum.value.forEach((element) => {
        editedSalary.value.cionum!.push(+element);
      });
      console.log(editedSalary);
      await salaryService.saveSalaryMgmt(editedSalary.value);
      await getSalaryMgmts();
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถบันทึก Salary ได้");
    }
    loadingStore.isLoading = false;
  }
  function deleteSalary(id: number) {
    loadingStore.isLoading = true;
    editedSalary.value.id = id;
    messageStore.showConfirm("Do you want to delete this salary?", "salary");
    loadingStore.isLoading = false;
  }

  async function confirmDelete() {
    try {
      await salaryService.deleteSalaryMgmt(editedSalary.value.id!);
      await getSalaryMgmts();
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถลบ Salary ได้");
    }
    loadingStore.isLoading = false;
  }

  return {
    salaries,
    getSalaryMgmts,
    salariesAt,
    getSalaryMgmtsAt,
    saveSalary,
    month,
    days,
    day,
    getYear,
    year,
    selectDStart,
    selectMStart,
    selectYStart,
    selectDEnd,
    selectMEnd,
    selectYEnd,
    getSelectDate,
    salaryDList,
    total,
    strDateStart,
    strDateEnd,
    confirmDelete,
    deleteSalary,
  };
});
