<script lang="ts" setup>
import { useTableMgmtStore } from "@/stores/table-mgmt";
import { useReceiptStore } from "@/stores/receipt";
import ConfirmDialogT from "@/components/ConfirmDialogT.vue";
import MoveTableForm from "@/views/table/MoveTableForm.vue";
import { onMounted, ref } from "vue";
import type TableMgmt from "@/types/TableManagement";
import { mdiSilverwareFork, mdiSilverwareSpoon } from "@mdi/js";
import { useRouter } from "vue-router";
import QRCodeVue3 from "qrcode-vue3";
onMounted(async () => {
  await receiptStore.getReceipts();
});
const tableStore = useTableMgmtStore();
const receiptStore = useReceiptStore();
const confirmDlgs = ref();
const moveDlgs = ref();
const router = useRouter();
async function openSellView(table: TableMgmt) {
  // receiptStore.editedReceipt.table = table;
  // console.log(receiptStore.editedReceipt.table);
  // console.log(receiptStore.editedReceipt);
  // await receiptStore.saveReceipt();
  await receiptStore.openR(table);
  router.push("/receipt/" + receiptStore.uuidReceipt);
}

const openDialog = (value: TableMgmt) => {
  tableStore.editedTableMgmt = value;
  tableStore.dialog = true;
};
defineExpose({ openDialog });
const moveTable = async (item: TableMgmt) => {
  try {
    await moveDlgs.value.openDialog(item);
    await tableStore.dialog;
    // await tableMgmtStore.getTableMgmts();
  } catch (e) {
    /* empty */
  }
};

const cancelTable = async (id: number, seat: number, item: TableMgmt) => {
  try {
    console.log("id " + id);
    await confirmDlgs.value.openDialog(
      "ยกเลิกโต๊ะ",
      `ต้องการยกเลิกโต๊ะที่ ${id} (${seat} ที่นั่ง) ใช่หรือไม่`,
      "ยืนยัน",
      "ปิด"
    );
    await tableStore.canceledTable(id, item);
  } catch (e) {
    /* empty */
  }
};
</script>
<template>
  <v-row justify="center">
    <v-dialog v-model="tableStore.dialog" persistent width="auto">
      <v-card>
        <v-card-title class="text-h3 text-center vHeadText">
          โต๊ะ {{ tableStore.editedTableMgmt.num }}
        </v-card-title>
        <v-card-text class="text-h5 vText text-center"
          >นั่งได้: {{ tableStore.editedTableMgmt.seat }} คน</v-card-text
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
                @click="moveTable(tableStore.editedTableMgmt)"
              >
                ย้ายโต๊ะ
              </v-btn>

              <v-btn
                style="font-family: Andale Mono, monospace; font-size: 3vh"
                color="error"
                variant="outlined"
                @click="
                  cancelTable(
                    tableStore.editedTableMgmt.num,
                    tableStore.editedTableMgmt.seat,
                    tableStore.editedTableMgmt
                  )
                "
              >
                ยกเลิก
              </v-btn>
            </v-row>
            <v-row class="justify-center pa-3"
              ><QRCodeVue3
                v-if="tableStore.editedTableMgmt.status == 'ไม่ว่าง'"
                :width="200"
                :height="200"
                :value="receiptStore.urlSellView"
                :qrOptions="{
                  typeNumber: 0,
                  mode: 'Byte',
                  errorCorrectionLevel: 'H',
                }"
                :imageOptions="{
                  hideBackgroundDots: true,
                  imageSize: 0.4,
                  margin: 0,
                }"
                :dotsOptions="{
                  type: 'square',
                  color: '#000000',
                  gradient: null,
                }"
                :backgroundOptions="{ color: '#ffffff' }"
                :cornersSquareOptions="{ type: '', color: '#000000' }"
                fileExt="png"
            /></v-row>
            <v-row class="justify-center pa-2"
              ><v-btn
                color="blue-grey-darken-2"
                variant="outlined"
                style="font-family: Andale Mono, monospace; font-size: 3vh"
                @click="tableStore.dialog = false"
              >
                ปิด
              </v-btn></v-row
            >
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <ConfirmDialogT ref="confirmDlgs"></ConfirmDialogT>
  <MoveTableForm ref="moveDlgs"> </MoveTableForm>
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
