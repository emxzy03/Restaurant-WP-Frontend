<script setup lang="ts">
import { mdiEye, mdiEyeOff } from "@mdi/js";
import { onMounted, ref } from "vue";
import type { VForm } from "vuetify/components";
import { useLoginStore } from "@/stores/login";
import { useEmployeeStore } from "@/stores/employee";
const loginStore = useLoginStore();
// const emit = defineEmits<{
//   (e: "login", userName: string): void;
// }>();

const loginName = ref("");
const password = ref("");
const show = ref(false);
const valid = ref(true);
const form = ref<InstanceType<typeof VForm> | null>(null);
const login = async () => {
  const { valid } = await form.value!.validate(); //!=believe not null, ?=may be null
  if (valid) {
    // emit("login", loginName.value);
    loginStore.login(loginName.value, password.value);
    // console.log("form success");
    // alert("Form is valid");
  }
};
const reset = () => {
  form.value?.reset();
};
const empStore = useEmployeeStore();
onMounted(async () => {
  await empStore.getEmployees();
});
</script>
<template>
  <v-app>
    <v-img src="./bg.png" cover max-width="100%" height="125">
      <v-main class="pa-16">
        <v-container class="mb-6 pa-16 justify-center">
          <v-row align="center" class="pa-16">
            <!-- class="bg-amber-lighten-4 pa-16 bg-" -->
            <v-card width="400px" class="mx-auto mt-16 mb-16">
              <v-card-title
                primary-title
                class="text-center text-h5 font-weight-bold"
              >
                Login
              </v-card-title>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    label="Login Name"
                    v-model="loginName"
                    :rules="[
                      (v) => !!v || 'Login Name is required', //if true || H : not noti if false
                      (v) =>
                        v.length >= 4 ||
                        'Name must be more than or equal to 4 characters',
                    ]"
                    required
                  ></v-text-field>
                  <v-text-field
                    :append-inner-icon="show ? mdiEye : mdiEyeOff"
                    :type="show ? 'text' : 'password'"
                    label="Password"
                    v-model="password"
                    :rules="[
                      (v) => !!v || 'Password is required',
                      (v) =>
                        v.length >= 8 ||
                        'Password must be more than or equal to 8 characters',
                    ]"
                    required
                    @click:append-inner="show = !show"
                  ></v-text-field>
                </v-form>
                <!-- <pre>
            {{ loginName }}
            {{ password }}
          </pre> -->
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn color="success" @click="login">Login</v-btn>
                <v-btn color="error" @click="reset">Clear</v-btn>
              </v-card-actions>
            </v-card>
          </v-row>
        </v-container>
      </v-main>
    </v-img>
  </v-app>
</template>
