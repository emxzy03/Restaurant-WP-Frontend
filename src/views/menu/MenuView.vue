<script setup lang="ts">
import { useMenuStore } from "@/stores/menu";
import { onMounted } from "vue";
import { mdiPencil, mdiDelete, mdiFood } from "@mdi/js";
import AutoCompleteFind from "@/components/AutoCompleteFind.vue";
import { useVarCompnStore } from "@/stores/var-compn";
import MenuDialog from "./MenuDialog.vue";

const menuStore = useMenuStore();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

onMounted(async () => {
  await menuStore.getMenus();
});
const varcpStore = useVarCompnStore();
</script>

<template>
  <MenuDialog></MenuDialog>
  <v-container>
    <v-row>
      <v-col cols="6" offset="1">
        <AutoCompleteFind
          label="Search Menu"
          :nameLists="menuStore.nameMenu()"
        ></AutoCompleteFind>
      </v-col>
      <v-col cols="2" offset="2">
        <v-btn
          :prepend-icon="mdiFood"
          class="ma-3 vBtnCard button-3d styleBtnBrown fontBtn"
          @click="menuStore.dialog = true"
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
                <th :style="varcpStore.styleTableTh">Image</th>
                <th :style="varcpStore.styleTableTh">Name</th>
                <th :style="varcpStore.styleTableTh">Price</th>
                <th :style="varcpStore.styleTableTh">Category</th>
                <th :style="varcpStore.styleTableTh">Status</th>
                <th :style="varcpStore.styleTableTh">Operations</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item of menuStore.menus" :key="item.id">
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
                  <v-img
                    :src="`${backendUrl}/menus/image/${item.image}`"
                    height="64px"
                  ></v-img>
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
                  {{ item.price }}
                </td>
                <td
                  style="font-size: 2.2vh"
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ JSON.parse(JSON.stringify(item.category)).name }}
                </td>
                <td
                  style="font-size: 2.2vh"
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.status }}
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
                    @click="menuStore.editMenu(item)"
                    >Edit</v-btn
                  >
                  <v-btn
                    :prepend-icon="mdiDelete"
                    class="vBtnCard button-3d styleBtnRed fontBtn"
                    @click="menuStore.deleteMenu(item.id!)"
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
  text-decoration: none;
  border-radius: 3em;
  border: solid 1px none;
  background: rgb(80, 50, 0);
  text-align: center;
  padding: 9px 18px 10px;
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
