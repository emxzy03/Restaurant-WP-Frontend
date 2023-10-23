import { ref, watch } from "vue";
import { defineStore } from "pinia";
import type Employee from "@/types/Employee";
import employeeService from "@/services/employee";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";

export const useEmployeeStore = defineStore("Employee", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const dialog = ref(false);
  const employees = ref<Employee[]>([]);
  const editedEmployee = ref<Employee>({
    username: "",
    password: "",
    name: "",
    // birthday: new Date(),
    address: "",
    tel: "",
    email: "",
    oth_contact: "",
    // start_date: new Date(),
    role: "",
    sal_rate: 0,
  });

  watch(dialog, (newDialog, oldDialog) => {
    console.log(newDialog);
    if (!newDialog) {
      editedEmployee.value = {
        username: "",
        password: "",
        name: "",
        birthday: new Date(),
        address: "",
        tel: "",
        email: "",
        oth_contact: "",
        start_date: new Date(),
        role: "",
        sal_rate: 0,
      };
    }
  });

  async function getEmployees() {
    loadingStore.isLoading = true;
    try {
      const res = await employeeService.getEmployees();
      employees.value = res.data;
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถดึงข้อมูล Employee ได้");
    }
    loadingStore.isLoading = false;
  }

  async function saveEmployee() {
    loadingStore.isLoading = true;
    try {
      if (editedEmployee.value.id) {
        await employeeService.updateEmployee(
          editedEmployee.value.id,
          editedEmployee.value
        );
      } else {
        await employeeService.saveEmployee(editedEmployee.value);
      }

      dialog.value = false;
      await getEmployees();
    } catch (e) {
      messageStore.showMessage("ไม่สามารถบันทึก Employee ได้");
      console.log(e);
    }
    loadingStore.isLoading = false;
  }

  function deleteEmployee(id: number) {
    loadingStore.isLoading = true;
    editedEmployee.value.id = id;
    messageStore.showConfirm("ต้องการลบพนักงาน หรือไม่", "employee");
    loadingStore.isLoading = false;
  }

  async function confirmDelete() {
    try {
      await employeeService.deleteEmployee(editedEmployee.value.id!);
      await getEmployees();
    } catch (e) {
      console.log(e);
      messageStore.showMessage("ไม่สามารถลบ Employee ได้");
    }
    loadingStore.isLoading = false;
  }
  function editEmployee(employee: Employee) {
    editedEmployee.value = JSON.parse(JSON.stringify(employee));
    dialog.value = true;
  }

  const login = (loginName: string, password: string): boolean => {
    const index = employees.value.findIndex(
      (item) => item.username === loginName
    );
    if (index >= 0) {
      const user = employees.value[index];
      if (user.password === password) {
        localStorage.setItem("userIDNow", user.id + "");
        localStorage.setItem("userRoleNow", user.role);
        console.log(localStorage.getItem("userIDNow"));
        console.log(localStorage.getItem("userRoleNow"));
        return true;
      }
      return false;
    }
    return false;
  };

  const getPass = (id: number): string => {
    const index = employees.value.findIndex((item) => item.id == id);
    console.log(index);
    if (index >= 0) {
      const user = employees.value[index];
      console.log(user.password);
      return user.password;
    }
    return "";
  };

  const getId = (loginName: string, password: string): number => {
    const index = employees.value.findIndex(
      (item) => item.username === loginName
    );
    if (index >= 0) {
      const user = employees.value[index];
      if (user.password === password) {
        return user.id!;
      }
      return -1;
    }
    return -1;
  };
  const nameEmployee = () => {
    const items = [];
    for (let i = 0; i < employees.value.length; i++) {
      items.push(employees.value[i].name);
    }
    for (let i = 0; i < employees.value.length; i++) {
      items.push(employees.value[i].username);
    }
    for (let i = 0; i < employees.value.length; i++) {
      items.push(employees.value[i].tel);
    }

    console.log(items);
    return items;
  };

  return {
    employees,
    getEmployees,
    dialog,
    editedEmployee,
    saveEmployee,
    editEmployee,
    deleteEmployee,
    login,
    getPass,
    getId,
    nameEmployee,
    confirmDelete,
  };
});
