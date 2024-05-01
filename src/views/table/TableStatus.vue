<script setup lang="ts">
import tableMgmt from "@/services/table-mgmt";
import { useTableMgmtStore } from "@/stores/table-mgmt";
import { onMounted, ref } from "vue";
const TableStore = useTableMgmtStore();
onMounted(async () => {
  await TableStore.getTableMgmts();
  await TableStore.getNumReady();
  await TableStore.getNumClean();
  await TableStore.getNumBusy();
  console.log("TableStore.tableMgmts => ", TableStore.tableMgmts);
});
</script>
<template>
  <v-navigation-drawer
    location="right"
    permanent
    style="align-items: center"
    color="rgb(243, 245, 225)"
  >
    <br /><br />
    <v-btn
      @click="TableStore.getTableAll()"
      height="45px"
      width="150px"
      style="color: white; background-color: #56430a"
      class="vBtnCard button-3d"
    >
      โต๊ะทั้งหมด {{ TableStore.tableMgmts.length }} โต๊ะ
    </v-btn>
    <br /><br />
    <v-btn
      @click="TableStore.getTableReady()"
      height="45px"
      width="150px"
      style="color: black; background-color: #aed581"
      class="vBtnCard button-3d"
    >
      ว่าง {{ TableStore.numReady }} โต๊ะ
    </v-btn>
    <br /><br />
    <v-btn
      @click="TableStore.getTableClean()"
      height="45px"
      width="150px"
      style="color: black; background-color: #ffb74d"
      class="vBtnCard button-3d"
    >
      กำลังจะว่าง {{ TableStore.numClean }} โต๊ะ
    </v-btn>
    <br /><br />
    <v-btn
      @click="TableStore.getTableBusy()"
      height="45px"
      width="150px"
      style="color: black; background-color: #ff8a65"
      class="vBtnCard button-3d"
    >
      ไม่ว่าง {{ TableStore.numBusy }} โต๊ะ
    </v-btn>
  </v-navigation-drawer>
</template>

<style scoped>
.button-3d {
  position: relative;
  width: auto;
  text-decoration: none;
  border-radius: 3em;
  border: solid 1px none;
  background: rgb(80, 50, 0);
  text-align: center;
  padding: 9px 18px 10px;

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
