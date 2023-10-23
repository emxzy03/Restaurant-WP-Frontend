<script setup lang="ts">
import TableCardList from "./TableCardList.vue";
import TableStatus from "./TableStatus.vue";
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12"><TableCardList /></v-col>
      <v-col><TableStatus /></v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
