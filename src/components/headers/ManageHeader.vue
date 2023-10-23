<script setup lang="ts">
import { mdiLogout, mdiArrowLeftBoldCircle, mdiLogin } from "@mdi/js";
import { useLoginStore } from "@/stores/login";
import router from "@/router";
const loginStore = useLoginStore();

const logout = () => {
  loginStore.logout();
};

const loginN = () => {
  router.replace("/login");
};

const back = () => {
  loginStore.openManage = false;
  loginStore.showTitle("");
  loginStore.openMain = true;
};
</script>
<template>
  <v-app-bar color="rgb(72, 101, 22)">
    <v-btn
      :icon="mdiArrowLeftBoldCircle"
      color="rgb(243, 245, 225)"
      flat
      to="/"
      @click="back()"
    >
    </v-btn>
    <v-app-bar-title
      :style="{ color: 'rgb(243, 245, 225)' }"
      style="
        font-family: Andale Mono, monospace;
        font-weight: bold;
        font-size: 4vh;
      "
      >{{ loginStore.pageTitle }}</v-app-bar-title
    >

    <v-spacer></v-spacer>

    <!-- <v-btn :prepend-icon="mdiLogout" @click="logout" color="rgb(243, 245, 225)"
      >Log Out</v-btn
    > -->
    <v-btn
      v-if="loginStore.isLogin"
      :prepend-icon="mdiLogout"
      @click="logout"
      color="rgb(243, 245, 225)"
      >Log Out</v-btn
    >
    <v-btn
      v-if="!loginStore.isLogin"
      :prepend-icon="mdiLogin"
      @click="loginN"
      color="rgb(243, 245, 225)"
      >Log In</v-btn
    >
  </v-app-bar>
</template>
