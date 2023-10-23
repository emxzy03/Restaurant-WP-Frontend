<script lang="ts" setup>
import { useEmployeeStore } from "@/stores/employee";
import { useVarCompnStore } from "@/stores/var-compn";
import { mdiPackageVariantClosedPlus, mdiPencil, mdiDelete } from "@mdi/js";
import { onMounted } from "vue";
import EmployeeDialog from "./EmployeeDialog.vue";
import AutoCompleteFind from "@/components/AutoCompleteFind.vue";
AbortController;
const employeeStore = useEmployeeStore();
onMounted(async () => {
  await employeeStore.getEmployees();
});

const varcpStore = useVarCompnStore();
</script>
<template>
  <EmployeeDialog></EmployeeDialog>
  <v-container>
    <v-row>
      <v-col cols="6" offset="1">
        <AutoCompleteFind
          label="Search Employee"
          :nameLists="employeeStore.nameEmployee()"
        ></AutoCompleteFind>
      </v-col>
      <v-col cols="2" offset="2">
        <v-btn
          :prepend-icon="mdiPackageVariantClosedPlus"
          class="ma-3 vBtnCard button-3d styleBtnBrown fontBtn"
          @click="employeeStore.dialog = true"
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
                <th :style="varcpStore.styleTableTh">ชื่อผู้ใช้</th>
                <!-- <th :style="varcpStore.styleTableTh">รหัสผ่าน</th> -->
                <th :style="varcpStore.styleTableTh">ชื่อ-นามสกุล</th>
                <th :style="varcpStore.styleTableTh">วันเกิด</th>
                <th :style="varcpStore.styleTableTh">ที่อยู่</th>
                <th :style="varcpStore.styleTableTh">เบอร์ติดต่อ</th>
                <th :style="varcpStore.styleTableTh">Email</th>
                <!-- <th :style="varcpStore.styleTableTh">ช่องทางติดต่ออื่น</th> -->
                <th :style="varcpStore.styleTableTh">วันที่เริ่มทำงาน</th>
                <th :style="varcpStore.styleTableTh">ตำแหน่ง</th>
                <th :style="varcpStore.styleTableTh">ค่าจ้าง/ชั่วโมง</th>
                <th :style="varcpStore.styleTableTh">Operations</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item of employeeStore.employees" :key="item.id">
                <td
                  style="font-size: 2.2vh"
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == item.username ||
                    varcpStore.valuesMatAutocom == item.tel ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.id }}
                </td>
                <td
                  style="font-size: 2.2vh"
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == item.username ||
                    varcpStore.valuesMatAutocom == item.tel ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.username }}
                </td>
                <!-- <td style="font-size: 2.2vh">{{ item.password }}</td> -->
                <td
                  style="font-size: 2.2vh"
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == item.username ||
                    varcpStore.valuesMatAutocom == item.tel ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.name }}
                </td>
                <td
                  style="font-size: 2.2vh"
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == item.username ||
                    varcpStore.valuesMatAutocom == item.tel ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.birthday?.toString().substring(0, 10) }}
                </td>
                <td
                  style="font-size: 2.2vh"
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == item.username ||
                    varcpStore.valuesMatAutocom == item.tel ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.address }}
                </td>
                <td
                  style="font-size: 2.2vh"
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == item.username ||
                    varcpStore.valuesMatAutocom == item.tel ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.tel }}
                </td>
                <td
                  style="font-size: 2.2vh"
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == item.username ||
                    varcpStore.valuesMatAutocom == item.tel ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.email }}
                </td>
                <!-- <td style="font-size: 2.2vh">{{ item.oth_contact }}</td> -->
                <td
                  style="font-size: 2.2vh"
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == item.username ||
                    varcpStore.valuesMatAutocom == item.tel ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.start_date?.toString().substring(0, 10) }}
                </td>
                <td
                  style="font-size: 2.2vh"
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == item.username ||
                    varcpStore.valuesMatAutocom == item.tel ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.role }}
                </td>
                <td
                  style="font-size: 2.2vh"
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == item.username ||
                    varcpStore.valuesMatAutocom == item.tel ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  {{ item.sal_rate }}
                </td>
                <td
                  v-if="
                    varcpStore.valuesMatAutocom == item.name ||
                    varcpStore.valuesMatAutocom == item.username ||
                    varcpStore.valuesMatAutocom == item.tel ||
                    varcpStore.valuesMatAutocom == null
                  "
                >
                  <v-btn
                    :prepend-icon="mdiPencil"
                    class="mr-3 ma-2 vBtnCard button-3d styleBtnOrange fontBtn"
                    @click="employeeStore.editEmployee(item)"
                    >Edit</v-btn
                  ><v-btn
                    :prepend-icon="mdiDelete"
                    class="vBtnCard button-3d styleBtnRed fontBtn"
                    @click="employeeStore.deleteEmployee(item.id!)"
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
