<script setup lang="ts">
import { useCheckInOutStore } from "@/stores/check-in-outs";
import { useEmployeeStore } from "@/stores/employee";
import { useLoginStore } from "@/stores/login";
import { onMounted, ref } from "vue";
import { mdiEye, mdiEyeOff } from "@mdi/js";
import type { VForm } from "vuetify/components";
import ConfirmDialogT from "./ConfirmDialogT.vue";

const loginStore = useLoginStore();
const cioStore = useCheckInOutStore();
const empStore = useEmployeeStore();
onMounted(async () => {
  await empStore.getEmployees();
  if (isLogin()) {
    loginName.value = loginStore.loginName;
    password.value = empStore.getPass(+loginStore.userIdNow);
    console.log(password.value);
  }
});

const loginName = ref("");
const password = ref("");
const show = ref(false);

const isLogin = () => {
  const employee = localStorage.getItem("user");
  if (employee) {
    return true;
  }
  return false;
};

const valid = ref(true);
const form = ref<InstanceType<typeof VForm> | null>(null);

const checkIn = async () => {
  const { valid } = await form.value!.validate();
  if (valid) {
    if (isLogin()) {
      cioStore.editedCheckInOut.employeeId = loginStore.userIdNow;
    } else {
      cioStore.editedCheckInOut.employeeId = empStore.getId(
        loginName.value,
        password.value
      );
    }
    await cioStore.saveCheckInOut();
    reset();
  }
};

const confirmDlg = ref();

const confirmout = async () => {
  try {
    await confirmDlg.value.openDialog(
      "Please Confirm",
      "คุณต้องการ Check Out แล้วใช่หรือไม่"
    );
    await checkOut();
  } catch (e) {
    console.log(e);
  }
};

const checkOut = async () => {
  const { valid } = await form.value!.validate();
  if (valid) {
    if (isLogin()) {
      await cioStore.tsCheckout(loginStore.userIdNow);
    } else {
      const employeeId = empStore.getId(loginName.value, password.value);
      await cioStore.tsCheckout(employeeId);
    }
    console.log(cioStore.editedCheckInOut);
    await cioStore.saveCheckInOut();
    reset();
  }
};
const reset = () => {
  form.value?.reset();
};
const date = new Date();
</script>

<template>
  <v-container>
    <v-row>
      <v-container>
        <v-col cols="6">
          <div class="res-logo">
            <img
              src="../assets/image/restuarant3-rm.png"
              alt="restaurant logo"
            />
          </div> </v-col
      ></v-container>
      <v-col cols="6">
        <div class="pa-5">
          DATE: {{ date.toDateString() }} |
          {{ date.toTimeString().substring(0, 8) }}
        </div>
        <v-form ref="form" v-model="valid">
          <v-text-field
            label="USERNAME*"
            :rules="[(v) => !!v || 'Username is required']"
            v-model="loginName"
            required
          ></v-text-field>
          <v-text-field
            :append-inner-icon="show ? mdiEye : mdiEyeOff"
            :type="show ? 'text' : 'password'"
            label="PASSWORD*"
            :rules="[(v) => !!v || 'Password is required']"
            v-model="password"
            required
            @click:append-inner="show = !show"
          ></v-text-field>
        </v-form>

        <!-- <v-btn class="ma-1">CHECK IN</v-btn>
            <v-btn class="ma-1">CHECK OUT</v-btn> -->
        <v-btn class="ma-1 vBtnCard button-3d styleBtnGreen" @click="checkIn"
          >CHECK IN</v-btn
        >
        <v-btn class="vBtnCard button-3d styleBtnBrown" @click="confirmout"
          >CHECK OUT</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
  <ConfirmDialogT ref="confirmDlg"></ConfirmDialogT>
</template>

<style scoped>
.res-logo {
  position: fixed;
  top: 30%;
  right: 15%;
  /* transform: translate(-50%, -50%); */
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
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

.styleBtnBrown {
  color: rgb(243, 245, 235);
  background-color: rgb(86, 46, 8);
}

.styleBtnGreen {
  color: rgb(243, 245, 235);
  background-color: rgb(72, 101, 22);
}

.fontBtn {
  font-family: Andale Mono, monospace;
}
</style>
