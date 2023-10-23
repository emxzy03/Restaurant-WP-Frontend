<template>
  <Line :data="data" :options="options" />
</template>

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
import { useIncomeStore } from "@/stores/income";
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

const incomeExpenseStore = useIncomeStore();

onMounted(async () => {
  await incomeExpenseStore.getIncomes();
});

export default {
  name: "IncomeExpense",
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Line,
  },
  data() {
    return {
      data: {
        labels: incomeExpenseStore.listRangeBy,
        datasets: [
          {
            label: "รายได้",
            backgroundColor: "lightgreen",
            borderColor: "lightgreen",
            data: incomeExpenseStore.listIncome,
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
