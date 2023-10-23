<script setup lang="ts">
import { useMenuQueueStore } from "@/stores/menu-queues";
import { onMounted } from "vue";
import { useVarCompnStore } from "@/stores/var-compn";

const menuQueueStore = useMenuQueueStore();
onMounted(async () => {
  await menuQueueStore.getMenuQueues();
});
const varcpStore = useVarCompnStore();
</script>

<template>
  <!-- <div>MenuQueue</div>
  <div>{{ MenuQueueStore.menuQueues }}</div> -->
  <v-container>
    <v-row>
      <v-col>
        <v-container style="background-color: rgb(80, 50, 0)">
          <v-table :style="varcpStore.styleTable" fixed-header height="70vh">
            <thead>
              <tr>
                <th :style="varcpStore.styleTableTh">ID</th>
                <th :style="varcpStore.styleTableTh">Name</th>
                <th :style="varcpStore.styleTableTh">Note</th>
                <th :style="varcpStore.styleTableTh">Status</th>
                <th :style="varcpStore.styleTableTh">Menu ID</th>
                <th :style="varcpStore.styleTableTh">Receipt ID</th>
                <th :style="varcpStore.styleTableTh">Chef ID</th>
                <th :style="varcpStore.styleTableTh">Waitress ID</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item of menuQueueStore.menuQueues" :key="item.id">
                <td style="font-size: 2.2vh">
                  {{ item.id }}
                </td>
                <td style="font-size: 2.2vh">
                  {{ item.name }}
                </td>
                <td style="font-size: 2.2vh">
                  {{ item.note }}
                </td>
                <td style="font-size: 2.2vh">
                  {{ item.status }}
                </td>
                <td style="font-size: 2.2vh">
                  {{ item.menu!.id }}
                </td>
                <td style="font-size: 2.2vh">
                  {{ item.receipt!.id }}
                </td>
                <td style="font-size: 2.2vh">
                  {{ item.chef?.id || "-" }}
                </td>
                <td style="font-size: 2.2vh">
                  {{ item.waitress?.id || "-" }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
