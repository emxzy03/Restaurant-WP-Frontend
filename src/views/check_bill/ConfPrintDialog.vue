<script lang="ts" setup>
import { useTableMgmtStore } from "@/stores/table-mgmt";
import { useReceiptStore } from "@/stores/receipt";
import ConfirmDialogT from "@/components/ConfirmDialogT.vue";
import MoveTableForm from "@/views/table/MoveTableForm.vue";
import { onMounted, ref } from "vue";
import type TableMgmt from "@/types/TableManagement";
import { mdiSilverwareFork, mdiSilverwareSpoon } from "@mdi/js";
import { useRouter } from "vue-router";
import type Receipt from "@/types/Receipt";
onMounted(async () => {
  await receiptStore.getReceipts();
});
const tableMgmtStore = useTableMgmtStore();
const receiptStore = useReceiptStore();
const confirmDlgs = ref();
const moveDlgs = ref();
const router = useRouter();

const tabId = ref(0);
const rcId = ref(0);
const itemR = ref();
const openDialog = (tableId: number, recId: number, itemRec: Receipt) => {
  tabId.value = tableId;
  rcId.value = recId;
  itemR.value = itemRec;
  receiptStore.dialogP = true;
};

defineExpose({ openDialog });

const printBill = async () => {
  receiptStore.dialogP = false;
  receiptStore.showBill = !receiptStore.showBill;
  receiptStore.showPay = !receiptStore.showPay;
  // cashPay(itemR.value);
  // console.log(receiptStore.showBillPay);
  try {
    // await tableMgmtStore.statusTable(tabId.value);
    await receiptStore.updateBill(rcId.value, receiptStore.showBillPay);
    receiptStore.showBillPay = receiptStore.editedReceipt;
  } catch (e) {
    /* empty */
  }
  reset();
  receiptStore.showPay = false;
};

// const printBill = async () => {
//   receiptStore.showBill = !receiptStore.showBill;
//   receiptStore.showPay = !receiptStore.showPay;
//   cashPay(itemR.value);
//   // console.log(receiptStore.showBillPay);
//   try {
//     await tableMgmtStore.statusTable(tabId.value);
//     await receiptStore.updateBill(rcId.value, receiptStore.showBillPay);
//     receiptStore.showBillPay = receiptStore.editedReceipt;
//   } catch (e) {
//     /* empty */
//   }
//   receiptStore.dialogP = false;
// };

// const cashPay = (itemRec: Receipt) => {
//   if (itemRec.payment === "เงินสด") {
//     receiptStore.showBillPay = {
//       payment: "เงินสด",
//       status: "ชำระเงินแล้ว",
//       received: receiptStore.showBillPay.received!,
//       change:
//         receiptStore.showBillPay.received! - receiptStore.receiptsAt?.total!,
//     };
//   }
//   return receiptStore.showBillPay;
// };

const reset = () => {
  receiptStore.showBillPay = {
    payment: "-",
    status: "รอชำระเงิน",
    received: 0,
    change: 0,
  };
  receiptStore.showPay = !receiptStore.showPay;
  receiptStore.showText = false;
  receiptStore.dialogP = false;
};
</script>
<template>
  <v-row justify="center">
    <v-dialog v-model="receiptStore.dialogP" persistent width="auto">
      <v-card>
        <v-card-title class="text-h3 text-center vHeadText">
          โต๊ะ {{ tabId }}
        </v-card-title>
        <v-card-text class="text-h5 vText text-center"
          >ยืนยันการพิมพ์ใบเสร็จ</v-card-text
        >
        <v-divider :thickness="5" color="rgb(72, 101, 22)"></v-divider>
        <v-card-actions>
          <!-- <v-spacer></v-spacer> -->
          <v-container class="justify-center">
            <v-row class="justify-center pa-2">
              <v-btn
                style="font-family: Andale Mono, monospace; font-size: 3vh"
                color="orange-darken-4"
                variant="outlined"
                @click="printBill()"
              >
                ยืนยัน
              </v-btn>

              <v-btn
                style="font-family: Andale Mono, monospace; font-size: 3vh"
                color="error"
                variant="outlined"
                @click="receiptStore.dialogP = false"
              >
                ปิด
              </v-btn>
            </v-row>
            <v-row class="justify-center pa-2"
              ><v-btn
                color="blue-grey-darken-2"
                variant="outlined"
                style="font-family: Andale Mono, monospace; font-size: 3vh"
                @click="reset()"
              >
                เปลี่ยนช่องทางชำระเงิน
              </v-btn></v-row
            >
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<style>
.vHeadText {
  text-align: center;
  color: rgb(173, 84, 54);
  font-family: Andale Mono, monospace;
  padding-top: 5vh;
}
.vText {
  font-family: Andale Mono, monospace;
}
</style>
