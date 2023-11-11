<template>
  <div class="card">
    <div id="chart">
      <apexchart
        type="bar"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import { BCard, BCardText, BLink } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    BCard,
    BCardText,
    BLink,
    VueApexCharts,
  },
  props: {
    statistics: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      series: [
        {
          name: "Encours",
          data: this.statistics.graphe_address_ajours,
        },
        {
          name: "Ajours",
          data: this.statistics.graphe_address_encours,
        },
        {
          name: "Inactif",
          data: this.statistics.graphe_address_inactif,
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Avr",
            "Mai",
            "Jui",
            "Jul",
            "Aout",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        labels: ["Encours", "A jours"],
        colors: ["#014612", "#ffa148", "#de1212"],
        yaxis: {
          title: {
            text: "Adresses année courrante",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return " " + val + " adresses";
            },
          },
        },
      },
    };
  },
};
</script>

<style></style>
