<script setup lang="ts">
import CartList from "./CartList.vue";
import OrderList from "./OrderList.vue";
import PosView from "./PosView.vue";
import { useSellStore } from "@/stores/sell";
const sellStore = useSellStore();
</script>

<template>
  <CartList
    v-if="sellStore.isPos == false && sellStore.isOrder == false"
  ></CartList>
  <OrderList
    v-else-if="sellStore.isOrder == true && sellStore.isPos == false"
  ></OrderList>
  <PosView
    v-else-if="sellStore.isPos == true && sellStore.isOrder == false"
  ></PosView>
</template>

<style scoped></style>
