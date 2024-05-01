<script setup lang="ts">
import { useMenuQueueStore } from "@/stores/menu-queues";
import { onMounted } from "vue";
import { useVarCompnStore } from "@/stores/var-compn";

const menuQueueStore = useMenuQueueStore();
onMounted(async () => {
  await menuQueueStore.getMenuQueuesHistory();
  // await menuQueueStore.getMenuQueues();
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
            <!-- <v-table :style="{ width: 'fit-content' }" fixed-header height="70vh"> -->
            <thead>
              <tr>
                <th :style="varcpStore.styleTableTh">ID</th>
                <th :style="varcpStore.styleTableTh">Name</th>
                <th :style="varcpStore.styleTableTh">Note</th>
                <th :style="varcpStore.styleTableTh">Quantity</th>
                <th :style="varcpStore.styleTableTh">Status</th>
                <th :style="varcpStore.styleTableTh">Menu ID</th>
                <th :style="varcpStore.styleTableTh">Receipt ID</th>
                <th :style="varcpStore.styleTableTh">Chef ID</th>
                <th :style="varcpStore.styleTableTh">Waitress ID</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item of menuQueueStore.menuQueuesHistory"
                :key="item.id"
              >
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.note ? item.note : "-" }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.menuId }}</td>
                <td>{{ item.receipt?.id }}</td>
                <td>{{ item.chef ? item.chef.id : "-" }}</td>
                <td>{{ item.waitress ? item.waitress.id : "-" }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
