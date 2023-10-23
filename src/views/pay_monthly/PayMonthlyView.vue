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
import { usePayMonthlyStore } from "@/stores/pay_monthly";
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

const PayMonthlyStore = usePayMonthlyStore();

onMounted(async () => {
  await PayMonthlyStore.getSararyEs();
});

export default {
  name: "PayMonthly",
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Line,
  },
  data() {
    return {
      data: {
        labels: PayMonthlyStore.listRangeBy,
        datasets: [
          {
            label: "เงินเดือน",
            backgroundColor: "red",
            borderColor: "red",
            data: PayMonthlyStore.listSararyEs,
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
