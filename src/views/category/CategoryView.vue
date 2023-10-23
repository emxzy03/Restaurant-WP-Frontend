<script setup lang="ts">
import { useCategoryStore } from "@/stores/category";
import { onMounted } from "vue";
import CategoryDialog from "./CategoryDialog.vue";
import { mdiPencil, mdiDelete, mdiPackageVariantClosedPlus } from "@mdi/js";
import { useVarCompnStore } from "@/stores/var-compn";

const categoryStore = useCategoryStore();
onMounted(async () => {
  await categoryStore.getCategories();
});
const varcpStore = useVarCompnStore();
</script>

<template>
  <CategoryDialog></CategoryDialog>
  <v-container>
    <v-row>
      <v-col cols="2" offset="8">
        <v-btn
          :prepend-icon="mdiPackageVariantClosedPlus"
          class="ma-3 vBtnCard button-3d styleBtnBrown fontBtn"
          @click="categoryStore.dialog = true"
          >Add New</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-container style="background-color: rgb(80, 50, 0)">
          <v-table :style="varcpStore.styleTable" fixed-header height="70vh">
            <thead>
              <tr>
                <th :style="varcpStore.styleTableTh">ID</th>
                <th :style="varcpStore.styleTableTh">Name</th>
                <th :style="varcpStore.styleTableTh">Operations</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item of categoryStore.categories" :key="item.id">
                <td style="font-size: 2.2vh">
                  {{ item.id }}
                </td>
                <td style="font-size: 2.2vh">
                  {{ item.name }}
                </td>

                <td>
                  <v-btn
                    :prepend-icon="mdiPencil"
                    class="mr-3 ma-2 vBtnCard button-3d styleBtnOrange fontBtn"
                    @click="categoryStore.editCategory(item)"
                    >Edit</v-btn
                  >
                  <v-btn
                    :prepend-icon="mdiDelete"
                    style="
                      color: rgb(243, 245, 235);
                      background-color: rgb(146, 16, 16);
                    "
                    class="vBtnCard button-3d styleBtnRed fontBtn"
                    @click="categoryStore.deleteCategory(item.id!)"
                    >Delete</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
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
