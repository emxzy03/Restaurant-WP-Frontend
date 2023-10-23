<script lang="ts" setup>
import { useVarCompnStore } from "@/stores/var-compn";
import { useSalaryStore } from "@/stores/salary";
import { computed, onMounted, ref } from "vue";
import { mdiDotsHorizontalCircle, mdiCloseCircleOutline } from "@mdi/js";
import SalaryDetail from "./SalaryDetail.vue";
import ConfirmDialogT from "@/components/ConfirmDialogT.vue";

const salaryStore = useSalaryStore();
const varcpStore = useVarCompnStore();
const detailDialog = ref();
const confirmDlg = ref();

onMounted(async () => {
  await salaryStore.getSalaryMgmts();
  // await salaryStore.getSelectDate(strDateStart.value, strDateEnd.value);
  await salaryStore.days();
  await salaryStore.getYear();
});
const orderSalaryList = computed(() => {
  return [...salaryStore.salaries].sort((n1, n2) => n2.id! - n1.id!);
});
const viewDetails = async (id: number) => {
  try {
    await detailDialog.value.openDialog(id);
  } catch (e) {
    console.log(e);
  }
};
const showList = () => {
  salaryStore.strDateStart =
    salaryStore.selectYStart +
    "-" +
    salaryStore.selectMStart +
    "-" +
    salaryStore.selectDStart;
  console.log(salaryStore.strDateStart);

  salaryStore.strDateEnd =
    salaryStore.selectYEnd +
    "-" +
    salaryStore.selectMEnd +
    "-" +
    salaryStore.selectDEnd;
  console.log(salaryStore.strDateEnd);
};
const selectDates = async () => {
  await salaryStore.getSelectDate();
};
async function save() {
  await salaryStore.saveSalary();
  clearTable();
}
function clearTable() {
  salaryStore.salaryDList = [];
  salaryStore.total = 0;
  salaryStore.selectYStart = ref();
  salaryStore.selectMStart = ref();
  salaryStore.selectDStart = ref();
  salaryStore.selectYEnd = ref();
  salaryStore.selectMEnd = ref();
  salaryStore.selectDEnd = ref();
}
const saveSalary = async () => {
  try {
    await confirmDlg.value.openDialog(`ต้องการออกเงินเดือนใช่หรือไม่`);
    save();
  } catch (e) {
    /* empty */
  }
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col>
        <v-container>
          <v-row class="mb-5"
            ><div class="vText">การจ่ายเงินเดือน</div>
            <!-- <div>
              {{ salaryStore.month[0].toString().substring(0, 2) }}
            </div> -->
            <v-btn
              style="
                color: rgb(243, 245, 235);
                background-color: rgb(72, 101, 22);
              "
              class="button-3d ml-2"
              @click="selectDates()"
              >เลือกช่วงเวลา</v-btn
            >
            <v-btn
              style="color: rgb(243, 245, 235); background-color: #6d4c41"
              class="button-3d ml-2"
              @click="clearTable()"
              >ยกเลิกช่วงเวลา</v-btn
            ></v-row
          >
          <v-col cols="9">
            <v-row
              ><div class="vTextOt">เริ่มต้น : วัน</div>
              <v-select
                v-model="salaryStore.selectDStart"
                :items="salaryStore.day"
                item-title="name"
                item-value="id"
                label="DAY"
                style="color: rgb(86, 46, 0)"
                dense
                solo
                class="ma-2"
                @update:model-value="showList"
              ></v-select>
              <div class="vTextOt">เดือน</div>
              <v-select
                v-model="salaryStore.selectMStart"
                :items="salaryStore.month"
                item-title="mnth"
                item-value="valuem"
                label="MONTH"
                style="color: rgb(86, 46, 0)"
                dense
                solo
                class="ma-2"
                @update:model-value="showList"
              ></v-select>
              <div class="vTextOt">ปี</div>
              <v-select
                v-model="salaryStore.selectYStart"
                :items="salaryStore.year"
                item-title="name"
                item-value="id"
                label="YEAR"
                style="color: rgb(86, 46, 0)"
                dense
                solo
                class="ma-2"
                @update:model-value="showList"
              ></v-select>
            </v-row>
          </v-col>
          <v-col cols="9">
            <v-row
              ><div class="vTextOt">สิ้นสุด : วัน</div>
              <v-select
                v-model="salaryStore.selectDEnd"
                :items="salaryStore.day"
                item-title="name"
                item-value="id"
                label="DAY"
                style="color: rgb(86, 46, 0)"
                dense
                solo
                class="ma-2"
                @update:model-value="showList"
              ></v-select>
              <div class="vTextOt">เดือน</div>
              <v-select
                v-model="salaryStore.selectMEnd"
                :items="salaryStore.month"
                item-title="mnth"
                item-value="valuem"
                label="MONTH"
                style="color: rgb(86, 46, 0)"
                dense
                solo
                class="ma-2"
                @update:model-value="showList"
              ></v-select>
              <div class="vTextOt">ปี</div>
              <v-select
                v-model="salaryStore.selectYEnd"
                :items="salaryStore.year"
                item-title="name"
                item-value="id"
                label="YEAR"
                style="color: rgb(86, 46, 0)"
                dense
                solo
                class="ma-2"
                @update:model-value="showList"
              ></v-select>
            </v-row>
          </v-col>
        </v-container>
        <v-container style="background-color: rgb(80, 50, 0)">
          <v-table :style="varcpStore.styleTable" fixed-header height="70vh">
            <thead>
              <tr>
                <th :style="varcpStore.styleTableTh">ชื่อพนักงาน</th>
                <th :style="varcpStore.styleTableTh">จำนวนชั่วโมงที่ทำ</th>
                <th :style="varcpStore.styleTableTh">
                  อัตราส่วน (บาท/ชั่วโมง)
                </th>
                <th :style="varcpStore.styleTableTh">ยอดรวม</th>
              </tr>
            </thead>
            <tbody v-if="salaryStore.salaryDList.length !== 0">
              <tr v-for="item of salaryStore.salaryDList" :key="item.id">
                <td>{{ item.emp_name }}</td>
                <td>{{ item.emp_whours }}</td>
                <td>{{ item.emp_rate }}</td>
                <td>{{ item.emp_total }}</td>
              </tr>
            </tbody>
            <tbody v-else class="text-center">
              <tr>
                <td colspan="4">NO DATA</td>
              </tr>
            </tbody>
          </v-table>
        </v-container>
        <v-container>
          <v-row>
            <div class="vTextOt mt-3" style="font-weight: 800">
              รวมทั้งหมด {{ salaryStore.total }} บาท
            </div>
            <v-btn
              style="
                color: rgb(243, 245, 235);
                background-color: rgb(72, 101, 22);
              "
              class="button-3d ma-2"
              @click="saveSalary()"
              >ออกเงินเดือน</v-btn
            >
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-divider :thickness="5" color="rgb(72, 101, 22)"></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div class="vText">รายการเงินเดือน/ค่าจ้าง</div>
        <v-container style="background-color: rgb(80, 50, 0)">
          <v-table :style="varcpStore.styleTable" fixed-header height="70vh">
            <thead>
              <tr>
                <th :style="varcpStore.styleTableTh" class="text-center">
                  ช่วงวันที่
                </th>
                <th :style="varcpStore.styleTableTh" class="text-center">
                  วันที่ชำระ
                </th>
                <th :style="varcpStore.styleTableTh" class="text-center">
                  รวมเงินเดือน/ค่าจ้าง
                </th>
                <th :style="varcpStore.styleTableTh" class="text-center">
                  ดำเนินการ
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item of orderSalaryList" :key="item.id">
                <td style="font-size: 2.2vh" class="text-center">
                  {{ item.date_start.toString().substring(0, 10) }}
                  to
                  {{ item.date_end.toString().substring(0, 10) }}
                </td>
                <td style="font-size: 2.2vh" class="text-center">
                  {{ item.date_salary.toString().substring(0, 10) }} |
                  {{
                    item.date_salary
                      .toString()
                      .substring(11, item.date_salary.toString().length - 5)
                  }}
                </td>
                <td style="font-size: 2.2vh" class="text-center">
                  {{ item.total }}
                </td>
                <td class="text-center">
                  <v-btn
                    :icon="mdiDotsHorizontalCircle"
                    style="
                      color: rgb(243, 245, 235);
                      background-color: rgb(72, 101, 22);
                    "
                    class="mx-1 ma-1 vBtnCard button-3d"
                    @click="viewDetails(item.id!)"
                  ></v-btn>
                  <v-btn
                    :prepend-icon="mdiCloseCircleOutline"
                    style="
                      color: rgb(243, 245, 235);
                      background-color: rgb(146, 16, 16);
                    "
                    class="vBtnCard button-3d"
                    @click="salaryStore.deleteSalary(item.id!)"
                    >Cancel</v-btn
                  >
                  <!-- <v-btn
                    style="
                      color: rgb(243, 245, 235);
                      background-color: rgb(173, 84, 54);
                    "
                    class="mr-3 ma-2 vBtnCard button-3d"
                    >Detail</v-btn
                  > -->
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
  <ConfirmDialogT ref="confirmDlg"></ConfirmDialogT>
  <SalaryDetail ref="detailDialog"></SalaryDetail>
</template>
<style scoped>
.table {
  text-align: center;
}
.vText {
  color: rgb(86, 46, 8);
  font-family: Andale Mono, monospace;
  font-size: 4vh;
}
.vTextOt {
  color: rgb(86, 46, 8);
  font-family: Andale Mono, monospace;
  font-size: 3vh;
}
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
</style>
