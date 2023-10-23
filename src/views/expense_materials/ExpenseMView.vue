<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import { useExpenseMaterialsStore } from "@/stores/expense_material";
import { onMounted } from "vue";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const expenseMStore = useExpenseMaterialsStore();

onMounted(async () => {
  await expenseMStore.getExpenseM();
});

export default {
  name: "ExpenseMaterials",
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Line,
  },
  data() {
    return {
      data: {
        labels: expenseMStore.listRangeBy,
        datasets: [
          {
            label: "ค่าใช้จ่ายวัตถุดิบ",
            backgroundColor: "red",
            borderColor: "red",
            data: expenseMStore.listExpenseMaterials,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        transitions: {
          show: {
            animations: {
              x: {
                from: 0,
              },
              y: {
                from: 0,
              },
            },
          },
          hide: {
            animations: {
              x: {
                to: 0,
              },
              y: {
                to: 0,
              },
            },
          },
        },
      },
    };
  },
};
</script>

<template>
  <Line :data="data" :options="options" />
</template>
