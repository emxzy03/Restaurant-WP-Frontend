<script setup lang="ts">
// import { RouterLink, RouterView } from "vue-router";
// import HelloWorld from "./components/HelloWorld.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import FullLayout from "@/layouts/FullLayout.vue";
// import MainView from "./views/MainView.vue";
// import LoginView from "./views/LoginView.vue";
import { onMounted } from "vue"; // ref, computed,
import { useLoginStore } from "@/stores/login";
import MessageBox from "./components/MessageBox.vue";
import LoadingDialog from "./components/LoadingDialog.vue";
import ConfirmDialog from "./components/ConfirmDialog.vue";

const loginStore = useLoginStore();

// const loginName = ref("");
// const isLogin = computed(() => {
//   return loginName.value !== "";
// });
// const login = (userName: string): void => {
//   loginName.value = userName;
//   localStorage.setItem("loginName", userName);
// };
// const logout = (): void => {
//   loginName.value = "";
//   localStorage.removeItem("loginName");
// };

// const loadData = () => {
//   loginName.value = localStorage.getItem("loginName") || "";
// };

onMounted(() => {
  console.log("On Mounted");
  loginStore.loadData();
});
</script>

<template>
  <!-- <v-btn color="success" @click="loadData">Load from Local Storage</v-btn> -->
  <component
    :is="$route.meta.layout == 'MainLayout' ? MainLayout : FullLayout"
  ></component>
  <!-- {{ $route.meta }} -->
  <!-- 
  <MainView
    v-if="loginStore.isLogin"
    @logout="loginStore.logout"
    :login-name="loginStore.loginName"
  />
  <LoginView v-if="!loginStore.isLogin" /> -->
  <MessageBox></MessageBox>
  <!-- @login="loginStore.login"  -->
  <LoadingDialog></LoadingDialog>
  <ConfirmDialog></ConfirmDialog>
</template>

<style scoped></style>
