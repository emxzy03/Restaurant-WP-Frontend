<script setup lang="ts">
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

const deleteUser = () => {
  userStore.deleteUser(userStore.del);
  userStore.dialogC = false;
};
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="userStore.dialogC" persistent>
      <!-- <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
      </template> -->
      <v-card>
        <v-card-title class="text-h5"> Delete this user ? </v-card-title>
        <v-card-text
          >if do it, this user will be removed and cannot be
          restored!</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="userStore.dialogC = false">
            Cancel
          </v-btn>
          <v-btn color="warning" variant="text" @click="deleteUser">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
