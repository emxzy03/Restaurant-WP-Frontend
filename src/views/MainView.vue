<script setup lang="ts">
// import { ref } from "vue";
import {
  // mdiWeatherSunny,
  // mdiWeatherNight,
  // mdiFolder,
  // mdiAccountMultiple,
  // mdiStar,
  mdiLogout,
  // mdiAccount,
  mdiTableAccount,
  mdiCartVariant,
  mdiChefHat,
  mdiCartCheck,
  mdiCurrencyUsd,
  mdiHome,
  mdiCogs,
  mdiViewDashboard,
} from "@mdi/js";
import ManageView from "@/views/ManageView.vue";
import { useLoginStore } from "@/stores/login";
import { onMounted } from "vue";
import router from "@/router";
const loginStore = useLoginStore();

// const theme = ref("light");

// function onClick() {
//   theme.value = theme.value === "light" ? "myCustomLightTheme" : "light";
// }

// const emit = defineEmits<{
//   (e: "logout"): void;
// }>();

const logout = () => {
  loginStore.logout();
};

// const prop = defineProps<{ loginName: string }>();
// let pageTitle = ref();
// function showTitle(titlei: string) {
//   localStorage.setItem("pageTitle", titlei);
//   pageTitle.value = localStorage.getItem("pageTitle");
// }

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
  <!-- <v-app :theme="theme"> -->
  <v-app
    :style="{ background: 'rgb(243, 245, 225)' }"
    v-if="loginStore.openMain"
  >
    <!-- rgb(254, 242, 208) -->
    <v-app-bar color="rgb(72, 101, 22)">
      <!-- #558B2F rgb(42, 70, 5) rgb(48, 78, 9) rgb(72, 110, 22)"-->
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

      <!-- <v-btn
        :prepend-icon="theme === 'light' ? mdiWeatherSunny : mdiWeatherNight"
        @click="onClick"
        color="rgb(254, 242, 208)"
        >Toggle Theme</v-btn
      > -->
      <v-btn
        :prepend-icon="mdiLogout"
        @click="logout"
        color="rgb(243, 245, 225)"
        >Log Out</v-btn
      >
    </v-app-bar>

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
          to="/"
          style="color: rgb(86, 46, 8)"
          @click="open()"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
  <ManageView v-if="loginStore.openManage"></ManageView>
</template>
