<template>
  <div class="card">
    <div id="chart">
      <apexchart
        type="donut"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
    <div
      class="apexcharts-legend apexcharts-align-center position-bottom mb-1"
      xmlns="http://www.w3.org/1999/xhtml"
      style="inset: auto 0px 1px; position: absolute; max-height: 175px"
    >
      <div
        class="apexcharts-legend-series"
        style="margin: 2px 5px"
        rel="1"
        seriesname="Encours"
        data:collapsed="false"
      >
        <span
          class="apexcharts-legend-marker"
          style="
            background: rgb(1, 70, 18) !important;
            color: rgb(1, 70, 18);
            height: 12px;
            width: 12px;
            left: 0px;
            top: 0px;
            border-width: 0px;
            border-color: rgb(255, 255, 255);
            border-radius: 2px;
          "
          rel="1"
          data:collapsed="false"
        ></span
        ><span
          class="apexcharts-legend-text"
          style="
            color: #014612 !important;
            font-size: 12px;
            font-weight: 400;
            font-family: Helvetica, Arial, sans-serif;
          "
          rel="1"
          i="0"
          data:default-text="Encours"
          data:collapsed="false"
          >{{ this.statistics.total_address_ajours }} à jours</span
        >
      </div>
      <div
        class="apexcharts-legend-series"
        style="margin: 2px 5px"
        rel="2"
        seriesname="Ajours"
        data:collapsed="false"
      >
        <span
          class="apexcharts-legend-marker"
          style="
            background: rgb(255, 161, 72) !important;
            color: rgb(255, 161, 72);
            height: 12px;
            width: 12px;
            left: 0px;
            top: 0px;
            border-width: 0px;
            border-color: rgb(255, 255, 255);
            border-radius: 2px;
          "
          rel="2"
          data:collapsed="false"
        ></span
        ><span
          class="apexcharts-legend-text"
          style="
            color: #ffa148 !important;
            font-size: 12px;
            font-weight: 400;
            font-family: Helvetica, Arial, sans-serif;
          "
          rel="2"
          i="1"
          data:default-text="Ajours"
          data:collapsed="false"
          >{{ this.statistics.total_address_encours }} encours</span
        >
      </div>
      <div
        class="apexcharts-legend-series"
        style="margin: 2px 5px"
        rel="3"
        seriesname="Inactif"
        data:collapsed="false"
      >
        <span
          class="apexcharts-legend-marker"
          style="
            background: rgb(222, 18, 18) !important;
            color: rgb(222, 18, 18);
            height: 12px;
            width: 12px;
            left: 0px;
            top: 0px;
            border-width: 0px;
            border-color: rgb(255, 255, 255);
            border-radius: 2px;
          "
          rel="3"
          data:collapsed="false"
        ></span
        ><span
          class="apexcharts-legend-text"
          style="
            color: #de1212 !important;
            font-size: 12px;
            font-weight: 400;
            font-family: Helvetica, Arial, sans-serif;
          "
          rel="3"
          i="2"
          data:default-text="Inactif"
          data:collapsed="false"
          >{{ this.statistics.total_address_inactif }} inactif</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { BCard, BCardText, BLink, BBadge } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    BCard,
    BCardText,
    BLink,
    BBadge,
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
        this.statistics.total_address_ajours,
        this.statistics.total_address_encours,
        this.statistics.total_address_inactif,
        // 10, 1, 8,
      ],
      chartOptions: {
        chart: {
          type: "donut",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        colors: ["#014612", "#ffa148", "#de1212"],
        yaxis: {
          title: {
            text: " adresses",
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
        legend: {
          show: false,
        },
      },
    };
  },
};
</script>

<style></style>
