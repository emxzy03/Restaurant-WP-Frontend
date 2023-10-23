<script setup lang="ts">
import AutoCompleteFindNum from "@/components/AutoCompleteFindNum.vue";
import ConfirmDialogT from "@/components/ConfirmDialogT.vue";
import { useTableStore } from "@/stores/table";
import { useTableMgmtStore } from "@/stores/table-mgmt";
import { useVarCompnStore } from "@/stores/var-compn";
import type TableMgmt from "@/types/TableManagement";
import { mdiFoodForkDrink, mdiBroom } from "@mdi/js";
import { onMounted, ref } from "vue";
import ReserveTableDialog from "./ReserveTableDialog.vue";
import { useReceiptStore } from "@/stores/receipt";
const tableStore = useTableStore();
const varcpStore = useVarCompnStore();
const tableMgmtStore = useTableMgmtStore();
const confirmDlg = ref();
const reserveDlg = ref();
const receiptStore = useReceiptStore();
const colorStatus = (colorS: string): string => {
  if (colorS === "ว่าง") {
    return "#AED581";
  } else if (colorS === "กำลังจะว่าง") {
    return "#FFB74D";
  } else if (colorS === "ไม่ว่าง") {
    return "#FF8A65";
  }
  return "#E0E0E0";
};
const moveTable = async (item: TableMgmt) => {
  try {
    await reserveDlg.value.openDialog(item);
    // await tableMgmtStore.getTableMgmts();
  } catch (e) {
    /* empty */
  }
};
const reserveTable = async (id: number, seat: number, item: TableMgmt) => {
  try {
    console.log("id " + id);
    await confirmDlg.value.openDialog(
      "จองโต๊ะ",
      `ต้องการจองโต๊ะที่ ${id} (${seat} ที่นั่ง) ใช่หรือไม่`,
      "ยืนยัน",
      "ปิด"
    );
    await tableMgmtStore.reservedTable(id, item);
  } catch (e) {
    /* empty */
  }
};
const cleanTable = async (id: number, seat: number, item: TableMgmt) => {
  try {
    console.log("id " + id);
    await confirmDlg.value.openDialog(
      "เก็บโต๊ะ",
      `ต้องการเก็บโต๊ะที่ ${id} (${seat} ที่นั่ง) ใช่หรือไม่`,
      "ยืนยัน",
      "ปิด"
    );
    await tableMgmtStore.cleanedTable(id, item);
  } catch (e) {
    /* empty */
  }
};

onMounted(async () => {
  await tableMgmtStore.getTableMgmts();
});
</script>

<template>
  <ReserveTableDialog></ReserveTableDialog>
  <v-row>
    <v-col>
      <AutoCompleteFindNum
        label="Search Seat"
        :numLists="tableMgmtStore.seatTableMgmt()"
      ></AutoCompleteFindNum>
    </v-col>
  </v-row>
  <v-row style="height: 80vh; overflow-y: auto">
    <template v-for="item of tableMgmtStore.tableMgmts" :key="item.id">
      <v-col
        v-if="
          varcpStore.valuesMatAutocom == item.seat ||
          (varcpStore.valuesMatAutocom == null &&
            (item.status == tableMgmtStore.needStatus ||
              tableMgmtStore.needStatus == ''))
        "
        cols="4"
      >
        <v-card
          style="font-size: 2.2vh"
          class="vCard"
          height="150px"
          width="290px"
          elevation="5"
          :color="colorStatus(item.status)"
        >
          <v-card-title class="vTitle">Table No. {{ item.num }}</v-card-title>
          <v-card-text class="vText" :prepend-icon="mdiBroom"
            >นั่งได้ {{ item.seat }} คน [{{ item.status }}]</v-card-text
          >
          <v-card-actions class="justify-center">
            <v-btn
              style="color: rgb(243, 245, 235); background-color: #6d4c41"
              class="vBtnCard button-3d"
              :prepend-icon="mdiFoodForkDrink"
              v-if="item.status == 'ว่าง'"
              @click="reserveTable(item.num, item.seat, item)"
              >จอง</v-btn
            >
            <!-- v-if="item.status == 'ว่าง'" -->
            <!-- moveTable(item); -->
            <v-btn
              style="color: rgb(243, 245, 235); background-color: #6d4c41"
              class="vBtnCard button-3d"
              :prepend-icon="mdiFoodForkDrink"
              v-if="item.status == 'ไม่ว่าง' || item.status == 'กำลังจะว่าง'"
              @click="
                receiptStore.setUrlSellView(item);
                moveTable(item);
              "
              >จอง</v-btn
            >
            <v-btn
              style="color: rgb(243, 245, 235); background-color: #6d4c41"
              class="vBtnCard button-3d"
              :prepend-icon="mdiBroom"
              @click="cleanTable(item.num, item.seat, item)"
              >เก็บ</v-btn
            ></v-card-actions
          >
        </v-card>
      </v-col>
    </template>
  </v-row>
  <ConfirmDialogT ref="confirmDlg"></ConfirmDialogT>
  <ReserveTableDialog ref="reserveDlg"></ReserveTableDialog>
</template>
<style scoped>
.vCard {
  font-family: Andale Mono, monospace;
  border-radius: 25px;
  /* border: #fafafa solid; */
}
.vTitle {
  text-align: center;
  font-size: 19pt;
  font-weight: bold;
}
.vText {
  text-align: center;
  font-size: 14pt;
  color: #000;
}
.vBtnCard {
  background-color: white;
}
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
</style>
<!-- rounded="pill"
            variant="tonal"
            elevation="8" -->
