<script setup lang="ts">
import { useLoadingStore } from "@/stores/loading";

const loadingStore = useLoadingStore();
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="loadingStore.isLoading" persistent width="auto">
      <v-card>
        <v-card-text class="text-center">
          <div>Please wait...</div>
          <v-progress-circular
            :size="50"
            color="rgb(80, 50, 0)"
            indeterminate
          ></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
