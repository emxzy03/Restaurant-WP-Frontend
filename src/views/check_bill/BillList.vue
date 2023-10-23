<script setup lang="ts">
// import { useTableStore } from "@/stores/table";
import { useReceiptStore } from "@/stores/receipt";
import { useTableMgmtStore } from "@/stores/table-mgmt";
import { useVarCompnStore } from "@/stores/var-compn";
import { mdiCashCheck } from "@mdi/js";
import { onMounted, ref } from "vue";
import ReceiptC from "./Receipt.vue";
// import { useCookingStore } from "@/stores/cooking";
// import { useRecieptDetailStore } from "@/stores/receipt_detail";

// const recieptDetailStore = useRecieptDetailStore();

// const tableStore = useTableStore();
// const cookingStore = useCookingStore();

// cookingStore.cate("");

const varcpStore = useVarCompnStore();
const tableMgmtStore = useTableMgmtStore();
const recieptStore = useReceiptStore();
const confirmDlgs = ref();

const colorStatus = (colorS: string): string => {
  if (colorS === "ว่าง" || colorS === "กำลังจะว่าง") {
    return "#E0E0E0";
  } else if (colorS === "ไม่ว่าง") {
    return "#FFB74D";
  } else {
    return "#AED581";
  }
};

const checkBill = async (id: number, status: String) => {
  try {
    if (status === "ไม่ว่าง" && !recieptStore.showBill) {
      recieptStore.showBill = !recieptStore.showBill;
      recieptStore.tableCheckBill = id;
      recieptStore.date = new Date();
      recieptStore.getDetails();
      if (recieptStore.showPay) {
        recieptStore.showPay = !recieptStore.showPay;
      }
    } else if (status === "ไม่ว่าง") {
      recieptStore.tableCheckBill = id;
      recieptStore.getDetails();
      recieptStore.date = new Date();
      if (recieptStore.showPay) {
        recieptStore.showPay = !recieptStore.showPay;
      }
      if (recieptStore.showBillPay.payment == "เงินสด") {
        recieptStore.showText = !recieptStore.showText;
      }
      recieptStore.showBillPay = recieptStore.editedReceipt;
    } else if (
      (status === "ว่าง" && recieptStore.showBill) ||
      (status === "กำลังจะว่าง" && recieptStore.showBill)
    ) {
      recieptStore.showBill = !recieptStore.showBill;
      console.log("ว่าง");
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(async () => {
  await tableMgmtStore.getTableMgmts();
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col sm="12">
        <v-card
          max-width="1000"
          height="80vh"
          variant="outlined"
          class="overflow-auto pa-2 ma-2"
          style="background-color: rgb(80, 50, 0)"
        >
          <!-- rgb(86, 46, 8) -->
          <!-- bg-blue-grey-darken-1 -->
          <v-card
            class="vCard mx-2 ma-2"
            v-for="item of tableMgmtStore.tableMgmts"
            :key="item.num"
            :color="colorStatus(item.status)"
            elevation="4"
          >
            <v-row>
              <v-col>
                <v-card-item>
                  <div class="vTitle mb-1">Table No. {{ item.num }}</div>
                  <div
                    class="text-caption"
                    style="font-weight: bold"
                    v-if="
                      item.status === 'ว่าง' || item.status === 'กำลังจะว่าง'
                    "
                  >
                    สถานะ: -
                  </div>
                  <div class="text-caption" style="font-weight: bold" v-else>
                    สถานะ: กำลังรอ
                  </div>
                </v-card-item>
              </v-col>
              <v-col align-self="center">
                <v-card-actions class="justify-center">
                  <v-btn
                    :prepend-icon="mdiCashCheck"
                    variant="plain"
                    class="vBtnCard button-3d"
                    color="teal darken-4"
                    @click="checkBill(item.id!, item.status)"
                  >
                    <div
                      style="color: #ffff; font-size: 100%; font-weight: 600"
                    >
                      เช็คบิล
                    </div>
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.vCard {
  font-family: Andale Mono, monospace;
  /* border-radius: 25px; */
  /* border: #fafafa solid; */
}

.vTitle {
  font-size: 3vh;
  font-weight: bold;
}

.vText {
  font-size: 2vh;
}

.button-3d {
  position: relative;
  width: auto;
  /* display: inline-block; */
  /* color: #c4c4c4; */
  text-decoration: none;
  border-radius: 1em;
  border: solid 1px none;
  background: #2f2f2f;
  text-align: center;
  padding: 9px 18px 14px;
  margin: 12px;

  -webkit-transition: all 0.1s;
  -moz-transition: all 0.1s;
  transition: all 0.1s;

  -webkit-box-shadow: 0px 6px 0px #2b2b2b;
  -moz-box-shadow: 0px 6px 0px #6f6f6f;
  box-shadow: 0px 6px 0px #000;
}

.button-3d:active {
  -webkit-box-shadow: 0px 2px 0px #5b5b5b;
  -moz-box-shadow: 0px 2px 0px #000;
  box-shadow: 0px 2px 0px #5b5b5b;
  position: relative;
  top: 4px;
}
</style>
