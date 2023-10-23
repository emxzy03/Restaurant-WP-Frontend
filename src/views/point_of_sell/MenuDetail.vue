<script lang="ts" setup>
import { useSellStore } from "@/stores/sell";
import { ref } from "vue";

const sellStore = useSellStore();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const total = ref(0);

const increase = () => {
  sellStore.menuDetail.quantity!++;
};

const decrease = () => {
  if (sellStore.menuDetail.quantity! > 1) {
    sellStore.menuDetail.quantity!--;
  }
};

const closeMenuDetail = () => {
  sellStore.dialog = false;
};

const saveMenuDetail = () => {
  total.value = sellStore.menuDetail.price * sellStore.menuDetail.quantity!;
  sellStore.menuDetail.total = total.value;
  sellStore.saveMenuDetail(sellStore.menuDetail);
  total.value = 0;
  sellStore.dialog = false;
};
</script>
<template>
  <v-row justify="center">
    <v-dialog v-model="sellStore.dialog" persistent width="500">
      <v-card
        style="
          color: rgb(86, 46, 8);
          background-color: rgb(243, 242, 223);
          font-family: Andale Mono, monospace;
        "
      >
        <v-card-title
          style="font-weight: bold; font-size: 4vh"
          class="text-center"
        >
          {{ sellStore.menuDetail?.name }}
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-img
                  :src="`${backendUrl}/menus/image/${sellStore.menuDetail!.image}`"
                  height="200px"
                ></v-img>
              </v-col>
              <v-col
                cols="12"
                class="text-center"
                style="font-weight: bold; font-size: 2vh"
              >
                {{ sellStore.menuDetail.price }} บาท
              </v-col>
              <v-col cols="4" class="text-center">
                <v-btn color="error" height="6vh" @click="decrease()">-</v-btn>
              </v-col>
              <v-col cols="4 " class="text-center">
                <v-text-field
                  variant="outlined"
                  v-model="sellStore.menuDetail.quantity"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="text-center">
                <v-btn color="success" height="6vh" @click="increase()"
                  >+</v-btn
                >
              </v-col>
              <v-col cols="12">
                <v-text-field
                  placeholder="หมายเหตุ(ถ้ามี)"
                  variant="outlined"
                  v-model="sellStore.menuDetail.note"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="closeMenuDetail()">
            ยกเลิก
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" variant="text" @click="saveMenuDetail()">
            เพิ่ม </v-btn
          ><v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
