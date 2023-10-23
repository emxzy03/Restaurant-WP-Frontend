<script setup lang="ts">
import {
  mdiTableAccount,
  mdiChefHat,
  mdiCartCheck,
  mdiCurrencyUsd,
  mdiHome,
  mdiCogs,
  mdiViewDashboard,
} from "@mdi/js";
import { useLoginStore } from "@/stores/login";
import { onMounted } from "vue";
const loginStore = useLoginStore();

onMounted(async () => {
  // await loginStore.showTitle("");
  // await router.push("/");
  await loginStore.loadData();
});

const open = () => {
  loginStore.openManage = true;
  loginStore.showTitle("Management");
  loginStore.openMain = false;
};
</script>
<template>
  <v-navigation-drawer
    expand-on-hover
    rail
    permanent
    :style="{ background: 'rgb(243, 245, 225)' }"
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://e7.pngegg.com/pngimages/532/328/png-clipart-brown-and-white-owl-graphics-with-blue-background-owl-halloween-cuteness-brown-owl-child-brown.png"
        :title="loginStore.loginName"
        :subtitle="loginStore.userRoleNow"
        style="color: rgb(86, 46, 8)"
      ></v-list-item
      ><!-- 'prop.loginName' -->
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <!-- <v-list-item
          :prepend-icon="mdiAccount"
          title="Users"
          value="users"
          to="/user"
          style="color: rgb(86, 46, 8)"
          @click="loginStore.showTitle('Users')"
        ></v-list-item> -->
      <v-list-item
        :prepend-icon="mdiHome"
        title="Home"
        value="home"
        to="/"
        style="color: rgb(86, 46, 8)"
        @click="loginStore.showTitle('')"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiViewDashboard"
        title="Dashboard"
        value="dashboard"
        to="/dashboard"
        style="color: rgb(86, 46, 8)"
        @click="loginStore.showTitle('Dashboard')"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiTableAccount"
        title="Tables"
        value="tables"
        to="/table"
        style="color: rgb(86, 46, 8)"
        @click="loginStore.showTitle('Tables')"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiChefHat"
        title="Chef"
        value="chef"
        to="/chef"
        style="color: rgb(86, 46, 8)"
        @click="loginStore.showTitle('Chef')"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiCartCheck"
        title="Serve"
        value="serve"
        to="/serve"
        style="color: rgb(86, 46, 8)"
        @click="loginStore.showTitle('Serve')"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiCurrencyUsd"
        title="Check Bill"
        value="check-bill"
        to="/check-bill"
        style="color: rgb(86, 46, 8)"
        @click="loginStore.showTitle('Check Bill')"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiCogs"
        title="Management"
        value="management"
        to="/manage"
        style="color: rgb(86, 46, 8)"
        @click="open()"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
