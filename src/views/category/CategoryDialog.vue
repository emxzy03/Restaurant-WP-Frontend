<script setup lang="ts">
import { useCategoryStore } from "@/stores/category";
import { useMaterialStore } from "@/stores/materials";
import { ref } from "vue";
import { VForm } from "vuetify/components";

const categoryStore = useCategoryStore();
const form = ref<VForm | null>(null);
async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    await categoryStore.saveCategory();
  }
}
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="categoryStore.dialog" persistent width="1024">
      <v-card
        style="
          color: rgb(86, 46, 8);
          background-color: rgb(243, 242, 223);
          font-family: Andale Mono, monospace;
        "
      >
        <v-card-title style="font-weight: bold; font-size: 4vh">
          Category
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Name*"
                    required
                    v-model="categoryStore.editedCategory.name"
                    :rules="[(v) => !!v || 'Item is required']"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <small style="font-weight: bold">*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="categoryStore.dialog = false">
            Close
          </v-btn>
          <v-btn variant="text" @click="save()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
