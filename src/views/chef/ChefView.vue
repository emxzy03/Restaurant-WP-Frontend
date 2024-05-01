<script setup lang="ts">
import MenuList from "./MenuList.vue";
import BeverageList from "./BeverageList.vue";
import { mdiFoodTurkey, mdiGlassCocktail } from "@mdi/js";
import { useMenuStore } from "@/stores/menu";
import { useMenuQueueStore } from "@/stores/menu-queues";
import { useLoginStore } from "@/stores/login";
import { onMounted } from "vue";
const menuStore = useMenuStore();
const menuQueueStore = useMenuQueueStore();
const loginStore = useLoginStore();

onMounted(async () => {
  await menuQueueStore.getMenuQueues();
  await menuQueueStore.getMenuQueuesDrink();
  await loginStore.loadData(); //must move login to employee
  if (loginStore.userRoleNow == "manager") {
    menuStore.isBeverage = true;
  } else {
    menuStore.isBeverage = false;
  }
});
const isBeverage = () => {
  menuStore.isBeverage = true;
  getMenuQueues();
};

const noBeverage = () => {
  menuStore.isBeverage = false;
  getMenuQueues();
};

const getMenuQueues = async () => {
  await menuQueueStore.getMenuQueues();
  await menuQueueStore.getMenuQueuesDrink();
  await loginStore.loadData();
};
</script>

<template>
  <v-container>
    <v-row class="justify-center">
      <!-- <v-btn
        :icon="mdiFoodTurkey"
        size="x-large"
        class="vBtnCard button-3d"
        flat
        style="color: rgb(243, 245, 225)"
        @click="noBeverage()"
        :style="{
          backgroundColor: !menuStore.isBeverage
            ? 'rgb(72, 101, 22) !important'
            : '',
        }"
      ></v-btn>
      <v-divider class="mx-6" vertical></v-divider>
      <v-btn
        :icon="mdiGlassCocktail"
        size="x-large"
        class="vBtnCard button-3d"
        flat
        style="color: rgb(243, 245, 225)"
        @click="isBeverage()"
        :style="{
          backgroundColor: menuStore.isBeverage
            ? 'rgb(72, 101, 22) !important'
            : '',
        }"
      ></v-btn> -->
      <!--background-color: rgb(80, 50, 0);  style="background-color: rgb(243, 245, 225); color: rgb(156, 73, 45)" -->
    </v-row>
    <!-- <v-row>
      <v-divider></v-divider>
    </v-row> -->
    <v-row>
      <!-- <MenuList v-if="!menuStore.isBeverage" />
      <BeverageList v-else /> -->
      <BeverageList />
    </v-row>
  </v-container>
</template>

<style scoped>
.button-3d {
  position: relative;
  width: auto;
  /* display: inline-block; */
  /* color: #c4c4c4; */
  text-decoration: none;
  border-radius: 18em;
  border: solid 1px none;
  background: rgb(80, 50, 0);
  text-align: center;
  padding: 9px 18px 10px;
  /* margin: 12px; */

  -webkit-transition: all 0.1s;
  -moz-transition: all 0.1s;
  transition: all 0.1s;

  -webkit-box-shadow: 0px 6px 0px #2b2b2b;
  -moz-box-shadow: 0px 6px 0px #6f6f6f;
  box-shadow: 0px 6px 0px #000;
}

.button-3d:active {
  -webkit-box-shadow: 0px 6px 0px #56430a;
  -moz-box-shadow: 0px 6px 0px #ab954e;
  box-shadow: 0px 6px 0px rgb(88, 63, 19);
  position: relative;
  top: 4px;
}
</style>
