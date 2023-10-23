<script setup lang="ts">
import IncomeExpenseView from "../income_expense/IncomeExpenseView.vue";
import { useIncomeExpenseStore } from "@/stores/income_expense";
import IncomeView from "../income/IncomeView.vue";
import { useIncomeStore } from "@/stores/income";
import ExpenseMView from "../expense_materials/ExpenseMView.vue";
import { useExpenseMaterialsStore } from "@/stores/expense_material";
import { usePayMonthlyStore } from "@/stores/pay_monthly";
import PayMonthlyView from "../pay_monthly/PayMonthlyView.vue";
import PopMenuView from "../pop_menu_report/popMenuView.vue";
import DashboardDialog from "./DashboardDialog.vue";
import { onMounted } from "vue";

const incomeExpenseStore = useIncomeExpenseStore();
const incomeStore = useIncomeStore();
const expenseMStore = useExpenseMaterialsStore();
const sararyEsStore = usePayMonthlyStore();

onMounted(async () => {
  incomeStore.dialog = false;
  incomeExpenseStore.dialog = false;
  expenseMStore.dialog = false;
  sararyEsStore.dialog = false;
});
</script>
<template>
  <DashboardDialog></DashboardDialog>
  <v-container>
    <v-row>
      <v-col cols="6"
        ><v-container>
          <v-card class="mx-auto text-center" max-width="500" color="white">
            <v-card-title
              style="color: rgb(80, 50, 0); font-size: 2.5vh; font-weight: bold"
            >
              ยอดขายรายวัน/เดือน/ปี
            </v-card-title>

            <v-row>
              <v-spacer style="width: 70%"></v-spacer>

              <v-select
                label="Year"
                v-model="incomeStore.year"
                :items="['All Time', 2023, 2022, 2021, 2020]"
                variant="solo"
                dense
                style="
                  width: 30%;
                  font-size: 2px;
                  padding-right: 30px;
                  padding-top: 10px;
                "
                @update:model-value="incomeStore.forceRerender()"
              ></v-select>
            </v-row>
            <v-card-text>
              <v-sheet
                rounded="lg"
                height="250"
                style="
                  border: solid 2px rgb(80, 50, 0);
                  margin: 1px 0px 0px 0px;
                "
                class="text-center"
                @click="incomeStore.dialog = true"
              >
                <IncomeView v-if="incomeStore.renderComponent" />
              </v-sheet>
              <v-range-slider
                v-if="!incomeStore.disabled"
                min="0"
                max="11"
                :step="1"
                show-ticks="always"
                :ticks="incomeStore.month"
                v-model="incomeStore.rangeMonth"
                @update:model-value="incomeStore.forceRerender()"
                color="rgb(80, 50, 0)"
                style="
                  margin: 0px 0px 0px 0px;
                  font-size: 1.5vh;
                  font-weight: bold;
                "
              ></v-range-slider>
            </v-card-text>
          </v-card>
        </v-container>
      </v-col>

      <v-col cols="6"
        ><v-container>
          <v-card class="mx-auto text-center" max-width="500">
            <v-card-title
              style="color: rgb(80, 50, 0); font-size: 2.5vh; font-weight: bold"
            >
              รายงานรายรับรายจ่าย เดือน/ปี
            </v-card-title>
            <v-row>
              <v-spacer style="width: 70%"> </v-spacer>
              <v-select
                label="Year"
                v-model="incomeExpenseStore.year"
                :items="['All Time', 2023, 2022, 2021, 2020]"
                variant="solo"
                dense
                style="
                  width: 30%;
                  font-size: 2px;
                  margin-bottom: 0px;
                  padding-right: 30px;
                  padding-top: 10px;
                "
                @update:model-value="incomeExpenseStore.forceRerender()"
              ></v-select>
            </v-row>
            <v-card-text>
              <v-sheet
                rounded="lg"
                height="250"
                style="
                  border: solid 2px rgb(80, 50, 0);
                  margin: 1px 0px 0px 0px;
                "
                class="text-center"
                @click="incomeExpenseStore.dialog = true"
              >
                <IncomeExpenseView v-if="incomeExpenseStore.renderComponent" />
              </v-sheet>
              <v-range-slider
                v-if="!incomeExpenseStore.disabled"
                min="0"
                max="11"
                :step="1"
                show-ticks="always"
                :ticks="incomeExpenseStore.month"
                v-model="incomeExpenseStore.rangeMonth"
                @update:model-value="incomeExpenseStore.forceRerender()"
                color="rgb(80, 50, 0)"
                style="
                  margin: 0px 0px 0px 0px;
                  font-size: 1.5vh;
                  font-weight: bold;
                "
              ></v-range-slider>
            </v-card-text>
          </v-card> </v-container
      ></v-col>
    </v-row>
    <v-row>
      <v-col cols="4"
        ><v-container>
          <v-card
            variant="outlined"
            class="mx-auto text-center"
            max-width="500"
          >
            <v-card-title
              style="color: rgb(80, 50, 0); font-size: 2.5vh; font-weight: bold"
            >
              เมนูยอดนิยมคาว/หวาน/เครื่องดื่ม
            </v-card-title>
            <v-row>
              <v-spacer
                style="width: 70%; padding-top: 1em; margin-bottom: 1em"
              >
              </v-spacer>
            </v-row>
            <v-card-text>
              <v-sheet
                min-height="100"
                color="rgb(80, 50, 0)"
                style="color: white"
                class="text-center"
              >
                <PopMenuView />
              </v-sheet>
            </v-card-text>
          </v-card> </v-container
      ></v-col>
      <v-col cols="4">
        <v-container>
          <v-card
            class="mx-auto text-center"
            width="350"
            max-width="350"
            color="white"
          >
            <v-card-title
              style="color: rgb(80, 50, 0); font-size: 2vh; font-weight: bold"
            >
              รายงานค่าใช้จ่ายของวัตถุดิบรายเดือน/ปี
            </v-card-title>
            <v-row>
              <v-spacer style="width: 40%"> </v-spacer>
              <v-select
                label="Year"
                v-model="expenseMStore.year"
                :items="expenseMStore.years"
                variant="solo"
                dense
                style="
                  width: 30%;
                  font-size: 1px;
                  margin-bottom: 0px;
                  padding-right: 30px;
                  padding-top: 10px;
                "
                @update:model-value="expenseMStore.forceRerender()"
              ></v-select>
            </v-row>
            <v-card-text>
              <v-sheet
                rounded="lg"
                height="250"
                max-height="250"
                style="
                  border: solid 2px rgb(80, 50, 0);
                  margin: 1px 0px 0px 0px;
                "
                class="text-center"
                @click="expenseMStore.dialog = true"
              >
                <ExpenseMView v-if="expenseMStore.renderComponent" />
              </v-sheet>
              <v-range-slider
                v-if="!expenseMStore.disabled"
                min="0"
                max="11"
                :step="1"
                show-ticks="always"
                :ticks="expenseMStore.month"
                v-model="expenseMStore.rangeMonth"
                @update:model-value="expenseMStore.forceRerender()"
                color="rgb(80, 50, 0)"
                style="margin: 0px 0px 0px 0px; font-size: 1vh"
              ></v-range-slider>
            </v-card-text>
          </v-card> </v-container
      ></v-col>

      <v-col cols="4"
        ><v-container>
          <v-card
            class="mx-auto text-center"
            width="350"
            max-width="350"
            color="white"
          >
            <v-card-title
              style="color: rgb(80, 50, 0); font-size: 2vh; font-weight: bold"
            >
              รอบการจ่ายเงินเดือนรายเดือน/ปี
            </v-card-title>
            <v-row>
              <v-spacer style="width: 40%"> </v-spacer>
              <v-select
                label="Year"
                v-model="sararyEsStore.year"
                :items="['All Time', 2023, 2022, 2021, 2020]"
                variant="solo"
                dense
                style="
                  width: 30%;
                  font-size: 5px;
                  margin-bottom: 0px;
                  padding-right: 30px;
                  padding-top: 10px;
                "
                @update:model-value="sararyEsStore.forceRerender()"
              ></v-select>
            </v-row>
            <v-card-text>
              <v-sheet
                rounded="lg"
                height="250"
                style="
                  border: solid 2px rgb(80, 50, 0);
                  margin: 1px 0px 0px 0px;
                "
                class="text-center"
                @click="sararyEsStore.dialog = true"
              >
                <PayMonthlyView v-if="sararyEsStore.renderComponent" />
              </v-sheet>
              <v-range-slider
                v-if="!sararyEsStore.disabled"
                min="0"
                max="11"
                :step="1"
                show-ticks="always"
                :ticks="sararyEsStore.month"
                v-model="sararyEsStore.rangeMonth"
                @update:model-value="sararyEsStore.forceRerender()"
                color="rgb(80, 50, 0)"
                style="margin: 0px 0px 0px 0px; font-size: 1vh"
              ></v-range-slider>
            </v-card-text>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>
