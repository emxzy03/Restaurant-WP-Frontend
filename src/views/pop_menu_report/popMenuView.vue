<script lang="ts" setup>
import { usePopMenuStore } from "@/stores/pop-menu";
import { useVarCompnStore } from "@/stores/var-compn";
import { onMounted } from "vue";
const varcpStore = useVarCompnStore();
const popMenuStore = usePopMenuStore();
const backendUrl = import.meta.env.VITE_BACKEND_URL;
onMounted(async () => {
  await popMenuStore.getPopMenuByCategory(popMenuStore.categoryNew);
  await popMenuStore.getPopMenu();
});
</script>
<template>
  <!-- {{ popMenuStore.categoryNew }} -->
  <v-tabs v-model="popMenuStore.categoryNew" bg-color="rgb(80, 50, 0)">
    <v-tab
      v-for="item of popMenuStore.category"
      :value="item.id"
      :key="item.id"
    >
      {{ item.name }}</v-tab
    >
  </v-tabs>
  <v-table
    :style="varcpStore.styleTable"
    fixed-header
    height="50vh"
    style="background-color: white"
    @click="popMenuStore.dialog = true"
    ><thead>
      <tr class="text-center">
        <td class="HText">NAME</td>
        <td class="HText">AMOUNT</td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item of popMenuStore.popMenus"
        :key="item.pop_menu"
        class="text-center"
      >
        <td>
          <v-img
            :src="`${backendUrl}/menus/image/${item.image}`"
            height="100px"
            style="margin-top: 1em"
          >
          </v-img
          >{{ item.name }}
        </td>
        <td class="HText">{{ item.pop_menu }}</td>
      </tr>
    </tbody></v-table
  >
</template>
<style>
.HText {
  font-weight: 800;
  /* font-size: 100pt; */
}
</style>
