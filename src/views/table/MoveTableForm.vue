<script lang="ts" setup>
import { useTableMgmtStore } from "@/stores/table-mgmt";
import type TableMgmt from "@/types/TableManagement";
import { ref } from "vue";
const goalTable = ref();
const tableStore = useTableMgmtStore();

const openDialog = (value: TableMgmt) => {
  tableStore.editedTableMgmt = value;
  tableStore.dialogM = true;
  // tableStore.dialog = false;
};
defineExpose({ openDialog });
const onClear = () => {
  goalTable.value = null;
};
tableStore.dialog = false;
console.log("TEST :" + tableStore.editedTableMgmt.num);
</script>
<template>
  <v-row justify="center">
    <v-dialog v-model="tableStore.dialogM" persistent width="1024">
      <v-card style="margin: auto">
        <v-card-title class="text-h4 vHeadText">
          ย้ายโต๊ะ {{ tableStore.editedTableMgmt.num }}</v-card-title
        >
        <v-card-text class="text-h6 vText">
          <v-container>
            <v-row>
              <v-col>
                <!-- cols="12" sm="6" md="4" -->
                <v-text-field
                  class="text-h6 vText"
                  label="โต๊ะที่ต้องการ*"
                  required
                  v-model.number="goalTable"
                  :rules="[(v) => !!v || 'Table num is required']"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions class="justify-center">
          <!-- <v-spacer></v-spacer> -->
          <v-btn
            color="rgb(72, 101, 22)"
            variant="text"
            @click="tableStore.dialogM = false"
          >
            ปิด
          </v-btn>
          <v-btn
            color="rgb(72, 101, 22)"
            variant="text"
            @click="
              tableStore.movedTable(tableStore.editedTableMgmt, goalTable),
                onClear()
            "
          >
            ยืนยัน
          </v-btn>
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
}
.vText {
  font-family: Andale Mono, monospace;
  color: rgb(173, 84, 54);
}
</style>
