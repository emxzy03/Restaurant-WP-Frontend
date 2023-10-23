import { ref } from "vue";
import { defineStore } from "pinia";

export const useVarCompnStore = defineStore("var-compn", () => {
  const valuesMatAutocom = ref(null);
  const styleTableTh =
    "font-size: 2.7vh; background-color: rgb(233, 232, 213);";
  const styleTable =
    "color: rgb(86, 46, 8); background-color: rgb(243, 242, 223); font-family: Andale Mono, monospace;";
  const styleHeadC =
    "font-size: 3vh; color: rgb(243, 242, 223); font-family: Andale Mono, monospace;  font-weight: bold;";
  const styleBtnOrange =
    "color: rgb(243, 245, 235); background-color: rgb(173, 84, 54); font-family: Andale Mono, monospace;";
  const styleBtnGreen =
    "color: rgb(243, 245, 235); background-color: rgb(72, 101, 22); font-family: Andale Mono, monospace;";
  const styleBtnRed =
    "color: rgb(243, 245, 235); background-color: rgb(146, 16, 16); font-family: Andale Mono, monospace;";
  const styleBtnBrown =
    "color: rgb(243, 245, 235); background-color: rgb(86, 46, 8); font-family: Andale Mono, monospace;";
  return {
    valuesMatAutocom,
    styleTableTh,
    styleTable,
    styleHeadC,
    styleBtnOrange,
    styleBtnGreen,
    styleBtnRed,
    styleBtnBrown,
  };
});
