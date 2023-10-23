<script setup lang="ts">
import { ref } from "vue";
import { useVarCompnStore } from "@/stores/var-compn";
import { useMaterialStore } from "@/stores/materials";

const varcpStore = useVarCompnStore();
const materialStore = useMaterialStore();

// onMounted(async () => {
//   await materialStore.getNearly();
// });

const dialog = ref(false);
let onOk: (value: unknown) => void;
let onCancel: (reason?: any) => void;

const openDialog = async () => {
  await materialStore.getNearly();
  dialog.value = true;
  return new Promise((resolve, reject) => {
    onOk = resolve;
    onCancel = reject;
  });
};
defineExpose({ openDialog });
function cancelFunc() {
  dialog.value = false;
  // materialStore.getNearly()
  onCancel("Cancel");
}
// function OkFunc() {
//   dialog.value = false;
//   onOk("OK");
// }

function show() {
  dialog.value = false;
}
</script>

<template>
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
          Nearly out of Material
        </v-card-title>
        <v-card-text>
          <v-container style="background-color: rgb(80, 50, 0)">
            <v-row>
              <v-col>
                <v-table
                  :style="varcpStore.styleTable"
                  fixed-header
                  height="65vh"
                >
                  <thead>
                    <tr>
                      <th :style="varcpStore.styleTableTh">ID</th>
                      <th :style="varcpStore.styleTableTh">Name</th>
                      <th :style="varcpStore.styleTableTh">Min Quantity</th>
                      <th :style="varcpStore.styleTableTh">Quantity</th>
                      <th :style="varcpStore.styleTableTh">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item of materialStore.nearly" :key="item.id">
                      <td style="font-size: 2.2vh">
                        {{ item.id }}
                      </td>
                      <td style="font-size: 2.2vh">
                        {{ item.name }}
                      </td>
                      <td style="font-size: 2.2vh">
                        {{ item.min_quantity }}
                      </td>
                      <td style="font-size: 2.2vh">
                        {{ item.quantity }}
                      </td>
                      <td style="font-size: 2.2vh">
                        {{ item.unit }}
                      </td>
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
          <v-btn variant="text" @click="show()"> [Print Check List] </v-btn>
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
