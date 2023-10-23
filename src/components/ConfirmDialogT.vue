<script lang="ts" setup>
import { ref } from "vue";

const dialog = ref(false);
const title = ref("Title");
const desc = ref("Desc");
const ok = ref("OK");
const cancel = ref("Cancel");
let onOk: (value: unknown) => void;
let onCancel: (reason?: any) => void;
const openDialog = (
  titleStr: string,
  descStr: string,
  okStr: string = "OK",
  cancelStr: string = "Cancel"
) => {
  title.value = titleStr;
  desc.value = descStr;
  ok.value = okStr;
  cancel.value = cancelStr;
  dialog.value = true;
  return new Promise((resolve, reject) => {
    onOk = resolve;
    onCancel = reject;
  });
};
defineExpose({ openDialog });
function cancelFunc() {
  dialog.value = false;
  onCancel("Cancel");
}
function OkFunc() {
  dialog.value = false;
  onOk("OK");
}
</script>
<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="auto">
      <v-card>
        <v-card-title class="text-h5 vHeadText">
          {{ title }}
        </v-card-title>
        <v-card-text class="text-h6 vText">{{ desc }}</v-card-text>
        <v-card-actions class="justify-center">
          <!-- <v-spacer></v-spacer> -->
          <v-btn color="rgb(72, 101, 22)" variant="text" @click="cancelFunc">
            {{ cancel }}
          </v-btn>
          <v-btn color="rgb(72, 101, 22)" variant="text" @click="OkFunc">
            {{ ok }}
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
  color: black;
  font-family: Andale Mono, monospace;
}
</style>
