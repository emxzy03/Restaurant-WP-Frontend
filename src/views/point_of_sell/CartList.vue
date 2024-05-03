<script setup lang="ts">
import { mdiFood, mdiCart, mdiClose } from "@mdi/js";
import { useSellStore } from "@/stores/sell";
import { useReceiptStore } from "@/stores/receipt";
import { onMounted, watch } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { useLoadingStore } from "@/stores/loading";

const loadingStore = useLoadingStore();

const sellStore = useSellStore();
const receiptStore = useReceiptStore();
const route = useRoute();
const isTableId = ref<number>(-1);
const dataUpdate = ref<boolean>(false);
// const cartDetail = ref([]);
const sumTotalPrice = () => {
  let sum = 0;
  sellStore.cartDetail.forEach((element) => {
    sum += element.total!;
  });
  return sum;
};
const sumCartQty = () => {
  let sum = 0;
  sellStore.cartDetail.forEach((element) => {
    sum += element.quantity!;
  });
  return sum;
};

const confirmOrder = async (tableId: number) => {
  loadingStore.isLoading = true;
  await sellStore.confirm(tableId);
  dataUpdate.value = true;
  // location.reload();
  loadingStore.isLoading = false;
};
// watch(
//   () => sellStore.cartDetail,
//   (newCartDetail) => {
//     cartDetail.value = [...newCartDetail];
//   }
// );

onMounted(async () => {
  isTableId.value = parseInt(route.query.table as string) || -1;
  await receiptStore.getOneReceiptsByUUid(sellStore.getReceiptUuid());
  await sellStore.checkReceiptDetail();
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-toolbar density="compact" :elevation="4">
          <v-toolbar-title class="text-center">
            รายการอาหารที่เลือก (โต๊ะ {{ receiptStore.receiptsAt?.table?.id! }})
          </v-toolbar-title>

          <v-btn icon @click="sellStore.isOrder = true">
            <v-badge :color="sellStore.colorStatus" dot floating>
              <v-icon>{{ mdiFood }}</v-icon>
            </v-badge>
          </v-btn>
        </v-toolbar>
      </v-col>
    </v-row>

    <v-container style="height: 62vh">
      <v-table style="margin: 10px 0px 5px 0px" class="elevation-2">
        <thead>
          <tr>
            <th class="text-left" style="width: 25%">รายการ</th>
            <th class="text-left" style="width: 20%">จำนวน</th>
            <th class="text-left" style="width: 20%">ราคา(บาท)</th>
            <th class="text-left" style="width: 30%">หมายเหตุ(ถ้ามี)</th>
            <th class="text-left" style="width: 4%"></th>
          </tr>
        </thead>
      </v-table>

      <v-table style="max-height: 55vh; overflow: auto">
        <tbody v-if="sellStore.cartDetail.length > 0 || dataUpdate">
          <template v-for="item in sellStore.cartDetail" :key="item.id">
            <tr>
              <td class="text-left" style="width: 25%">{{ item.name }}</td>
              <td class="text-left" style="width: 20%; padding-left: 3em">
                {{ item.quantity }}
              </td>
              <td class="text-left" style="width: 20%; padding-left: 4em">
                {{ item.total }}
              </td>
              <td class="text-left" style="width: 30%; padding-left: 5em">
                {{ item.note }}
              </td>
              <td style="width: 4%">
                <v-btn
                  class="elevation-0"
                  style="font-size: 20px"
                  @click="sellStore.cancelOneMenu(item)"
                >
                  <v-icon color="error">
                    {{ mdiClose }}
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="4" class="text-center" style="color: grey">
              ยังไม่มีรายการอาหาร
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>

    <v-container>
      <v-table v-if="sellStore.cartDetail.length > 0">
        <thead>
          <tr>
            <th class="text-left" style="width: 42%">รวม</th>
            <th class="text-left" style="width: 48%">
              {{ sumTotalPrice() }}
            </th>
          </tr>
        </thead>
      </v-table>
    </v-container>

    <v-row style="position: absolute; right: 10vw; bottom: 10vh">
      <v-col class="text-right" v-if="sumCartQty() != 0">
        <v-badge color="red" :content="sumCartQty()">
          <v-btn
            color="blue"
            :icon="mdiCart"
            :elevation="8"
            @click="sellStore.isPos = true"
            height="70px"
            width="70px"
          ></v-btn
        ></v-badge>
      </v-col>
      <v-col class="text-right" v-else>
        <v-btn
          color="blue"
          :icon="mdiCart"
          :elevation="8"
          @click="sellStore.isPos = true"
          height="70px"
          width="70px"
        ></v-btn>
      </v-col>
    </v-row>

    <v-row
      class="justify-center"
      v-if="sellStore.cartDetail.length > 0"
      style="position: absolute; left: 12.5vw; right: 12.5vw; bottom: 3vh"
    >
      <v-col class="text-center">
        <v-btn
          color="error"
          class="btnMargin"
          width="200px"
          @click="sellStore.cancelAll()"
          >ยกเลิก</v-btn
        >
      </v-col>
      <v-col class="text-center">
        <v-btn
          color="success"
          class="btnMargin"
          width="200px"
          @click="
            // sellStore.confirm(isTableId);
            confirmOrder(isTableId);
            receiptStore.getOneReceiptsByUUid(sellStore.getReceiptUuid());
          "
          >ยืนยัน</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.btnMargin {
  margin: 1em;
}
</style>
