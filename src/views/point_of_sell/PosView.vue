<script setup lang="ts">
import { onMounted, ref } from "vue";
import { mdiMagnify } from "@mdi/js";
import { useSellStore } from "@/stores/sell";
import { useMenuStore } from "@/stores/menu";
import { useCategoryStore } from "@/stores/category";
import MenuDetail from "./MenuDetail.vue";
const sellStore = useSellStore();
const menuStore = useMenuStore();
const categoryStore = useCategoryStore();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const txtSearch = ref("");
const multiply = ref("\u{1F7AB}");

const select = ref("หมวดหมู่");
const searchFood = () => {
  sellStore.textSearch = txtSearch.value;
  txtSearch.value = "";
  select.value = "หมวดหมู่";
};

onMounted(async () => {
  await menuStore.getMenus();
  await categoryStore.getCategories();
});
</script>

<template>
  <MenuDetail></MenuDetail>
  <v-container>
    <v-row class="mt-2">
      <v-col cols="2">
        <v-select
          v-model="select"
          density="comfortable"
          :items="categoryStore.listCategories"
          variant="outlined"
          style="width: 100%"
          @update:model-value="sellStore.textSearch = select"
        >
        </v-select>
      </v-col>

      <v-col cols="10">
        <v-text-field
          density="comfortable"
          variant="solo"
          label="ค้นหาอาหารและเครื่องดื่ม"
          :append-inner-icon="mdiMagnify"
          v-model="txtSearch"
          single-line
          hide-details
          @click:append-inner="searchFood()"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-divider></v-divider>
      <v-container style="height: 65vh; overflow: auto">
        <v-row>
          <template v-for="(item, index) in menuStore.menus" :key="index">
            <v-col
              cols="12"
              md="4"
              v-if="
                sellStore.textSearch == item.category?.name ||
                sellStore.textSearch == 'หมวดหมู่' ||
                item.name.match(sellStore.textSearch)
              "
            >
              <template v-if="item.status == 'ready'">
                <v-card
                  width="20vw"
                  height="200px"
                  @click="
                    sellStore.showMenuDetail(
                      item,
                      sellStore.cartDetail.findIndex(
                        (element) => element.name == item.name
                      )
                    )
                  "
                >
                  <v-img
                    :src="`${backendUrl}/menus/image/${item.image}`"
                    height="100px"
                    style="margin-top: 1em"
                  >
                  </v-img>
                  <template v-if="sellStore.cartDetail.length > 0">
                    <v-card-item
                      class="text-center"
                      v-if="
                        sellStore.cartDetail.findIndex(
                          (element) => element.name == item.name
                        ) != -1
                      "
                    >
                      {{ item.name }} {{ item.price }} บาท
                    </v-card-item>
                    <v-card-text
                      class="text-center"
                      v-if="
                        sellStore.cartDetail.findIndex(
                          (element) => element.name == item.name
                        ) != -1
                      "
                      style="font-size: 1em"
                    >
                      {{ multiply }}
                      {{
                        sellStore.cartDetail[
                          sellStore.cartDetail.findIndex(
                            (element) => element.name == item.name
                          )
                        ].quantity
                      }}
                    </v-card-text>
                    <v-card-item
                      v-else
                      class="text-center"
                      style="margin-top: 1em"
                    >
                      {{ item.name }} {{ item.price }} บาท
                    </v-card-item>
                  </template>
                  <v-card-item
                    v-else
                    class="text-center"
                    style="margin-top: 1em"
                  >
                    {{ item.name }} {{ item.price }} บาท
                  </v-card-item>
                </v-card>
              </template>
              <template v-else>
                <v-btn width="20vw" height="200px" disabled>
                  <v-card width="20vw" height="200px" color="grey">
                    <v-img
                      :src="`${backendUrl}/menus/image/${item.image}`"
                      height="100px"
                      style="margin-top: 1em; margin-bottom: 1em"
                    >
                    </v-img>
                    <v-card-item class="text-center">
                      {{ item.name }} {{ item.price }} บาท
                    </v-card-item>
                    <v-card-text> หมด </v-card-text>
                  </v-card>
                </v-btn>
              </template>
            </v-col>
          </template>
        </v-row>
      </v-container>
      <v-divider></v-divider>
    </v-row>

    <v-row>
      <v-col class="text-center">
        <v-btn
          color="success"
          width="200px"
          height="50px"
          class="text-h6"
          style="margin-top: 1em"
          @click="sellStore.isPos = false"
          >สรุปรายการอาหาร</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<style scope></style>
