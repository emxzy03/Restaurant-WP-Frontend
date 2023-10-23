<script setup lang="ts">
import { useIncomeStore } from "@/stores/income";
import IncomeView from "../income/IncomeView.vue";
import IncomeExpenseView from "../income_expense/IncomeExpenseView.vue";
import ExpenseMView from "../expense_materials/ExpenseMView.vue";
import { mdiClose } from "@mdi/js";
import { useIncomeExpenseStore } from "@/stores/income_expense";
import { useExpenseMaterialsStore } from "@/stores/expense_material";
import { usePayMonthlyStore } from "@/stores/pay_monthly";
import PayMonthlyView from "../pay_monthly/PayMonthlyView.vue";
import { usePopMenuStore } from "@/stores/pop-menu";
import PopMenuView from "../pop_menu_report/popMenuView.vue";

const incomeStore = useIncomeStore();
const incomeExpenseStore = useIncomeExpenseStore();
const expenseMStore = useExpenseMaterialsStore();
const sararyEsStore = usePayMonthlyStore();
const popMenuStore = usePopMenuStore();
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="incomeStore.dialog" persistent width="1000">
      <v-card class="mx-auto text-center" color="white" width="1000">
        <v-card-title
          style="color: rgb(80, 50, 0); font-size: 4vh; font-weight: bold"
        >
          ยอดขายรายวัน/เดือน/ปี
          <v-icon
            :icon="mdiClose"
            style="position: absolute; right: 1%"
            size="3vh"
            @click="incomeStore.dialog = false"
          ></v-icon>
        </v-card-title>

        <v-row>
          <v-spacer style="width: 80%"></v-spacer>

          <v-select
            label="Year"
            v-model="incomeStore.year"
            :items="['All Time', 2023, 2022, 2021, 2020]"
            variant="solo"
            dense
            style="
              width: 20%;
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
            style="border: solid 2px rgb(80, 50, 0); margin: 1px 0px 0px 0px"
            class="text-center"
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
            style="margin: 0px 0px 0px 0px; font-size: 2vh; font-weight: bold"
          ></v-range-slider>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="incomeExpenseStore.dialog" persistent width="1000">
      <v-card class="mx-auto text-center" color="white" width="1000">
        <v-card-title
          style="color: rgb(80, 50, 0); font-size: 4vh; font-weight: bold"
        >
          รายงานรายรับรายจ่าย เดือน/ปี
          <v-icon
            :icon="mdiClose"
            style="position: absolute; right: 1%"
            size="3vh"
            @click="incomeExpenseStore.dialog = false"
          ></v-icon>
        </v-card-title>
        <v-row>
          <v-spacer style="width: 80%"> </v-spacer>
          <v-select
            label="Year"
            v-model="incomeExpenseStore.year"
            :items="['All Time', 2023, 2022, 2021, 2020]"
            variant="solo"
            dense
            style="
              width: 20%;
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
            style="border: solid 2px rgb(80, 50, 0); margin: 1px 0px 0px 0px"
            class="text-center"
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
            style="margin: 0px 0px 0px 0px; font-size: 2vh; font-weight: bold"
          ></v-range-slider>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="expenseMStore.dialog" persistent width="1000">
      <v-card class="mx-auto text-center" color="white" width="1000">
        <v-card-title
          style="color: rgb(80, 50, 0); font-size: 4vh; font-weight: bold"
        >
          รายงานค่าใช้จ่ายของวัตถุดิบรายเดือน/ปี
          <v-icon
            :icon="mdiClose"
            style="position: absolute; right: 1%"
            size="3vh"
            @click="expenseMStore.dialog = false"
          ></v-icon>
        </v-card-title>
        <v-row>
          <v-spacer style="width: 80%"> </v-spacer>
          <v-select
            label="Year"
            v-model="expenseMStore.year"
            :items="expenseMStore.years"
            variant="solo"
            dense
            style="
              width: 20%;
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
            style="border: solid 2px rgb(80, 50, 0); margin: 1px 0px 0px 0px"
            class="text-center"
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
            style="margin: 0px 0px 0px 0px; font-size: 2vh; font-weight: bold"
          ></v-range-slider>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="sararyEsStore.dialog" persistent width="1000">
      <v-card class="mx-auto text-center" color="white" width="1000">
        <v-card-title
          style="color: rgb(80, 50, 0); font-size: 4vh; font-weight: bold"
        >
          รอบการจ่ายเงินเดือนรายเดือน/ปี
          <v-icon
            :icon="mdiClose"
            style="position: absolute; right: 1%"
            size="3vh"
            @click="sararyEsStore.dialog = false"
          ></v-icon>
        </v-card-title>
        <v-row>
          <v-spacer style="width: 80%"> </v-spacer>
          <v-select
            label="Year"
            v-model="sararyEsStore.year"
            :items="['All Time', 2023, 2022, 2021, 2020]"
            variant="solo"
            dense
            style="
              width: 20%;
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
            style="border: solid 2px rgb(80, 50, 0); margin: 1px 0px 0px 0px"
            class="text-center"
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
            style="margin: 0px 0px 0px 0px; font-size: 2vh; font-weight: bold"
          ></v-range-slider>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="popMenuStore.dialog" persistent width="500">
      <v-card
        class="mx-auto text-center"
        color="white"
        width="500"
        height="500"
      >
        <v-card-title
          style="color: rgb(80, 50, 0); font-size: 3vh; font-weight: bold"
        >
          เมนูยอดนิยมคาว/หวาน/เครื่องดื่ม
          <v-icon
            :icon="mdiClose"
            style="position: absolute; right: 1%"
            size="3vh"
            @click="popMenuStore.dialog = false"
          ></v-icon>
        </v-card-title>
        <v-row>
          <!-- <v-spacer style="width: 70%; padding-top: 1em; margin-bottom: 1em">
          </v-spacer> -->
        </v-row>
        <v-card-text>
          <v-sheet
            color="rgb(80, 50, 0)"
            style="color: white"
            class="text-center"
          >
            <PopMenuView />
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<style>
.HText {
  font-weight: 800;
  /* font-size: 100pt; */
}
</style>
