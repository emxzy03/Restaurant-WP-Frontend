<script setup lang="ts">
import { mdiArrowLeftCircle, mdiReceiptText } from "@mdi/js";
import { useSellStore } from "@/stores/sell";
import { useMenuQueueStore } from "@/stores/menu-queues";
import { onMounted } from "vue";
import { useReceiptStore } from "@/stores/receipt";
import BillDetail from "./BillDetail.vue";
const sellStore = useSellStore();
const receiptStore = useReceiptStore();

const menuQueueStore = useMenuQueueStore();

const checkReceiptDetail = () => {
  if (receiptStore.receiptsAt?.receiptDetail! != undefined) {
    if (receiptStore.receiptsAt?.receiptDetail?.length! > 0) {
      return true;
    }
  }
  return false;
};

onMounted(async () => {
  await menuQueueStore.getMenuQueues();
  await receiptStore.getOneReceiptsByUUid(sellStore.getReceiptUuid());
});
</script>

<template>
  <BillDetail></BillDetail>
  <v-container>
    <v-row>
      <v-col>
        <v-toolbar density="compact" :elevation="4">
          <v-btn
            :icon="mdiArrowLeftCircle"
            @click="sellStore.isOrder = false"
          ></v-btn>
          <v-toolbar-title class="text-center">
            รายการอาหารของคุณ (โต๊ะ {{ receiptStore.receiptsAt?.table?.id! }})
          </v-toolbar-title>

          <v-btn icon @click="sellStore.billDialog = true">
            <v-icon>{{ mdiReceiptText }}</v-icon>
          </v-btn>
        </v-toolbar>
      </v-col>
    </v-row>

    <v-container>
      <v-table style="margin: 10px 0px 5px 0px" class="elevation-2">
        <thead>
          <tr>
            <th class="text-left" style="width: 33%">รายการ</th>
            <th class="text-left" style="width: 33%">สถานะ</th>
            <th class="text-left" style="width: 33%">หมายเหตุ</th>
          </tr>
        </thead>
      </v-table>

      <v-table style="max-height: 70vh; overflow-y: auto">
        <tbody>
          <template v-if="checkReceiptDetail()">
            <template v-for="item in menuQueueStore.menuQueues" :key="item.id">
              <tr v-if="item.receipt?.id == receiptStore.receiptsAt!.id">
                <td style="width: 33%">{{ item.name }}</td>
                <td style="width: 33%">{{ item.status }}</td>
                <td style="width: 33%">{{ item.note }}</td>
              </tr>
            </template>
          </template>
          <template v-else>
            <tr>
              <td colspan="4" class="text-center" style="color: grey">
                ยังไม่มีรายการอาหาร
              </td>
            </tr>
          </template>
        </tbody>
      </v-table>
    </v-container>
  </v-container>
</template>

<style scope></style>
