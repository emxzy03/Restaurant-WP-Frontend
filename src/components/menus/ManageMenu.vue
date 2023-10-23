<script setup lang="ts">
import {
  mdiAccountMultiple,
  mdiSilverwareForkKnife,
  mdiTableCog,
  mdiStoreSettingsOutline,
  mdiFolderSettings,
  mdiCashMultiple,
  mdiChartBoxPlusOutline,
  mdiNewspaperCheck,
  mdiTrayFull,
  mdiLogin,
  mdiNoteCheck,
} from "@mdi/js";
import { useLoginStore } from "@/stores/login";
const loginStore = useLoginStore();
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
      <v-list-item
        :prepend-icon="mdiSilverwareForkKnife"
        title="Menu Management"
        value="menu-management"
        to="/menus"
        style="color: rgb(86, 46, 8)"
        @click="loginStore.showTitle('Menu Management')"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiFolderSettings"
        title="Category Management"
        value="category-management"
        to="/category"
        style="color: rgb(86, 46, 8)"
        @click="loginStore.showTitle('Category Management')"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiTableCog"
        title="Table Management"
        value="table-management"
        to="/table-management"
        style="color: rgb(86, 46, 8)"
        @click="loginStore.showTitle('Table Management')"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiNewspaperCheck"
        title="Receipt Management"
        value="receipt-canagement"
        to="/receipt"
        style="color: rgb(86, 46, 8)"
        @click="loginStore.showTitle('Receipt Management')"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiTrayFull"
        title="Menu Queues History"
        value="menu-queues-history"
        to="/menu-queue-history"
        style="color: rgb(86, 46, 8)"
        @click="loginStore.showTitle('Menu Queues History')"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiNoteCheck"
        title="Check Material Management"
        value="check-mat-management"
        to="/check-material"
        style="color: rgb(86, 46, 8)"
        @click="loginStore.showTitle('Check Material Management')"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiStoreSettingsOutline"
        title="Material Management"
        value="material-management"
        to="/materials"
        style="color: rgb(86, 46, 8)"
        @click="loginStore.showTitle('Material Management')"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiChartBoxPlusOutline"
        title="Bill Material Management"
        value="bill-mat-management"
        to="/bill-materials"
        style="color: rgb(86, 46, 8)"
        @click="loginStore.showTitle('Bill Material Management')"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiAccountMultiple"
        title="Employee Management"
        value="employee-management"
        to="/employee"
        style="color: rgb(86, 46, 8)"
        @click="loginStore.showTitle('Employee Management')"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiLogin"
        title="Check In/Out History"
        value="check-in-out-history"
        to="/check-in-out-history"
        style="color: rgb(86, 46, 8)"
        @click="loginStore.showTitle('Check In/Out History')"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiCashMultiple"
        title="Salary Management"
        value="salary-management"
        to="/salaries"
        style="color: rgb(86, 46, 8)"
        @click="loginStore.showTitle('Salary Management')"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
