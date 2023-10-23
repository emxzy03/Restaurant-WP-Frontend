<script setup lang="ts">
import { useCheckInOutStore } from "@/stores/check-in-outs";
import { computed, onMounted } from "vue";
import { useVarCompnStore } from "@/stores/var-compn";

const checkinoutStore = useCheckInOutStore();
onMounted(async () => {
  await checkinoutStore.getCheckInOuts();
});
const varcpStore = useVarCompnStore();
const orderList = computed(() => {
  return [...checkinoutStore.checkinouts].sort((n1, n2) => n2.id! - n1.id!);
});
</script>

<template>
  <!-- <div>CheckInOut</div>
  <div>{{ CheckInOutStore.checkinouts }}</div> -->
  <v-container>
    <v-row>
      <v-col>
        <v-container style="background-color: rgb(80, 50, 0)">
          <v-table :style="varcpStore.styleTable" fixed-header height="70vh">
            <thead>
              <tr>
                <th :style="varcpStore.styleTableTh">ID</th>
                <th :style="varcpStore.styleTableTh">DateTime In</th>
                <th :style="varcpStore.styleTableTh">DateTime Out</th>
                <th :style="varcpStore.styleTableTh">Total Hours</th>
                <th :style="varcpStore.styleTableTh">Employee ID</th>
                <th :style="varcpStore.styleTableTh">SalaryDetail ID</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item of orderList" :key="item.id">
                <td style="font-size: 2.2vh">
                  {{ item.id }}
                </td>
                <td style="font-size: 2.2vh">
                  {{ item.datetimeIn?.toString().substring(0, 10) }} |
                  {{
                    item.datetimeIn
                      ?.toString()
                      .substring(11, item.datetimeIn?.toString().length - 5)
                  }}
                </td>
                <td style="font-size: 2.2vh" v-if="item.datetimeOut">
                  {{ item.datetimeOut?.toString().substring(0, 10) }} |
                  {{
                    item.datetimeOut
                      ?.toString()
                      .substring(11, item.datetimeOut?.toString().length - 5)
                  }}
                </td>
                <td style="font-size: 2.2vh" v-else>-</td>
                <td style="font-size: 2.2vh">
                  {{ item.total_hour }}
                </td>
                <td style="font-size: 2.2vh">
                  {{ item.employee!.id }}
                </td>
                <td style="font-size: 2.2vh">
                  {{ item.salaryDetail?.id || "-" }}
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
