import { ref } from "vue";
import { defineStore } from "pinia";
import type Table from "@/types/Table";

export const useTableStore = defineStore("table", () => {
  const table = ref(<Table[]>[
    {
      table_number: 1,
      status: "ว่าง",
      seat: 4,
    },
    {
      table_number: 2,
      status: "กำลังจะว่าง",
      seat: 5,
    },
    {
      table_number: 3,
      status: "ไม่ว่าง",
      seat: 4,
    },
    {
      table_number: 4,
      status: "ไม่ว่าง",
      seat: 4,
    },
    {
      table_number: 5,
      status: "ว่าง",
      seat: 6,
    },
    {
      table_number: 6,
      status: "กำลังจะว่าง",
      seat: 4,
    },
    {
      table_number: 7,
      status: "ไม่ว่าง",
      seat: 4,
    },
    {
      table_number: 8,
      status: "ว่าง",
      seat: 3,
    },
    {
      table_number: 9,
      status: "ว่าง",
      seat: 5,
    },
  ]);

  return { table };
});
