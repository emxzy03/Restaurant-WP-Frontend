<script setup lang="ts">
import { useCheckMaterialStore } from "@/stores/check-materials";
import CheckDetails from "./CheckDetails.vue";
import { onMounted, ref } from "vue";
import {
  mdiPencil,
  mdiDelete,
  mdiReceiptTextPlus,
  mdiDotsHorizontalCircle,
} from "@mdi/js";
import { useVarCompnStore } from "@/stores/var-compn";
import CheckMatDialog from "./CheckMatDialog.vue";
import { useMaterialStore } from "@/stores/materials";
import AutoCompleteFind from "@/components/AutoCompleteFind.vue";
const checkMatStore = useCheckMaterialStore();
const varcpStore = useVarCompnStore();
const detailDialog = ref();
const matStore = useMaterialStore();

onMounted(async () => {
  await checkMatStore.getCheckMaterials();
});

const viewDetails = async (id: number) => {
  try {
    await detailDialog.value.openDialog(id);
  } catch (e) {
    console.log(e);
  }
};

const addNew = async () => {
  await matStore.getMaterials();
  await checkMatStore.setCheckMatd(matStore.materials);
  checkMatStore.dialog = true;
};
</script>

<template>
  <!-- <div>CheckMaterial</div>
  <div>{{ checkMatStore.checkMaterials }}</div> -->
  <CheckMatDialog></CheckMatDialog>
  <v-container>
    <v-row>
      <v-col cols="6" offset="1">
        <AutoCompleteFind
          label="Search Check Material"
          :nameLists="checkMatStore.nameCheckMaterial()"
        ></AutoCompleteFind
      ></v-col>
      <v-col cols="2" offset="2">
        <v-btn
          :prepend-icon="mdiReceiptTextPlus"
          class="ma-1 vBtnCard button-3d styleBtnBrown fontBtn"
          @click="addNew()"
          >Add New</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-container style="background-color: rgb(80, 50, 0)">
          <v-table :style="varcpStore.styleTable" fixed-header height="70vh">
            <thead>
              <tr>
                <th :style="varcpStore.styleTableTh">ID</th>
                <th :style="varcpStore.styleTableTh">Date</th>
                <th :style="varcpStore.styleTableTh">Emp ID</th>
                <th :style="varcpStore.styleTableTh">Operation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item of checkMatStore.checkMaterials" :key="item.id">
                <td
                  v-if="
                    varcpStore.valuesMatAutocom ==
                      item.date?.toString().substring(0, 10) ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.id }}
                </td>
                <td
                  v-if="
                    varcpStore.valuesMatAutocom ==
                      item.date?.toString().substring(0, 10) ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.date?.toString().substring(0, 10) }} |
                  {{
                    item.date
                      ?.toString()
                      .substring(11, item.date?.toString().length - 5)
                  }}
                </td>
                <td
                  v-if="
                    varcpStore.valuesMatAutocom ==
                      item.date?.toString().substring(0, 10) ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.employee?.id }}
                </td>
                <td
                  v-if="
                    varcpStore.valuesMatAutocom ==
                      item.date?.toString().substring(0, 10) ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  <v-btn
                    :icon="mdiDotsHorizontalCircle"
                    class="mx-1 ma-1 vBtnCard button-3d styleBtnGreen"
                    @click="viewDetails(item.id!)"
                  ></v-btn>
                  <v-btn
                    :prepend-icon="mdiPencil"
                    class="ma-1 vBtnCard button-3d styleBtnOrange fontBtn"
                    @click="checkMatStore.editCheckMaterial(item)"
                    >Edit</v-btn
                  >
                  <v-btn
                    :prepend-icon="mdiDelete"
                    class="vBtnCard button-3d styleBtnRed fontBtn"
                    @click="checkMatStore.deleteCheck(item.id!)"
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
  <CheckDetails ref="detailDialog"></CheckDetails>
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

<!--  <v-row>
      <v-col cols="12">
        <v-container style="background-color: rgb(80, 50, 0)">
          <v-expansion-panels>
            <v-expansion-panel
              hide-actions
              readonly
              style="
                font-size: 5vh;
                background-color: rgb(233, 232, 213);
                color: rgb(86, 46, 8);
                font-family: Andale Mono, monospace;
                font-weight: bold;
              "
            >
              <v-expansion-panel-title>
                <v-row no-gutters>
                  <v-col cols="1" class="d-flex justify-start">
                    Check No.
                  </v-col>
                  <v-col>Shop Name</v-col>
                  <v-col cols="1">Total</v-col>
                  <v-col cols="1">Pay</v-col>
                  <v-col cols="1">Change</v-col>
                  <v-col>Date</v-col>
                  <v-col cols="1">EmpId</v-col>
                  <v-col> Number of Lists </v-col>
                  <v-col> Operations </v-col>
                </v-row>
              </v-expansion-panel-title>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
        <v-container
          style="background-color: rgb(80, 50, 0); height: 60vh; overflow: auto"
        >
          <v-expansion-panels>
             v-expansion-panels v-model="selects" 
            <v-expansion-panel
              v-for="item of checkMatStore.checkMaterials"
              :key="item.id"
              @click="showList(item.id!)"
              :style="varcpStore.styleTable"
            >
              <v-expansion-panel-title v-slot="{ open }">
                <v-row no-gutters>
                  <v-col cols="1" class="d-flex justify-center">
                    {{ item.id }}
                  </v-col>
                  <v-col>{{ item.shop_name }}</v-col>
                  <v-col cols="1">{{ item.total }}</v-col>
                  <v-col cols="1">{{ item.buy }}</v-col>
                  <v-col cols="1">{{ item.change }}</v-col>
                  <v-col>{{ item.date }}</v-col>
                  <v-col cols="1" class="text-center">{{ item.emp_id }}</v-col>
                  <v-col class="text--secondary text-center">
                    <v-fade-transition leave-absolute>
                      <span v-if="open" key="0"> Check Detail</span>
                      <span v-else key="1">
                        <v-chip :color="getColor(item.checkItems.length)" dark>
                          {{ item.checkItems.length }}
                        </v-chip>
                      </span>
                    </v-fade-transition>
                  </v-col>
                  <v-col>
                    <v-btn
                      :icon="mdiPencil"
                      style="
                        color: rgb(243, 245, 235);
                        background-color: rgb(173, 84, 54);
                      "
                      class="mr-3 vBtnCard button-3d"
                    ></v-btn>
                    <v-btn
                      :icon="mdiDelete"
                      style="
                        color: rgb(243, 245, 235);
                        background-color: rgb(146, 16, 16);
                      "
                      class="vBtnCard button-3d"
                    ></v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <CheckDetails></CheckDetails>

                 <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="text" color="secondary"> Cancel </v-btn>
                <v-btn variant="text" color="primary"> Save </v-btn>
              </v-card-actions> 
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
      </v-col>
    </v-row> -->
