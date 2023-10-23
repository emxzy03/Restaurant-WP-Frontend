<script setup lang="ts">
import { useCategoryStore } from "@/stores/category";
import { useMenuStore } from "@/stores/menu";
import { mdiCamera } from "@mdi/js";
import { onMounted, ref } from "vue";
import { VForm } from "vuetify/components";

const menuStore = useMenuStore();
const categoryStore = useCategoryStore();
const form = ref<VForm | null>(null);
async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    await menuStore.saveMenu();
  }
}
onMounted(async () => {
  await categoryStore.getCategories();
});
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="menuStore.dialog" persistent width="1024">
      <v-card
        style="
          color: rgb(86, 46, 8);
          background-color: rgb(243, 242, 223);
          font-family: Andale Mono, monospace;
        "
      >
        <v-card-title style="font-weight: bold; font-size: 4vh">
          Menu
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Name*"
                    required
                    v-model="menuStore.editedMenu.name"
                    :rules="[(v) => !!v || 'Name is required']"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Price*"
                    required
                    v-model.number="menuStore.editedMenu.price"
                    :rules="[
                      (v) =>
                        parseInt(v) >= 1 ||
                        'Price is number and must more than or equal to 1',
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-select
                    label="Select Status*"
                    :items="['ready', 'unready']"
                    required
                    v-model="menuStore.editedMenu.status"
                    :rules="[(v) => !!v || 'Status is required']"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select
                    label="Select Category*"
                    :items="categoryStore.listCategories"
                    required
                    v-model="menuStore.editedMenu.categoryName"
                    :rules="[(v) => !!v || 'Category is required']"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    chips
                    v-model="menuStore.editedMenu.files"
                    accept="image/*"
                    label="Image Input (if any)"
                    :prepend-icon="mdiCamera"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <small style="font-weight: bold">*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="menuStore.dialog = false">
            Close
          </v-btn>
          <v-btn variant="text" @click="save()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
