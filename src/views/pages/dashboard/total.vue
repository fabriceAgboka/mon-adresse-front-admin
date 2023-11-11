<template>
  <div class="card">
    <div class="row">
      <div class="col-md-4 p-2">
        <p style="color: #014612; font-size: 35px; font-weight: bold">
          {{ total_adress }}
        </p>
        <p style="color: #000; font-size: 22px">Adresses</p>
      </div>
      <div class="col-md-4 p-2">
        <p style="color: #014612; font-size: 35px; font-weight: bold">
          {{ total_societe }}
        </p>
        <p style="color: #000; font-size: 22px">Sociétés</p>
      </div>
      <div class="col-md-4 p-2">
        <p style="color: #014612; font-size: 35px; font-weight: bold">
          {{ total_users }}
        </p>
        <p style="color: #000; font-size: 22px">Utilisateurs</p>
      </div>
    </div>
  </div>
</template>

<script>
import { BCard, BCardText, BLink } from "bootstrap-vue";

export default {
  components: {
    BCard,
    BCardText,
    BLink,
  },
  props: {
    statistics: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      total_users: this.statistics.total_users,
      total_adress: this.statistics.total_address,
      total_societe: this.statistics.total_societes,
    };
  },
};
</script>

<style></style>
