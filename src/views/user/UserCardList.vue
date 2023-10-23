<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import type User from "@/types/User";
// import { mdiPencil, mdiDelete, mdiPlus } from "@mdi/js";
// import {} from "../../stores/user";

const userStore = useUserStore();
const deleteUser = (index: number): void => {
  userStore.deleteUserAsk(index);
};

const addNewUser = () => {
  userStore.dialog = true;
};

const editUser = (user: User) => {
  userStore.editUser(user);
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-actions>
            <v-btn
              height="150px"
              width="100%"
              class="text-h3"
              @click="addNewUser"
            >
              +
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" v-for="item of userStore.users" :key="item.id">
        <v-card height="150px">
          <v-card-title> {{ item.login }} ({{ item.id }}) </v-card-title>
          <v-card-text>{{ item.name }} [{{ item.password }}]</v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="error" @click="deleteUser"> Delete </v-btn>
            <v-btn color="secondary" @click="editUser(item)"> Edit </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- <div class="text-h2">User List</div> -->
</template>

<style scoped></style>
