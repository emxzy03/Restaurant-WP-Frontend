<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useLoginStore } from "@/stores/login";
import { useReceiptStore } from "@/stores/receipt";
import { useTableMgmtStore } from "@/stores/table-mgmt";
import type Receipt from "@/types/Receipt";
import { mdiCurrencyUsd, mdiCreditCard, mdiReceiptText } from "@mdi/js";
import { onMounted, ref } from "vue";
// import { useRecieptDetailStore } from "@/stores/receipt_detail";
import ConfPrintDialog from "./ConfPrintDialog.vue";

onMounted(async () => {
  await receiptStore.getReceipts();
});

const recieptStore = useReceiptStore();
const receiptStore = useReceiptStore();
const loginStore = useLoginStore();
const tableMgmtStore = useTableMgmtStore();
const type = ref("");
const showFocus = ref(false);
const confPrintDlg = ref();

const billPayT = (type: string) => {
  if (type === "โอน") {
    recieptStore.showPay = !recieptStore.showPay;
    recieptStore.showBillPay = {
      payment: "โอน",
      status: "ชำระเงินแล้ว",
      received: recieptStore.receiptsAt?.total,
      change: 0,
    };
    return recieptStore.showBillPay;
  } else if (type === "เงินสด") {
    recieptStore.showText = !recieptStore.showText;
    showFocus.value = true;
    recieptStore.showPay = !recieptStore.showPay;
    recieptStore.showBillPay = {
      payment: "เงินสด",
      status: "ชำระเงินแล้ว",
      received: 0,
      change: 0,
    };
    return recieptStore.showBillPay;
  }
};

const cashPay = (itemRec: Receipt) => {
  if (itemRec.payment === "เงินสด") {
    recieptStore.showBillPay = {
      payment: "เงินสด",
      status: "ชำระเงินแล้ว",
      received: recieptStore.showBillPay.received!,
      change:
        recieptStore.showBillPay.received! - receiptStore.receiptsAt?.total!,
    };
  }
  return recieptStore.showBillPay;
};

const printBill = async (tableId: number, recId: number, itemRec: Receipt) => {
  recieptStore.showBill = !recieptStore.showBill;
  recieptStore.showPay = !recieptStore.showPay;
  cashPay(itemRec);
  // console.log(recieptStore.showBillPay);
  try {
    await tableMgmtStore.statusTable(tableId);
    await recieptStore.updateBill(recId, recieptStore.showBillPay);
    recieptStore.showBillPay = recieptStore.editedReceipt;
  } catch (e) {
    /* empty */
  }
};

const openD = async (tableId: number, recId: number, itemRec: Receipt) => {
  try {
    await confPrintDlg.value.openDialog(tableId, recId, itemRec);
    // await tableMgmtStore.getTableMgmts();
  } catch (e) {
    /* empty */
  }
};

const checkReceiptDetail = () => {
  if (receiptStore.receiptsAt?.receiptDetail! != undefined) {
    if (receiptStore.receiptsAt?.receiptDetail?.length! > 0) {
      return true;
    }
  }
  return false;
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col sm="12">
        <v-card
          max-width="1000"
          height="auto"
          variant="outlined"
          class="overflow-y-auto bg-white"
        >
          <div v-if="!receiptStore.showBill">
            <v-card
              class="mx-2 ma-2 justify-center"
              height="80vh"
              max-height="auto"
              variant="flat"
              max-width="1000"
            >
              <v-card-text
                class="justify-center text-center mx-2 ma-2"
                style="padding-top: 50%; font-size: 4vh"
              >
                ไม่มีรายการ
              </v-card-text>
            </v-card>
          </div>
          <div v-if="receiptStore.showBill">
            <form>
              <v-row>
                <v-col align="center" justify="center">
                  <v-card
                    class="mx-2 ma-2 justify-center"
                    variant="outlined"
                    max-width="400"
                  >
                    <v-card-item>
                      <div class="text-h5">
                        Table No. {{ receiptStore.tableCheckBill }}
                      </div>
                    </v-card-item>
                  </v-card>
                </v-col>
              </v-row>
              <v-row class="ma-auto">
                <v-col>
                  <div class="position-absolute" style="left: 10%">
                    Cashier : {{ loginStore.userIdNow }}
                  </div>
                </v-col>
              </v-row>
              <v-row class="mx-2 ma-2">
                <v-col>
                  <div class="position-absolute" style="left: 10%">
                    <!-- DATE : {{ receiptStore.date.getUTCDay() }}/{{ receiptStore.date.getMonth() }}/{{
                              receiptStore.date.getFullYear()
                            }} -->
                    DATE:
                    {{ receiptStore.date.getDate() }}/{{
                      receiptStore.date.getMonth() + 1
                    }}/{{ receiptStore.date.getFullYear() }}
                  </div>
                </v-col>
                <v-col>
                  <div class="position-absolute" style="right: 15%">
                    TIME :
                    {{ receiptStore.date.toLocaleTimeString() }}
                  </div>
                </v-col>
              </v-row>
              <v-row
                justify="center"
                style="max-height: 40vh; height: auto; overflow: auto"
              >
                <v-col cols="10">
                  <v-table>
                    <thead>
                      <tr>
                        <th>Menu Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-if="checkReceiptDetail()">
                        <tr
                          v-for="(item, index) in receiptStore.receiptsAt
                            ?.receiptDetail"
                          :key="index"
                        >
                          <td style="border-bottom: none">{{ item.name }}</td>
                          <td style="border-bottom: none">
                            {{ item.quantity }}
                          </td>
                          <td style="border-bottom: none">{{ item.price }}</td>
                          <td style="border-bottom: none">{{ item.total }}</td>
                        </tr>
                      </template>
                      <template v-else>
                        <td
                          style="border: none; text-align: center"
                          colspan="4"
                        >
                          ยังไม่มีรายการอาหาร
                        </td>
                      </template>
                    </tbody>
                    <tr>
                      <td style="border-bottom: 1px solid #dddddd"></td>
                      <td style="border-bottom: 1px solid #dddddd"></td>
                      <td style="border-bottom: 1px solid #dddddd"></td>
                      <td style="border-bottom: 1px solid #dddddd"></td>
                    </tr>
                  </v-table>
                </v-col>
              </v-row>
              <v-row class="ma-4">
                <v-col>
                  <div class="position-absolute" style="left: 11%">
                    SUBTOTAL
                  </div>
                </v-col>
                <v-col>
                  <div class="position-absolute" style="right: 20%">
                    {{ receiptStore.receiptsAt?.subtotal }}
                  </div>
                </v-col>
              </v-row>
              <v-row class="ma-2">
                <v-col>
                  <div class="position-absolute" style="left: 11%">
                    DISCOUNT
                  </div>
                </v-col>
                <v-col>
                  <div class="position-absolute" style="right: 20%">
                    {{ receiptStore.receiptsAt?.discount }}
                  </div>
                </v-col>
              </v-row>
              <v-row class="ma-4">
                <v-col>
                  <div
                    class="position-absolute font-weight-bold"
                    style="left: 11%"
                  >
                    TOTAL
                  </div>
                </v-col>
                <v-col>
                  <div
                    class="position-absolute font-weight-bold"
                    style="right: 20%"
                  >
                    {{ receiptStore.receiptsAt?.total }}
                  </div>
                </v-col>
              </v-row>
              <v-row class="ma-2">
                <v-col>
                  <div class="position-absolute" style="left: 11%">Cash</div>
                </v-col>
                <v-col v-if="!receiptStore.showText">
                  <div class="position-absolute" style="right: 20%" lg>
                    {{ receiptStore.showBillPay.received }}
                  </div>
                </v-col>
                <v-col v-else>
                  <div
                    class="position-absolute"
                    style="right: 20%; bottom: 36vh"
                  >
                    <v-text-field
                      variant="underlined"
                      v-model.number="receiptStore.showBillPay.received"
                      style="width: 40px"
                      :autofocus="showFocus"
                      hide-details="auto"
                      oninput="if(this.value < 0) this.value = 0"
                      reverse
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row class="ma-2">
                <v-col>
                  <div class="position-absolute" style="left: 11%">Change</div>
                </v-col>
                <v-col v-if="recieptStore.showBillPay.received! == 0">
                  <div class="position-absolute" style="right: 20%">
                    {{ recieptStore.showBillPay.received! }}
                  </div>
                </v-col>
                <v-col
                  v-else-if="receiptStore.receiptsAt?.total! - recieptStore.showBillPay.received! < 0"
                >
                  <div class="position-absolute" style="right: 20%">
                    {{
                      recieptStore.showBillPay.received! -
                      receiptStore.receiptsAt?.total!
                    }}
                  </div>
                </v-col>
                <v-col
                  v-else-if="receiptStore.receiptsAt?.total! - recieptStore.showBillPay.received! < receiptStore.receiptsAt?.total! && receiptStore.receiptsAt?.total! - recieptStore.showBillPay.received! >= 1 || recieptStore.showBillPay.received! < 0"
                >
                  <div class="position-absolute" style="right: 20%">
                    จำนวนเงินไม่พอ
                  </div>
                </v-col>
                <v-col v-else>
                  <div class="position-absolute" style="right: 20%">
                    {{
                      receiptStore.receiptsAt?.total! -
                      recieptStore.showBillPay.received!
                    }}
                  </div>
                </v-col>
              </v-row>
              <v-row class="ma-4">
                <v-col>
                  <div class="position-absolute" style="left: 11%">
                    Status :
                  </div>
                </v-col>
                <v-col>
                  <div class="position-absolute" style="right: 20%">
                    {{ receiptStore.showBillPay.status }}
                  </div>
                </v-col>
              </v-row>
              <v-row class="ma-4">
                <v-col class="ma-4">
                  <div class="position-absolute" style="left: 11%">
                    Payment :
                  </div>
                </v-col>
                <v-col class="ma-4" v-if="recieptStore.showPay">
                  <div class="position-absolute" style="right: 20%">
                    {{ recieptStore.showBillPay.payment }}
                  </div>
                </v-col>
                <v-col class="position-absolute" style="left: 60%" v-else>
                  <v-btn
                    variant="flat"
                    class="ma-2"
                    color="light-green"
                    :icon="mdiCurrencyUsd"
                    @click="billPayT((type = 'เงินสด'))"
                  >
                    <v-icon :icon="mdiCurrencyUsd"></v-icon>
                    <v-tooltip activator="parent" location="top"
                      >เงินสด</v-tooltip
                    >
                  </v-btn>
                  <v-btn
                    variant="flat"
                    class="ma-2"
                    :icon="mdiCreditCard"
                    color="lime"
                    @click="billPayT((type = 'โอน'))"
                  >
                    <v-icon :icon="mdiCreditCard"></v-icon>
                    <v-tooltip activator="parent" location="top">โอน</v-tooltip>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row class="ma-10 pa-5">
                <v-col class="position-absolute" style="left: 35%">
                  <v-btn
                    :prepend-icon="mdiReceiptText"
                    variant="flat"
                    style="font-size: 100%; font-weight: bold"
                    color="blue-grey"
                    v-if="recieptStore.showPay"
                    @click="
                      openD(
                        recieptStore.tableCheckBill,
                        recieptStore.receiptsAt?.id!,
                        recieptStore.showBillPay
                      )
                    "
                  >
                    พิมพ์ใบเสร็จ
                  </v-btn>
                  <!-- @click="
                                  printBill(
                                    recieptStore.tableCheckBill,
                                    recieptStore.receiptsAt?.id!,
                                    recieptStore.showBillPay
                                  )
                                " -->
                </v-col>
              </v-row>
            </form>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <ConfPrintDialog ref="confPrintDlg"></ConfPrintDialog>
</template>

<style scoped>
.v-text-field {
  text-align: right;
}
</style>
