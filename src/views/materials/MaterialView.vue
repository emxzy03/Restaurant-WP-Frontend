<script setup lang="ts">
import { useMaterialStore } from "@/stores/materials";
import { onMounted, ref } from "vue";
import MaterialDialog from "./MaterialDialog.vue";
import {
  mdiPencil,
  mdiDelete,
  mdiPackageVariantClosedPlus,
  mdiMagnify,
} from "@mdi/js";
import AutoCompleteFind from "@/components/AutoCompleteFind.vue";
import { useVarCompnStore } from "@/stores/var-compn";
import MatCheckList from "./MatCheckList.vue";

const materialStore = useMaterialStore();
onMounted(async () => {
  await materialStore.getMaterials();
});
// const values = ref(null);
const varcpStore = useVarCompnStore();
// const values = ref(varcpStore.valuesMatAutocom);

const detailDialog = ref();
const viewDetails = async () => {
  try {
    await detailDialog.value.openDialog();
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <!-- <div>Material</div>
  <div>{{ materialStore.materials }}</div> -->
  <MaterialDialog></MaterialDialog>
  <v-container>
    <v-row>
      <v-col cols="6" offset="1">
        <!-- {{ "s" + varcpStore.valuesMatAutocom }} -->
        <AutoCompleteFind
          label="Search Material"
          :nameLists="materialStore.nameMaterial()"
        ></AutoCompleteFind>
        <!-- <v-autocomplete
          style="
            color: rgb(86, 46, 8);
            background-color: rgb(243, 242, 223);
            font-family: Andale Mono, monospace;
          "
          class="mt-2"
          v-model="values"
          clearable
          color="rgb(80, 50, 0)"
          density="comfortable"
          label="Search Material"
          :append-inner-icon="mdiMagnify"
          single-line
          hide-details
          @click:append-inner="true"
          :items="materialStore.nameMaterial()"
        ></v-autocomplete> -->
      </v-col>
      <v-col cols="2" offset="1">
        <v-btn
          :prepend-icon="mdiMagnify"
          class="ma-3 vBtnCard button-3d styleBtnBrown fontBtn"
          @click="viewDetails()"
          >View Check</v-btn
        >
      </v-col>
      <v-col cols="2">
        <v-btn
          :prepend-icon="mdiPackageVariantClosedPlus"
          class="ma-3 vBtnCard button-3d styleBtnBrown fontBtn"
          @click="materialStore.dialog = true"
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
                <th :style="varcpStore.styleTableTh">Min Quantity</th>
                <th :style="varcpStore.styleTableTh">Quantity</th>
                <th :style="varcpStore.styleTableTh">Unit</th>
                <th :style="varcpStore.styleTableTh">Price</th>
                <th :style="varcpStore.styleTableTh">Operations</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item of materialStore.materials" :key="item.id">
                <td
                  style="font-size: 2.2vh"
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.id }}
                </td>
                <td
                  style="font-size: 2.2vh"
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.name }}
                </td>
                <td
                  style="font-size: 2.2vh"
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.min_quantity }}
                </td>
                <td
                  style="font-size: 2.2vh"
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.quantity }}
                </td>
                <td
                  style="font-size: 2.2vh"
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.unit }}
                </td>
                <td
                  style="font-size: 2.2vh"
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.unit_price }}
                </td>
                <td
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  <v-btn
                    :prepend-icon="mdiPencil"
                    class="mr-3 ma-2 vBtnCard button-3d styleBtnOrange fontBtn"
                    @click="materialStore.editMaterial(item)"
                    >Edit</v-btn
                  >
                  <v-btn
                    :prepend-icon="mdiDelete"
                    class="vBtnCard button-3d styleBtnRed fontBtn"
                    @click="materialStore.deleteMaterial(item.id!)"
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
  <MatCheckList ref="detailDialog"></MatCheckList>
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
