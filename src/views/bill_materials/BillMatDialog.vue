<script setup lang="ts">
import { useBillMaterialStore } from "@/stores/bill-materials";
import { useEmployeeStore } from "@/stores/employee";
import { onMounted, ref } from "vue";
import { VForm } from "vuetify/components";

const empStore = useEmployeeStore();
const billMatStore = useBillMaterialStore();
const form = ref<VForm | null>(null);
async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    billMatStore.strDate =
      billMatStore.selectYear +
      "-" +
      billMatStore.selectMonth +
      "-" +
      billMatStore.selectDate;
    // console.log(billMatStore.strDate);

    const date = new Date(
      +billMatStore.selectYear,
      +billMatStore.selectMonth - 1,
      billMatStore.selectDate
    );
    billMatStore.editedBillMaterial.date = date;
    await billMatStore.saveBillMaterial();
  }
}

onMounted(async () => {
  await empStore.getEmployees();
  await billMatStore.setDateNow();
  await billMatStore.setDates();
  await billMatStore.setYears();
});

const showList = async () => {
  await billMatStore.setDates();
  billMatStore.strDate =
    billMatStore.selectYear +
    "-" +
    billMatStore.selectMonth +
    "-" +
    billMatStore.selectDate;
  console.log(billMatStore.strDate);

  const date = new Date(
    +billMatStore.selectYear,
    +billMatStore.selectMonth - 1,
    billMatStore.selectDate
  );
  billMatStore.editedBillMaterial.date = date;
};
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="billMatStore.dialog" persistent width="1024">
      <v-card
        style="
          color: rgb(86, 46, 8);
          background-color: rgb(243, 242, 223);
          font-family: Andale Mono, monospace;
        "
      >
        <v-card-title style="font-weight: bold; font-size: 4vh">
          Bill Material
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Shop Name*"
                    required
                    v-model="billMatStore.editedBillMaterial.shop_name"
                    :rules="[(v) => !!v || 'Shop Name is required']"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-select
                    label="Select Employee*"
                    :items="empStore.employees"
                    item-title="name"
                    item-value="id"
                    required
                    v-model="billMatStore.editedBillMaterial.employeeId"
                    :rules="[(v) => !!v || 'Employee is required']"
                  ></v-select>
                  <!-- <pre>{{ billMatStore.editedBillMaterial.employeeId }}</pre> -->
                </v-col>
                <!-- <v-col cols="4">
                  <v-text-field
                    label="Total"
                    v-model.number="billMatStore.editedBillMaterial.total"
                  ></v-text-field>
                </v-col> -->
                <v-col cols="4">
                  <v-text-field
                    label="Pay/Buy*"
                    required
                    v-model.number="billMatStore.editedBillMaterial.buy"
                    :rules="[
                      (v) =>
                        parseInt(v) >= 1 ||
                        'Price for pay is number and must more than or equal to 1',
                    ]"
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="4">
                  <v-text-field
                    label="Change"
                    v-model.number="billMatStore.editedBillMaterial.change"
                  ></v-text-field>
                </v-col> -->
                <v-col cols="8">
                  <v-row>Date:</v-row>
                  <v-row>
                    <v-select
                      v-model="billMatStore.selectYear"
                      :items="billMatStore.year"
                      item-title="name"
                      item-value="id"
                      label="Year*"
                      style="color: rgb(86, 46, 0)"
                      dense
                      solo
                      class="ma-2"
                      @update:model-value="showList"
                      :rules="[(v) => !!v || 'Year is required']"
                    ></v-select>
                    <v-select
                      v-model="billMatStore.selectMonth"
                      :items="billMatStore.month"
                      item-title="mnth"
                      item-value="valuem"
                      label="Month*"
                      style="color: rgb(86, 46, 0)"
                      dense
                      solo
                      class="ma-2"
                      @update:model-value="showList"
                      :rules="[(v) => !!v || 'Month is required']"
                    ></v-select>
                    <v-select
                      v-model="billMatStore.selectDate"
                      :items="billMatStore.date"
                      item-title="name"
                      item-value="id"
                      label="Date*"
                      style="color: rgb(86, 46, 0)"
                      dense
                      solo
                      class="ma-2"
                      @update:model-value="showList"
                      :rules="[(v) => !!v || 'Date is required']"
                    ></v-select>
                  </v-row>
                  <!-- <pre>{{ billMatStore.strDate }}</pre> -->
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <small style="font-weight: bold">*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="billMatStore.dialog = false">
            Close
          </v-btn>
          <v-btn variant="text" @click="save()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
