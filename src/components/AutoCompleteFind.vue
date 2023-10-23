<script setup lang="ts">
import { mdiMagnify } from "@mdi/js";
import { useVarCompnStore } from "@/stores/var-compn";

defineProps<{
  label: string;
  nameLists: string[];
}>();
// const values = ref(null);
const varcpStore = useVarCompnStore();
// const values = ref(varcpStore.valuesMatAutocom);
</script>

<template>
  <v-autocomplete
    style="
      color: rgb(86, 46, 8);
      background-color: rgb(243, 242, 223);
      font-family: Andale Mono, monospace;
    "
    class="mt-2"
    v-model="varcpStore.valuesMatAutocom"
    clearable
    color="rgb(80, 50, 0)"
    density="comfortable"
    :label="label"
    :append-inner-icon="mdiMagnify"
    single-line
    hide-details
    @click:append-inner="true"
    :items="nameLists"
    return-object
  ></v-autocomplete>
  <!-- {{ "a" + varcpStore.valuesMatAutocom }} -->
</template>

<style scoped></style>
