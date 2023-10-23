<script setup lang="ts">
import { useLoginStore } from "@/stores/login";
import { useMenuQueueStore } from "@/stores/menu-queues";
import { useTableMgmtStore } from "@/stores/table-mgmt";
import { useVarCompnStore } from "@/stores/var-compn";
import type MenuQueue from "@/types/MenuQueue";
import { mdiAlarmCheck, mdiDelete } from "@mdi/js"; //mdiEyeSettings mdiTimerSand mdiCheckBold
import { computed, onMounted, ref } from "vue";
import ConfirmDialogT from "@/components/ConfirmDialogT.vue";
// import { useMenuStore } from "@/stores/menu";
// import { useRecieptDetailStore } from "@/stores/reciept_detail";
// const menuStore = useMenuStore();
// const recieptDetailStore = useRecieptDetailStore();
// import { useCookingStore } from "@/stores/cooking";
// const cookingStore = useCookingStore();
const selects = ref(-1);
const varcpStore = useVarCompnStore();
const menuQueueStore = useMenuQueueStore();
const loginStore = useLoginStore();
const tableMgmtStore = useTableMgmtStore();
onMounted(async () => {
  await tableMgmtStore.getTableMgmts();
  await menuQueueStore.getMenuQueues();
  await loginStore.loadData();
  await menuQueueStore.getCountSList(tableMgmtStore.tableMgmts);
});
function showList(num: number) {
  console.log(selects.value);
  menuQueueStore.tableNumm = num;
  menuQueueStore.getServeList(menuQueueStore.tableNumm); //selects.value
  console.log(menuQueueStore.serveList);
}
const orderList = computed(() => {
  console.log(menuQueueStore.countSList);
  return [...menuQueueStore.countSList].sort(
    (n1, n2) => n2.numServe - n1.numServe
  ); //reverse);
});

const confirmDlg = ref();
const updateStsMenuQ = async (menuQ: MenuQueue, status: string) => {
  try {
    await confirmDlg.value.openDialog(
      "Please Confirm",
      `คุณต้องการยืนยันการทำรายการนี้ว่า ${status} หรือไม่`
    );
    await menuQueueStore.updateStsMenuQ(menuQ, status);
    // menuQueueStore.getServeList();
    menuQueueStore.getCountSList(tableMgmtStore.tableMgmts);
  } catch (e) {
    console.log(e);
  }
};
const getColor = (numList: number) => {
  if (numList > 0) return "red";
  return "grey";
};

const getColorAll = (numList: number) => {
  if (numList > 0) return "brown";
  return "grey";
};
// const cancelMenuQ = async (menuQ: MenuQueue) => {
//   try {
//     await confirmDlg.value.openDialog(
//       "Please Confirm",
//       `คุณต้องการยกเลิกรายการนี้หรือไม่`
//     );
//     await menuQueueStore.updateStsMenuQ(menuQ);
//     await menuQueueStore.cancelMenuQueue(menuQ);
//   } catch (e) {
//     console.log(e);
//   }
// };
</script>

<template>
  <v-container>
    <v-row>
      <v-container style="background-color: rgb(80, 50, 0)">
        <v-expansion-panels variant="accordion">
          <!-- v-model="selects" -->
          <v-expansion-panel
            v-for="(item, i) of orderList"
            :key="i"
            :style="varcpStore.styleTable"
            @click="showList(item.table.num)"
          >
            <v-expansion-panel-title v-slot="{ open }">
              <v-row no-gutters>
                <v-col
                  cols="4"
                  class="d-flex justify-start"
                  style="font-size: 2.7vh"
                >
                  Table No.{{ item.table.num }}</v-col
                >
                <v-col cols="5" class="text--secondary">
                  <v-fade-transition leave-absolute>
                    <span v-if="open" key="0"> List </span>
                    <span v-else key="1">
                      <!-- number of items
                      <v-chip
                        :color="getColor(menuQueueStore.countS(item.num))"
                        dark
                      >
                        {{ menuQueueStore.countS(item.num) }}
                      </v-chip> -->
                    </span>
                  </v-fade-transition>
                </v-col>
                <v-col cols="3" class="d-flex justify-start">
                  <div class="ma-1 pt-2" style="font-size: 2.5vh">Serve :</div>
                  <v-chip
                    :color="getColor(item.numServe)"
                    dark
                    class="ma-1"
                    style="font-size: 2.5vh"
                  >
                    {{ item.numServe }}
                  </v-chip>
                  <v-chip color="grey" dark class="ma-1"> / </v-chip>
                  <v-chip
                    :color="getColorAll(item.numAll)"
                    dark
                    class="ma-1"
                    style="font-size: 2.5vh"
                  >
                    {{ item.numAll }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text style="background-color: rgb(80, 50, 0)">
              <v-row>
                <v-col cols="12">
                  <v-container>
                    <v-table
                      :style="varcpStore.styleTable"
                      fixed-header
                      height="45vh"
                    >
                      <thead>
                        <tr>
                          <!-- <th :style="varcpStore.styleTableTh">Table No.</th> -->
                          <th :style="varcpStore.styleTableTh">Menu Name</th>
                          <th :style="varcpStore.styleTableTh">Status</th>
                          <th :style="varcpStore.styleTableTh">Operations</th>
                        </tr>
                      </thead>
                      <!-- <tbody v-for="item of cookingStore.cookingListc" :key="item.menuName">
            <tr v-for="i of item.quantity" :key="i"> -->
                      <tbody>
                        <tr
                          v-for="(item, i) of menuQueueStore.serveList"
                          :key="i"
                        >
                          <!-- <template v-if="item.status == 'รอเสิร์ฟ'"> -->
                          <!-- <td>{{ item.receipt?.table?.num }}</td> -->
                          <td>
                            {{ item.menu?.name }}
                          </td>
                          <td>{{ item.status }}</td>
                          <td>
                            <v-btn
                              v-if="item.status == 'รอเสิร์ฟ'"
                              :icon="mdiAlarmCheck"
                              :style="varcpStore.styleBtnGreen"
                              class="mx-3 ma-1 vBtnCard button-3d"
                              @click="updateStsMenuQ(item, 'เสิร์ฟแล้ว')"
                            ></v-btn>
                            <!-- <v-btn
                              :icon="mdiDelete"
                              :style="varcpStore.styleBtnRed"
                              class="mx-3 ma-1 vBtnCard button-3d"
                              @click="cancelMenuQ(item)"
                            ></v-btn> -->
                          </td>
                          <!-- </template> -->
                        </tr>
                      </tbody>
                    </v-table>
                  </v-container>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </v-row>
  </v-container>
  <ConfirmDialogT ref="confirmDlg"></ConfirmDialogT>
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
.styleBtnBrown {
  color: rgb(243, 245, 235);
  background-color: rgb(86, 46, 8);
}

.styleBtnOrange {
  color: rgb(243, 245, 235);
  background-color: rgb(173, 84, 54);
}

.styleBtnGreen {
  color: rgb(243, 245, 235);
  background-color: rgb(72, 101, 22);
}

.styleBtnRed {
  color: rgb(243, 245, 235);
  background-color: rgb(146, 16, 16);
}

.fontBtn {
  font-family: Andale Mono, monospace;
}
</style>
