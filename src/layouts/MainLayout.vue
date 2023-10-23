<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <v-app :style="{ background: 'rgb(243, 245, 225)' }">
    <RouterView name="header"></RouterView>
    <RouterView name="menu"></RouterView>
    <v-main>
      <v-container>
        <RouterView></RouterView>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
