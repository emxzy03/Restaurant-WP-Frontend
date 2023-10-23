<script setup lang="ts">
import { useCheckMaterialStore } from "@/stores/check-materials";
import { useEmployeeStore } from "@/stores/employee";
import { useVarCompnStore } from "@/stores/var-compn";
import { onMounted, ref } from "vue";
import { VForm } from "vuetify/components";

const empStore = useEmployeeStore();
const checkMatStore = useCheckMaterialStore();
const varcpStore = useVarCompnStore();
const form = ref<VForm | null>(null);
async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    await checkMatStore.saveCheckMaterial();
  }
}
onMounted(async () => {
  await empStore.getEmployees();
});
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="checkMatStore.dialog" persistent width="1024">
      <v-card
        style="
          color: rgb(86, 46, 8);
          background-color: rgb(243, 242, 223);
          font-family: Andale Mono, monospace;
        "
      >
        <v-card-title style="font-weight: bold; font-size: 4vh">
          Check Material
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="4">
                  <v-select
                    label="Select Employee*"
                    :items="empStore.employees"
                    item-title="name"
                    item-value="id"
                    required
                    v-model="checkMatStore.editedCheckMaterial.employeeId"
                    :rules="[(v) => !!v || 'Employee is required']"
                  ></v-select>
                  <!-- <pre>{{ checkMatStore.editedCheckMaterial.employeeId }}</pre> -->
                </v-col>
              </v-row>
              <v-row>
                <v-container style="background-color: rgb(80, 50, 0)">
                  <v-table
                    :style="varcpStore.styleTable"
                    fixed-header
                    height="45vh"
                  >
                    <thead>
                      <tr>
                        <th :style="varcpStore.styleTableTh">No.</th>
                        <th :style="varcpStore.styleTableTh">Material Name</th>
                        <th :style="varcpStore.styleTableTh">Last Quantity</th>
                        <th :style="varcpStore.styleTableTh">Now Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, i) in checkMatStore.checkMatDetails"
                        :key="i"
                      >
                        <td>{{ i + 1 }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.last_quantity }}</td>
                        <td>
                          <!-- {{ item.quantity }} -->
                          <v-text-field
                            label="Quantity"
                            v-model.number="item.now_q"
                            required
                            :rules="[
                              (v) =>
                                parseInt(v) <= item.last_quantity! ||
                                'Quantity is required and not more than old quantity',
                            ]"
                          ></v-text-field>
                          <!-- :rules="[
                              (v) =>
                                parseInt(v) >= 1 ||
                                'Quantity is number and must more than or equal to 1',
                            ]" -->
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-container>
                <!-- <pre>{{ checkMatStore.checkMatDetails }}</pre> -->
              </v-row>
            </v-container>
          </v-form>
          <small style="font-weight: bold">*indicates required field</small>
          <br />
          <small style="font-weight: bold"
            >**if last quantity = now quantity; you can decide don't input that
            box</small
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="checkMatStore.dialog = false">
            Close
          </v-btn>
          <v-btn variant="text" @click="save()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
