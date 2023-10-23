<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import type { VForm } from "vuetify/components";
const userStore = useUserStore();
const form = ref<VForm | null>(null);

const save = async () => {
  const { valid } = await form.value!.validate(); //!=believe not null, ?=may be null
  if (valid) {
    // userStore.dialog = false;
    // userStore.clear();
    userStore.saveUser();
  }
};

const clear = () => {
  userStore.dialog = false;
  userStore.clear();
};
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="userStore.dialog" persistent>
      <!-- <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
      </template> -->
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Login*"
                    v-model="userStore.editedUser.login"
                    :rules="[
                      (v) => !!v || 'Login จะต้องไม่เป็นช่องว่าง', //if true || H : not noti if false
                      (v) =>
                        v.length >= 5 ||
                        'Login จะต้องมีขนาดมากกว่าหรือเท่ากับ 5 ตัวอักษร',
                    ]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Name"
                    v-model="userStore.editedUser.name"
                    :rules="[
                      (v) => !!v || 'Name จะต้องไม่เป็นช่องว่าง', //if true || H : not noti if false
                      (v) =>
                        v.length >= 5 ||
                        'Name จะต้องมีขนาดมากกว่าหรือเท่ากับ 5 ตัวอักษร',
                    ]"
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col> -->
                <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    type="password"
                    v-model="userStore.editedUser.password"
                    :rules="[
                      (v) => !!v || 'Password จะต้องไม่เป็นช่องว่าง',
                      (v) =>
                        v.length >= 8 ||
                        'Password จะต้องมีขนาดมากกว่าหรือเท่ากับ 8 ตัวอักษร',
                      (v) =>
                        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
                          v
                        ) ||
                        'Password จะต้องมี เลข ตัวอักษรเล็ก, ใหญ่ และประกอบด้วย Special Character',
                    ]"
                    required
                  ></v-text-field>
                  <!-- /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{ค,}$/ -->
                </v-col>
                <!-- <v-col>
                  {{ userStore.editedUser }}
                </v-col> -->
                <!-- <v-col cols="12" sm="6">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="[
                    'Skiing',
                    'Ice hockey',
                    'Soccer',
                    'Basketball',
                    'Hockey',
                    'Reading',
                    'Writing',
                    'Coding',
                    'Basejump',
                  ]"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col> -->
              </v-row>
            </v-container>
          </v-form>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="clear">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped></style>
