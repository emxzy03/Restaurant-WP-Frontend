<script setup lang="ts">
import { useReceiptStore } from "@/stores/receipt";
import ReceiptDetails from "./ReceiptDetails.vue";
import { computed, onMounted, ref } from "vue";
import {
  mdiPencil,
  mdiDelete,
  mdiReceiptTextPlus,
  mdiDotsHorizontalCircle,
} from "@mdi/js";
import { useVarCompnStore } from "@/stores/var-compn";
import ReceiptDialog from "./ReceiptDialog.vue";
import AutoCompleteFind from "@/components/AutoCompleteFind.vue";
const receiptStore = useReceiptStore();
const varcpStore = useVarCompnStore();
const detailDialog = ref();

onMounted(async () => {
  await receiptStore.getReceipts();
});

const viewDetails = async (id: number) => {
  try {
    await detailDialog.value.openDialog(id);
  } catch (e) {
    console.log(e);
  }
};
const orderList = computed(() => {
  return [...receiptStore.receipts].sort((n1, n2) => n2.id! - n1.id!);
});
// const showList = (id: number) => {
//   console.log("s" + id);
//   billMatStore.getBillItemsAt(id);
// };

// const getColor = (numList: number) => {
//   if (numList > 0) return "rgb(72, 101, 22)";
//   return "grey";
// };
</script>

<template>
  <ReceiptDialog></ReceiptDialog>
  <v-container>
    <v-row>
      <!-- <v-col cols="2" offset="9"> -->
      <!-- <v-btn
          :prepend-icon="mdiReceiptTextPlus"
          class="ma-1 vBtnCard button-3d"
          style="
            color: rgb(243, 245, 235);
            background-color: rgb(86, 46, 8);
            font-family: AndaleMono, monospace;
          "
          >Add New</v-btn> -->
      <!-- </v-col> -->
      <v-col cols="6" offset="1">
        <AutoCompleteFind
          label="Search Receipt"
          :nameLists="receiptStore.nameReceipt()"
        ></AutoCompleteFind>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-container style="background-color: rgb(80, 50, 0)">
          <v-table :style="varcpStore.styleTable" fixed-header height="70vh">
            <thead>
              <tr>
                <td :style="varcpStore.styleTableTh">ID</td>
                <td :style="varcpStore.styleTableTh">หมายเลขโต๊ะ</td>
                <td :style="varcpStore.styleTableTh">วันเวลา</td>
                <td :style="varcpStore.styleTableTh">ราคาทั้งหมด</td>
                <td :style="varcpStore.styleTableTh">ส่วนลด</td>
                <td :style="varcpStore.styleTableTh">ราคาสุทธิ</td>
                <td :style="varcpStore.styleTableTh">สถานะ</td>
                <td :style="varcpStore.styleTableTh">ช่องทางชำระเงิน</td>
                <td :style="varcpStore.styleTableTh">เงินที่รับ</td>
                <td :style="varcpStore.styleTableTh">เงินทอน</td>
                <td :style="varcpStore.styleTableTh">empid</td>
                <td :style="varcpStore.styleTableTh">Operations</td>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item of orderList" :key="item.id">
                <td
                  v-if="
                    varcpStore.valuesMatAutocom ==
                      item.date?.toString().substring(0, 10) ||
                    varcpStore.valuesMatAutocom == item.table?.num ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.id }}
                </td>
                <td
                  v-if="
                    varcpStore.valuesMatAutocom ==
                      item.date?.toString().substring(0, 10) ||
                    varcpStore.valuesMatAutocom == item.table?.num ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.table?.num }}
                </td>
                <td
                  v-if="
                    varcpStore.valuesMatAutocom ==
                      item.date?.toString().substring(0, 10) ||
                    varcpStore.valuesMatAutocom == item.table?.num ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.date?.toString().substring(0, 10) }} |
                  {{
                    item.date
                      ?.toString()
                      .substring(11, item.date?.toString().length - 5)
                  }}
                </td>
                <td
                  v-if="
                    varcpStore.valuesMatAutocom ==
                      item.date?.toString().substring(0, 10) ||
                    varcpStore.valuesMatAutocom == item.table?.num ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.subtotal }}
                </td>
                <td
                  v-if="
                    varcpStore.valuesMatAutocom ==
                      item.date?.toString().substring(0, 10) ||
                    varcpStore.valuesMatAutocom == item.table?.num ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.discount }}
                </td>
                <td
                  v-if="
                    varcpStore.valuesMatAutocom ==
                      item.date?.toString().substring(0, 10) ||
                    varcpStore.valuesMatAutocom == item.table?.num ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.total }}
                </td>
                <td
                  v-if="
                    varcpStore.valuesMatAutocom ==
                      item.date?.toString().substring(0, 10) ||
                    varcpStore.valuesMatAutocom == item.table?.num ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.status }}
                </td>
                <td
                  v-if="
                    varcpStore.valuesMatAutocom ==
                      item.date?.toString().substring(0, 10) ||
                    varcpStore.valuesMatAutocom == item.table?.num ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.payment }}
                </td>
                <td
                  v-if="
                    varcpStore.valuesMatAutocom ==
                      item.date?.toString().substring(0, 10) ||
                    varcpStore.valuesMatAutocom == item.table?.num ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.received }}
                </td>
                <td
                  v-if="
                    varcpStore.valuesMatAutocom ==
                      item.date?.toString().substring(0, 10) ||
                    varcpStore.valuesMatAutocom == item.table?.num ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.change }}
                </td>
                <td
                  v-if="
                    varcpStore.valuesMatAutocom ==
                      item.date?.toString().substring(0, 10) ||
                    varcpStore.valuesMatAutocom == item.table?.num ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.employee?.id }}
                </td>
                <td
                  v-if="
                    varcpStore.valuesMatAutocom ==
                      item.date?.toString().substring(0, 10) ||
                    varcpStore.valuesMatAutocom == item.table?.num ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  <v-btn
                    :icon="mdiDotsHorizontalCircle"
                    class="mx-1 ma-1 vBtnCard button-3d styleBtnGreen"
                    @click="viewDetails(item.id!)"
                  ></v-btn>

                  <v-btn
                    :prepend-icon="mdiPencil"
                    class="ma-1 vBtnCard button-3d styleBtnOrange fontBtn"
                    @click="receiptStore.editReceipt(item)"
                    >Edit</v-btn
                  >
                  <v-btn
                    :prepend-icon="mdiDelete"
                    @click="
                      receiptStore.deleteReceipt(item.id!, item.table!.id!)
                    "
                    class="vBtnCard button-3d styleBtnRed fontBtn"
                    >Delete</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
  <ReceiptDetails ref="detailDialog"></ReceiptDetails>
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
