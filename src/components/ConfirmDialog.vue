<script setup lang="ts">
import { useMessageStore } from "@/stores/message";

const messageStore = useMessageStore();
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="messageStore.isConfirm" persistent width="auto">
      <v-card
        style="
          color: rgb(86, 46, 8);
          background-color: rgb(243, 242, 223);
          font-family: Andale Mono, monospace;
        "
      >
        <v-card-text>{{ messageStore.message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="messageStore.cancel()">
            Cancel
          </v-btn>
          <v-btn
            color="rgb(173, 84, 54)"
            variant="text"
            @click="messageStore.confirm()"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
