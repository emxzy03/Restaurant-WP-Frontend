import { ref } from "vue";
import { defineStore } from "pinia";
import type RecieptDetail from "@/types/ReceiptDetail";

export const useRecieptDetailStore = defineStore("receiptDetail", () => {
  const showBill = ref(false);

  const receiptDetails = ref(<RecieptDetail[]>[
    {
      id: 1,
      name: "ผัดกะเพราหมู",
      quantity: 2,
      price: 45,
      total: 90,
    },
    {
      id: 2,
      name: "ผัดซีอิ๊ว",
      quantity: 3,
      price: 30,
      total: 90,
    },
    {
      id: 3,
      name: "ลอดช่อง",
      quantity: 3,
      price: 20,
      total: 60,
    },
    {
      id: 4,
      name: "น้ำเปล่า",
      quantity: 4,
      price: 10,
      total: 40,
    },
  ]);

  return { receiptDetails, showBill };
});
