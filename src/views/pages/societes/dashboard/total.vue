<template>
  <div class="card p-2" style="height: 400px">
    <div>
      <p style="color: #000; font-size: 15px">Sociéte :</p>
      <p
        style="
          color: #014612;
          font-size: 22px;
          margin-top: -15px;
          margin-bottom: 8%;
          font-weight: 500;
        "
      >
        {{ name }}
      </p>
    </div>
    <div>
      <p style="color: #000; font-size: 15px">Email :</p>
      <p
        style="
          color: #014612;
          font-size: 22px;
          margin-top: -15px;
          margin-bottom: 8%;
          font-weight: 500;
        "
      >
        {{ email }}
      </p>
    </div>
    <div>
      <p style="color: #000; font-size: 15px">Adresse :</p>
      <p
        style="
          color: #014612;
          font-size: 22px;
          margin-top: -15px;
          margin-bottom: 8%;
          font-weight: 500;
        "
      >
        {{ adresse }}
      </p>
    </div>
    <div>
      <p style="color: #000; font-size: 15px">Téléphone :</p>
      <p
        style="
          color: #014612;
          font-size: 22px;
          margin-top: -15px;
          margin-bottom: 8%;
          font-weight: 500;
        "
      >
        {{ telephone }}
      </p>
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
    entity: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      name: this.entity.societe.name,
      adresse: this.entity.societe.adresse,
      telephone: this.entity.societe.telephone,
      email: this.entity.societe.email,
    };
  },
};
</script>

<style></style>
