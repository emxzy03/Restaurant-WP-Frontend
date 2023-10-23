<script setup lang="ts">
import { useTableMgmtStore } from "@/stores/table-mgmt";
import { ref } from "vue";
import { VForm } from "vuetify/components";

const tableMgmtStore = useTableMgmtStore();
const form = ref<VForm | null>(null);
async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    await tableMgmtStore.saveTableMgmt();
  }
}
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="tableMgmtStore.dialog" persistent width="480">
      <v-card
        style="
          color: rgb(86, 46, 8);
          background-color: rgb(243, 242, 223);
          font-family: Andale Mono, monospace;
        "
      >
        <v-card-title style="font-weight: bold; font-size: 4vh">
          Table Management
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Table Number*"
                    required
                    v-model.number="tableMgmtStore.editedTableMgmt.num"
                    :rules="[
                      (v) =>
                        parseInt(v) >= 1 ||
                        'Min Quantity is number and must more than or equal to 1',
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Seat*"
                    required
                    v-model.number="tableMgmtStore.editedTableMgmt.seat"
                    :rules="[
                      (v) =>
                        parseInt(v) >= 1 ||
                        'Min Quantity is number and must more than or equal to 1',
                    ]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <small style="font-weight: bold">*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="tableMgmtStore.dialog = false">
            Close
          </v-btn>
          <v-btn variant="text" @click="save()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
