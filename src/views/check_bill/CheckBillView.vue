<script setup lang="ts">
import BillList from "./BillList.vue";
import Receipt from "./Receipt.vue";
</script>

<template>
  <v-container>
    <!-- <div>Check Bill</div> -->
    <v-row>
      <!-- cashier-->
      <v-col cols="6"> <BillList /> </v-col>
      <!-- Receiept-->
      <v-col> <Receipt /> </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
