<script setup lang="ts">
import { useSalaryStore } from "@/stores/salary";
import { onMounted, ref } from "vue";
import { useVarCompnStore } from "@/stores/var-compn";

const salaryStore = useSalaryStore();
const varcpStore = useVarCompnStore();

onMounted(async () => {
  await salaryStore.getSalaryMgmts();
});

const dialog = ref(false);
const salaryID = ref(0);
let onOk: (value: unknown) => void;
let onCancel: (reason?: any) => void;

const openDialog = async (salaeyIDAt: number) => {
  salaryID.value = salaeyIDAt;
  await salaryStore.getSalaryMgmtsAt(salaeyIDAt);
  dialog.value = true;
  return new Promise((resolve, reject) => {
    onOk = resolve;
    onCancel = reject;
  });
};
defineExpose({ openDialog });
function cancelFunc() {
  dialog.value = false;
  onCancel("Cancel");
}
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card
        style="
          color: rgb(86, 46, 8);
          background-color: rgb(243, 242, 223);
          font-family: Andale Mono, monospace;
        "
      >
        <v-card-title style="font-weight: bold; font-size: 4vh">
          Salary Detail #{{ salaryID }}
        </v-card-title>
        <v-card-text>
          <v-container style="background-color: rgb(80, 50, 0)">
            <v-row>
              <v-col>
                <v-table
                  :style="varcpStore.styleTable"
                  fixed-header
                  height="45vh"
                >
                  <thead>
                    <tr>
                      <th :style="varcpStore.styleTableTh">ID</th>
                      <th :style="varcpStore.styleTableTh">Employee Name</th>
                      <th :style="varcpStore.styleTableTh">Working Hours</th>
                      <th :style="varcpStore.styleTableTh">
                        Employee Salary Rate
                      </th>
                      <th :style="varcpStore.styleTableTh">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item of salaryStore.salariesAt?.salaryDetailLists"
                      :key="item.id"
                    >
                      <td>{{ item.id }}</td>
                      <td>{{ item.emp_name }}</td>
                      <td>
                        {{ item.emp_whours }}
                      </td>
                      <td>{{ item.emp_rate }}</td>
                      <td>{{ item.emp_total }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="cancelFunc()"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<style scoped>
.button-3d {
  position: relative;
  width: auto;
  /* display: inline-block; */
  /* color: #c4c4c4; */
  text-decoration: none;
  border-radius: 3em;
  border: solid 1px none;
  background: rgb(80, 50, 0);
  text-align: center;
  padding: 9px 18px 10px;
  /* margin: 12px; */

  -webkit-transition: all 0.1s;
  -moz-transition: all 0.1s;
  transition: all 0.1s;

  -webkit-box-shadow: 0px 6px 0px #2b2b2b;
  -moz-box-shadow: 0px 6px 0px #6f6f6f;
  box-shadow: 0px 6px 0px #000;
}

.button-3d:active {
  -webkit-box-shadow: 0px 6px 0px #56430a;
  -moz-box-shadow: 0px 6px 0px #ab954e;
  box-shadow: 0px 6px 0px rgb(88, 63, 19);
  position: relative;
  top: 4px;
}
.styleth {
  font-size: 2.7vh;
  background-color: rgb(233, 232, 213);
}
</style>
