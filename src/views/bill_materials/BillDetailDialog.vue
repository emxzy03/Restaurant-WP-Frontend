<script setup lang="ts">
import { useBillMaterialStore } from "@/stores/bill-materials";
import { useMaterialStore } from "@/stores/materials";
import { computed, onMounted, ref } from "vue";
import { VForm } from "vuetify/components";

const matStore = useMaterialStore();
const billMatStore = useBillMaterialStore();
const form = ref<VForm | null>(null);
async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    await billMatStore.billMatDetails.push(billMatStore.editedBillItem);
    console.log(billMatStore.billMatDetails);
    billMatStore.dialogD = false;
    billMatStore.saveBillItems(billMatStore.billMaterialsAt?.id!);
  }
}

const ttl = ref(" ");

function updateP() {
  billMatStore.getMatPrice();
  billMatStore.editedBillItem.total = computed(
    () =>
      billMatStore.editedBillItem.quantity * billMatStore.editedBillItem.price
  ).value;
}

onMounted(async () => {
  await matStore.getMaterials();
  await billMatStore.getMatPrice();
  // billMatStore.editedBillItem.total = computed(
  //   () =>
  //     billMatStore.editedBillItem.quantity * billMatStore.editedBillItem.price
  // ).value;
});
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="billMatStore.dialogD" persistent width="1024">
      <v-card
        style="
          color: rgb(86, 46, 8);
          background-color: rgb(243, 242, 223);
          font-family: Andale Mono, monospace;
        "
      >
        <v-card-title style="font-weight: bold; font-size: 4vh">
          Bill Detail (Bill Material #{{ billMatStore.billMaterialsAt?.id }})
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-select
                    label="Select Material*"
                    :items="matStore.materials"
                    item-title="name"
                    item-value="id"
                    required
                    v-model="billMatStore.editedBillItem.materialId"
                    :rules="[(v) => !!v || 'Material is required']"
                    @update:model-value="updateP()"
                  ></v-select>
                  <!-- <pre>{{ billMatStore.editedBillItem.materialId }}</pre> -->
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Quantity*"
                    v-model.number="billMatStore.editedBillItem.quantity"
                    :rules="[
                      (v) =>
                        parseInt(v) >= 1 ||
                        'Quantity is number and must more than or equal to 1',
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Price*"
                    required
                    v-model.number="billMatStore.editedBillItem.price"
                    :rules="[
                      (v) =>
                        parseInt(v) >= 1 ||
                        'Price is number and must more than or equal to 1',
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field label="Total" v-model="ttl">
                    {{
                      billMatStore.editedBillItem.quantity *
                      billMatStore.editedBillItem.price
                    }}
                  </v-text-field>
                  <!-- v-model.number="billMatStore.editedBillItem.total" -->
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <!-- <small style="font-weight: bold"
            >**input quantity before choose material**</small
          > -->
          <br />
          <small style="font-weight: bold">*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="billMatStore.dialogD = false">
            Close
          </v-btn>
          <v-btn variant="text" @click="save()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
