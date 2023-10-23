import { useMessageStore } from "./message";
// import { useUserStore } from "./user";
import { ref, computed } from "vue";
import { defineStore } from "pinia";
// import { useEmployeeStore } from "./employee";
import auth from "@/services/auth";
import { useLoadingStore } from "./loading";
import router from "@/router";

export const useLoginStore = defineStore("login", () => {
  const openManage = ref(false);
  const openMain = ref(true);
  const loginName = ref("");
  const pageTitle = ref();
  const userIdNow = ref();
  const userRoleNow = ref("");
  const isLogin = computed(() => {
    return loginName.value !== "";
  });

  // const userStore = useUserStore();
  // const empStore = useEmployeeStore();
  const messageStore = useMessageStore();
  const loadingStore = useLoadingStore();
  // const isAuth = computed(() => {
  //   const employee = localStorage.getItem("employee");
  //   if (employee) {
  //     return true;
  //   }
  //   return false;
  // });
  const login = async (username: string, password: string): Promise<void> => {
    loadingStore.isLoading = true;
    try {
      console.log({ username, password });
      const res = await auth.login(username, password);
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.access_token);
      loginName.value = username;
      localStorage.setItem("loginName", username);
      const employee = JSON.parse(localStorage.getItem("user")!);
      localStorage.setItem("userIDNow", employee.id);
      localStorage.setItem("userRoleNow", employee.role);
      console.log(localStorage.getItem("userIDNow"));
      console.log(localStorage.getItem("userRoleNow"));
      console.log("success");
      router.push("/");
    } catch (err) {
      console.log(err);
      messageStore.showMessage("username หรือ password ไม่ถูกต้อง");
    }
    loadingStore.isLoading = false;
  };
  const logout = (): void => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    loginName.value = "";
    localStorage.removeItem("loginName");
    localStorage.removeItem("userIDNow");
    localStorage.removeItem("userRoleNow");
    router.replace("/login");
  };

  const loadData = () => {
    loginName.value = localStorage.getItem("loginName") || "";
    pageTitle.value = localStorage.getItem("pageTitle") || "";
    userIdNow.value = localStorage.getItem("userIDNow") || "";
    userRoleNow.value = localStorage.getItem("userRoleNow") || "";
  };

  const showTitle = (titlei: string) => {
    localStorage.setItem("pageTitle", titlei);
    pageTitle.value = localStorage.getItem("pageTitle");
  };

  return {
    loginName,
    isLogin,
    login,
    logout,
    loadData,
    showTitle,
    pageTitle,
    openManage,
    openMain,
    userIdNow,
    userRoleNow,
  };
});
