<script setup lang="ts">
import { useReceiptStore } from "@/stores/receipt";
import { ref } from "vue";
import { VForm } from "vuetify/components";

const receiptStore = useReceiptStore();
const form = ref<VForm | null>(null);
async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    await receiptStore.saveReceipt();
  }
}
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="receiptStore.dialog" persistent width="480">
      <v-card
        style="
          color: rgb(86, 46, 8);
          background-color: rgb(243, 242, 223);
          font-family: Andale Mono, monospace;
        "
      >
        <v-card-title style="font-weight: bold; font-size: 4vh">
          Receipt Management
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="หมายเลขโต๊ะ:"
                    required
                    v-model.number="receiptStore.editedReceipt.table_num"
                    :rules="[]"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="รวมทั้งหมด(บาท):"
                    required
                    v-model.number="receiptStore.editedReceipt.total"
                    :rules="[]"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="ส่วนลด(บาท):"
                    required
                    v-model.number="receiptStore.editedReceipt.discount"
                    :rules="[]"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="ราคาสุทธิ(บาท):"
                    required
                    v-model.number="receiptStore.editedReceipt.subtotal"
                    :rules="[]"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="จ่าย(บาท):"
                    required
                    v-model.number="receiptStore.editedReceipt.received"
                    :rules="[]"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="ทอน(บาท):"
                    required
                    v-model.number="receiptStore.editedReceipt.change"
                    :rules="[]"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                    label="ช่องทางชำระเงิน:"
                    :items="['เงินสด', 'พร้อมเพย์']"
                    v-model="receiptStore.editedReceipt.payment"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-select
                    label="สถานะ:"
                    :items="['รอชำระเงิน', 'ชำระเงินแล้ว']"
                    v-model="receiptStore.editedReceipt.status"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-select
                    label="Empid:"
                    :items="receiptStore.listReceipts"
                    required
                    v-model="receiptStore.editedReceipt.employee!.id"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <small style="font-weight: bold"></small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="receiptStore.dialog = false">
            Close
          </v-btn>
          <v-btn variant="text" @click="save()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
