<script setup lang="ts">
import { onMounted, ref } from "vue";
import { mdiCookieClock, mdiAlarmCheck, mdiDelete } from "@mdi/js"; //mdiEyeSettings mdiTimerSand mdiCheckBold
// import { useMenuStore } from "@/stores/menu";
// import { useRecieptDetailStore } from "@/stores/reciept_detail";
// const menuStore = useMenuStore();
// const recieptDetailStore = useRecieptDetailStore();
import ConfirmDialogT from "@/components/ConfirmDialogT.vue";
import { useCookingStore } from "@/stores/cooking";
import { useVarCompnStore } from "@/stores/var-compn";
import { useMenuQueueStore } from "@/stores/menu-queues";
import { useLoginStore } from "@/stores/login";
import type MenuQueue from "@/types/MenuQueue";
import { useCategoryStore } from "@/stores/category";

const cookingStore = useCookingStore();
const varcpStore = useVarCompnStore();
const menuQueueStore = useMenuQueueStore();
const loginStore = useLoginStore();
const confirmDlg = ref();

onMounted(async () => {
  await loginStore.loadData();
  await categoryStore.getCategories();
  console.log(menuQueueStore.select);
  if (loginStore.userRoleNow == "chef_pfried") {
    menuQueueStore.select = 1;
  } else if (loginStore.userRoleNow == "chef_stbaked") {
    menuQueueStore.select = 2;
  } else if (loginStore.userRoleNow == "chef_roastb") {
    menuQueueStore.select = 3;
  } else if (loginStore.userRoleNow == "chef_cboiled") {
    menuQueueStore.select = 4;
  } else if (loginStore.userRoleNow == "chef_noodles") {
    menuQueueStore.select = 5;
  } else if (loginStore.userRoleNow == "chef_dessert") {
    menuQueueStore.select = 6;
  } else {
    menuQueueStore.select = undefined;
  }
  await menuQueueStore.getMenuQueues();
  // await menuQueueStore.getByCateDo(menuQueueStore.select);
  // await menuQueueStore.getByCateW(menuQueueStore.select);
});

// let queue = 0;
const categoryStore = useCategoryStore();
// const categories = [
//   "ทั้งหมด",
//   "เมนูผัด-ทอด",
//   "เมนูอบ-นึ่ง",
//   "เมนูเผา-ย่าง ",
//   "เมนูแกง-ต้ม ",
//   "เมนูเส้น ",
//   "เมนูขนมหวาน",
// ];
// cookingStore.cate("");
const selects = ref(); //ref("");
const showList = async () => {
  // queue = 0;
  // cookingStore.cate(menuQueueStore.select);
  console.log(menuQueueStore.select);
  await menuQueueStore.getByCateDo(menuQueueStore.select);
  await menuQueueStore.getByCateW(menuQueueStore.select);
};

const updateStsMenuQ = async (menuQ: MenuQueue, status: string) => {
  try {
    await confirmDlg.value.openDialog(
      "Please Confirm",
      `คุณต้องการยืนยันการทำรายการนี้ว่า ${status} หรือไม่`
    );
    await menuQueueStore.updateStsMenuQ(menuQ, status);
  } catch (e) {
    console.log(e);
  }
};

const cancelMenuQ = async (menuQ: MenuQueue) => {
  try {
    await confirmDlg.value.openDialog(
      "Please Confirm",
      `คุณต้องการยกเลิกรายการนี้หรือไม่`
    );
    await menuQueueStore.updateStsMenuQ(menuQ);
    await menuQueueStore.cancelMenuQueue(menuQ);
  } catch (e) {
    console.log(e);
  }
};

// const itemsQueue = (id: number): number => {
//   return cookingStore.queueItems(id);
// };

// const deleteItem = (id: number, select: string) => {
//   return cookingStore.deleteItem(id, select);
// };
</script>

<template>
  <v-container>
    <!-- {{ selects }} -->
    <v-row>
      <v-col cols="5" offset="7">
        <v-select
          v-model="menuQueueStore.select"
          :items="categoryStore.categories"
          item-title="name"
          item-value="id"
          label="Category"
          style="color: rgb(86, 46, 0)"
          dense
          solo
          @update:model-value="showList"
        ></v-select>
        <!-- :hint="`${select}`" -->
        <!-- <span>Selected: {{ selects }}</span> -->
      </v-col>
    </v-row>
    <v-row>
      <v-container style="background-color: rgb(80, 50, 0)">
        <v-row>
          <div :style="varcpStore.styleHeadC">Now:</div>
        </v-row>
        <v-row>
          <!-- <v-container> -->
          <!-- background-color: rgb(80, 50, 0) style="height: 58vh; overflow: auto"-->
          <v-col cols="12">
            <v-table :style="varcpStore.styleTable" fixed-header height="170px">
              <thead>
                <tr>
                  <th :style="varcpStore.styleTableTh">Queue</th>
                  <th :style="varcpStore.styleTableTh" class="text-center">
                    Table No.
                  </th>
                  <th :style="varcpStore.styleTableTh">Menu Name</th>
                  <th :style="varcpStore.styleTableTh">Note</th>
                  <th :style="varcpStore.styleTableTh">Time Update</th>
                  <th :style="varcpStore.styleTableTh">Status</th>
                  <th :style="varcpStore.styleTableTh">Operations</th>
                </tr>
              </thead>
              <!-- <tbody v-for="item of cookingStore.cookingListc" :key="item.menuName">
            <tr v-for="i of item.quantity" :key="i"> -->

              <tbody>
                <!-- <tr v-for="item of cookingStore.cookingListc" :key="item.id"> -->
                <tr v-for="(item, i) of menuQueueStore.menuQueuesDo" :key="i">
                  <!-- <template
                    v-if="
                      item.menu!.category?.id != 7 &&
                      item.status == 'กำลังทำ' &&
                      (selects == item.menu!.category?.id ||
                        selects == undefined)
                    "
                  > -->
                  <td style="font-size: 2.2vh">
                    {{ i + 1 }}
                    <!-- {{ itemsQueue(item.id!) }} -->
                  </td>
                  <!-- <td style="font-size: 2.2vh">[...]</td> -->
                  <td style="font-size: 2.2vh" class="text-center">
                    {{ item.receipt!.table!.num }}
                  </td>
                  <td style="font-size: 2.2vh">
                    {{ item.name }}
                  </td>
                  <td style="font-size: 2.2vh">
                    {{ item.note }}
                  </td>
                  <td style="font-size: 2.2vh">
                    {{ item.updatedAt?.toString().substring(0, 10) }} |
                    {{
                      item.updatedAt
                        ?.toString()
                        .substring(11, item.updatedAt?.toString().length - 5)
                    }}
                  </td>
                  <td style="font-size: 2.2vh">{{ item.status }}</td>
                  <td>
                    <!-- <v-btn
                        :icon="mdiCookieClock"
                        :style="varcpStore.styleBtnOrange"
                        class="mx-3 ma-1 vBtnCard button-3d"
                        @click="updateStsMenuQ(item, 'กำลังทำ')"
                      ></v-btn> -->
                    <v-btn
                      :icon="mdiAlarmCheck"
                      :style="varcpStore.styleBtnGreen"
                      class="mx-3 ma-1 vBtnCard button-3d"
                      @click="updateStsMenuQ(item, 'รอเสิร์ฟ')"
                    ></v-btn>
                    <v-btn
                      :icon="mdiDelete"
                      :style="varcpStore.styleBtnRed"
                      class="mx-3 ma-1 vBtnCard button-3d"
                      @click="cancelMenuQ(item)"
                    ></v-btn>
                    <!-- @click="deleteItem(item.id, selects)" -->
                  </td>
                  <!-- </template> -->
                </tr>
              </tbody>
            </v-table>
          </v-col>
          <!-- </v-container> -->
        </v-row>
        <v-row>
          <div :style="varcpStore.styleHeadC">Queue:</div>
        </v-row>
        <v-row>
          <!-- <v-container> -->
          <!-- background-color: rgb(80, 50, 0) style="height: 58vh; overflow: auto"-->
          <v-col cols="12">
            <v-table :style="varcpStore.styleTable" fixed-header height="400px">
              <thead>
                <tr>
                  <th :style="varcpStore.styleTableTh">Queue</th>
                  <th :style="varcpStore.styleTableTh" class="text-center">
                    Table No.
                  </th>
                  <th :style="varcpStore.styleTableTh">Menu Name</th>
                  <th :style="varcpStore.styleTableTh">Note</th>
                  <th :style="varcpStore.styleTableTh">Time Update</th>
                  <th :style="varcpStore.styleTableTh">Status</th>
                  <th :style="varcpStore.styleTableTh">Operations</th>
                </tr>
              </thead>
              <!-- <tbody v-for="item of cookingStore.cookingListc" :key="item.menuName">
            <tr v-for="i of item.quantity" :key="i"> -->

              <tbody>
                <!-- <tr v-for="item of cookingStore.cookingListc" :key="item.id"> -->
                <tr v-for="(item, i) of menuQueueStore.menuQueuesW" :key="i">
                  <!-- <template
                    v-if="
                      item.menu!.category?.id != 7 &&
                      item.status == 'รอทำ' &&
                      (selects == item.menu!.category?.id ||
                        selects == undefined)
                    "
                  > -->
                  <td style="font-size: 2.2vh">
                    {{ i + 1 }}
                    <!-- {{ itemsQueue(item.id!) }} -->
                  </td>
                  <!-- <td style="font-size: 2.2vh">[...]</td> -->
                  <td style="font-size: 2.2vh" class="text-center">
                    {{ item.receipt!.table!.num }}
                  </td>
                  <td style="font-size: 2.2vh">
                    {{ item.name }}
                  </td>
                  <td style="font-size: 2.2vh">
                    {{ item.note }}
                  </td>
                  <td style="font-size: 2.2vh">
                    {{ item.updatedAt?.toString().substring(0, 10) }} |
                    {{
                      item.updatedAt
                        ?.toString()
                        .substring(11, item.updatedAt?.toString().length - 5)
                    }}
                  </td>
                  <td style="font-size: 2.2vh">{{ item.status }}</td>
                  <td>
                    <v-btn
                      :icon="mdiCookieClock"
                      :style="varcpStore.styleBtnOrange"
                      class="mx-3 ma-1 vBtnCard button-3d"
                      @click="updateStsMenuQ(item, 'กำลังทำ')"
                    ></v-btn>
                    <!-- <v-btn
                        :icon="mdiAlarmCheck"
                        :style="varcpStore.styleBtnGreen"
                        class="mx-3 ma-1 vBtnCard button-3d"
                        @click="updateStsMenuQ(item, 'รอเสิร์ฟ')"
                      ></v-btn> -->
                    <v-btn
                      :icon="mdiDelete"
                      :style="varcpStore.styleBtnRed"
                      class="mx-3 ma-1 vBtnCard button-3d"
                      @click="cancelMenuQ(item)"
                    ></v-btn>
                    <!-- @click="deleteItem(item.id, selects)" -->
                  </td>
                  <!-- </template> -->
                </tr>
              </tbody>
            </v-table>
          </v-col>
          <!-- </v-container> -->
        </v-row>
      </v-container>
    </v-row>
  </v-container>
  <ConfirmDialogT ref="confirmDlg"></ConfirmDialogT>
</template>

<style scoped>
.button-3d {
  position: relative;
  width: auto;
  /* display: inline-block; */
  /* color: #c4c4c4; */
  text-decoration: none;
  border-radius: 5em;
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
</style>
