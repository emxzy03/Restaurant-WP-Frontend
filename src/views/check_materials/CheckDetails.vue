<script setup lang="ts">
import { useCheckMaterialStore } from "@/stores/check-materials";
import { onMounted, ref } from "vue";
import { mdiPencil, mdiDelete, mdiPlaylistPlus } from "@mdi/js";
import { useVarCompnStore } from "@/stores/var-compn";
// import CheckDetailDialog from "./CheckDetailDialog.vue";

const checkMatStore = useCheckMaterialStore();
const varcpStore = useVarCompnStore();

onMounted(async () => {
  await checkMatStore.getCheckMaterials();
});

const dialog = ref(false);
const checkID = ref(0);
let onOk: (value: unknown) => void;
let onCancel: (reason?: any) => void;

const openDialog = async (checkIDAt: number) => {
  checkID.value = checkIDAt;
  await checkMatStore.getCheckItemsAt(checkIDAt);
  dialog.value = true;
  return new Promise((resolve, reject) => {
    onOk = resolve;
    onCancel = reject;
  });
};
defineExpose({ openDialog });
function cancelFunc() {
  dialog.value = false;
  checkMatStore.getCheckMaterials();
  onCancel("Cancel");
}
// function OkFunc() {
//   dialog.value = false;
//   onOk("OK");
// }

// function save() {
//   checkMatStore.saveCheckItems(checkID.value);
// }
</script>

<template>
  <!-- <CheckDetailDialog></CheckDetailDialog> -->
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
          Check Detail #{{ checkID }}
        </v-card-title>
        <v-card-text>
          <v-container style="background-color: rgb(80, 50, 0)">
            <!-- <v-row>
              <v-col cols="3" offset="9">
                <v-btn
                  :prepend-icon="mdiPlaylistPlus"
                  class="ma-3 vBtnCard button-3d styleBtnGreen fontBtn"
                  @click="checkMatStore.dialogD = true"
                  >Add New</v-btn
                >
              </v-col> 
            </v-row>-->
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
                      <th :style="varcpStore.styleTableTh">Material Name</th>
                      <th :style="varcpStore.styleTableTh">Last Quantity</th>
                      <th :style="varcpStore.styleTableTh">Now Quantity</th>
                      <!-- <th :style="varcpStore.styleTableTh">Operation</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item of checkMatStore.checkMaterialsAt?.checkItems"
                      :key="item.id"
                    >
                      <td>{{ item.id }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.last_quantity }}</td>
                      <td>{{ item.quantity }}</td>
                      <!-- <td>
                        <v-btn
                          :prepend-icon="mdiPencil"
                          class="mr-3 ma-2 vBtnCard button-3d styleBtnOrange fontBtn"
                          @click="checkMatStore.editCheckItem(item)"
                          >Edit</v-btn
                        >
                        <v-btn
                          :prepend-icon="mdiDelete"
                          class="vBtnCard button-3d styleBtnRed fontBtn"
                          @click="checkMatStore.deleteCheckItem(item.id!)"
                          >Delete</v-btn
                        >
                      </td> -->
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
          <!-- <v-btn variant="text" @click="save()"> Save </v-btn> -->
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
