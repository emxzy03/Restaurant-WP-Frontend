<script setup lang="ts">
import { useMessageStore } from "@/stores/message";
import { mdiAlertCircleOutline } from "@mdi/js";
const messageStore = useMessageStore();
</script>

<template>
  <div class="text-center ma-2">
    <!-- <v-btn @click="snackbar = true"> Open Snackbar </v-btn> -->
    <v-snackbar
      v-model="messageStore.isShow"
      :timeout="messageStore.timeout"
      multi-line
    >
      <v-icon size="32" color="pink" :icon="mdiAlertCircleOutline"></v-icon>
      {{ " " + messageStore.message }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="messageStore.isShow = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
