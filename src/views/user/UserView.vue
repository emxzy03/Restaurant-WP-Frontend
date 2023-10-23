<script setup lang="ts">
import UserList from "./UserList.vue";
import UserDialog from "./UserDialog.vue";
import UserCardList from "./UserCardList.vue";
import { useUserStore } from "@/stores/user";
import { mdiTable, mdiCardOutline } from "@mdi/js";
import ConfirmDialog from "./ConfirmDelDialog.vue";

const userStore = useUserStore();
</script>

<template>
  <v-container>
    <v-row>
      <UserList v-if="userStore.isTable"></UserList>
      <UserCardList v-if="!userStore.isTable"></UserCardList>
      <UserDialog></UserDialog>
      <ConfirmDialog></ConfirmDialog>
    </v-row>
    <v-row class="justify-center">
      <v-btn :icon="mdiTable" flat @click="userStore.isTable = true"></v-btn>
      <v-btn
        :icon="mdiCardOutline"
        flat
        @click="userStore.isTable = false"
      ></v-btn>
    </v-row>
  </v-container>
  <!-- <div class="text-h1">User View</div> -->
</template>

<style scoped></style>
