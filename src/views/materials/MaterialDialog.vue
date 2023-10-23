<script setup lang="ts">
import { useMaterialStore } from "@/stores/materials";
import { ref } from "vue";
import { VForm } from "vuetify/components";

const materialStore = useMaterialStore();
const form = ref<VForm | null>(null);
async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    await materialStore.saveMaterial();
  }
}
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="materialStore.dialog" persistent width="1024">
      <v-card
        style="
          color: rgb(86, 46, 8);
          background-color: rgb(243, 242, 223);
          font-family: Andale Mono, monospace;
        "
      >
        <v-card-title style="font-weight: bold; font-size: 4vh">
          Material
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Name*"
                    required
                    v-model="materialStore.editedMaterial.name"
                    :rules="[(v) => !!v || 'Item is required']"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Min Quantity*"
                    required
                    v-model.number="materialStore.editedMaterial.min_quantity"
                    :rules="[
                      // (v) => !!v || 'Item is required and is number',
                      (v) =>
                        parseInt(v) >= 1 ||
                        'Min Quantity is number and must more than or equal to 1',
                    ]"
                  ></v-text-field>
                  <v-text-field
                    label="Unit*"
                    required
                    v-model="materialStore.editedMaterial.unit"
                    :rules="[(v) => !!v || 'Item is required']"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Quantity*"
                    required
                    v-model.number="materialStore.editedMaterial.quantity"
                    :rules="[
                      // (v) => !!v || 'Item is required and is number',
                      (v) =>
                        parseInt(v) >= 0 ||
                        'Quantity is number and must more than or equal to 0',
                    ]"
                  ></v-text-field>
                  <v-text-field
                    label="Price*"
                    required
                    v-model.number="materialStore.editedMaterial.unit_price"
                    :rules="[
                      // (v) => !!v || 'Item is required and is number',
                      (v) =>
                        parseFloat(v) >= 5 ||
                        'Price is number and must more than 5',
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
          <v-btn variant="text" @click="materialStore.dialog = false">
            Close
          </v-btn>
          <v-btn variant="text" @click="save()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
