<script setup lang="ts">
import { useEmployeeStore } from "@/stores/employee";
import { ref } from "vue";
import { VForm } from "vuetify/components";

const employeeStore = useEmployeeStore();
const form = ref<VForm | null>(null);
async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    await employeeStore.saveEmployee();
  }
}
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="employeeStore.dialog" persistent width="480">
      <v-card
        style="
          color: rgb(86, 46, 8);
          background-color: rgb(243, 242, 223);
          font-family: Andale Mono, monospace;
        "
      >
        <v-card-title style="font-weight: bold; font-size: 4vh">
          Employee Management
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="ชื่อผู้ใช้: *"
                    required
                    v-model="employeeStore.editedEmployee.username"
                    :rules="[
                      (v) => !!v || 'Item is required',
                      (v) => v.length >= 8 || 'Length must more or equal to 8',
                    ]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="รหัสผ่าน: *"
                    required
                    v-model="employeeStore.editedEmployee.password"
                    :rules="[
                      (v) => !!v || 'Item is required',
                      (v) =>
                        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
                          v
                        ) || 'Password is not valid!!',
                      (v) => v.length < 32 || 'Over length',
                    ]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="ชื่อ-นามสกุล: *"
                    required
                    v-model="employeeStore.editedEmployee.name"
                    :rules="[
                      (v) => !!v || 'Item is required',
                      (v) => v.length >= 3 || 'Length must more than 3',
                      (v) => v.length < 32 || 'Over length',
                    ]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="วันเกิด: *"
                    required
                    v-model="employeeStore.editedEmployee.birthday"
                    :rules="[(v) => !!v || 'Item is required']"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="ที่อยู่: *"
                    required
                    v-model="employeeStore.editedEmployee.address"
                    :rules="[
                      (v) => !!v || 'Item is required',
                      (v) => v.length >= 10 || 'Length must more than 10',
                      (v) => v.length < 60 || 'Over length',
                    ]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="เบอร์ติดต่อ: *"
                    required
                    v-model="employeeStore.editedEmployee.tel"
                    :rules="[
                      (v) => !!v || 'Item is required',
                      (v) => v.length > 9 || 'length equal to 10',
                      (v) => v.length <= 10 || 'Over length',
                    ]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Email: *"
                    required
                    v-model="employeeStore.editedEmployee.email"
                    :rules="[
                      (v) => !!v || 'Item is required',
                      (v) => v.length >= 10 || 'Length must more than 10',
                      (v) => v.length < 30 || 'Over length',
                    ]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="ช่องทางติดต่ออื่น: "
                    required
                    v-model="employeeStore.editedEmployee.oth_contact"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="วันที่เริ่มทำงาน: *"
                    required
                    v-model="employeeStore.editedEmployee.start_date"
                    :rules="[(v) => !!v || 'Item is required']"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-select
                    label="ตำแหน่ง: *"
                    :items="[
                      'cleaning personnel',
                      'chef_pfried',
                      'waitress',
                      'assistant chef',
                      'manager',
                      'owner',
                      'cashier',
                      'beverage manager',
                      'chef_stbaked',
                      'chef_roastb',
                      'chef_cboiled',
                      'chef_noodles',
                      'chef_dessert',
                    ]"
                    required
                    v-model="employeeStore.editedEmployee.role"
                    :rules="[(v) => !!v || 'Item is required']"
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="ค่าจ้าง/ชั่วโมง: *"
                    required
                    v-model.number="employeeStore.editedEmployee.sal_rate"
                    :rules="[(v) => !!v || 'Item is required']"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <small style="font-weight: bold">*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="employeeStore.dialog = false">
            Close
          </v-btn>
          <v-btn variant="text" @click="save()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
