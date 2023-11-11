<template>
  <div>
    <div v-if="loading">
      <h3 style="color: #000; font-size: 25px" class="mb-2">
        Salut {{ user.name }}!
      </h3>

      <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        v-b-modal.filter-dashboard-data
        variant="outline-primary"
      >
        Filtrer le tableau de bord
      </b-button>

      <div class="mt-2">
        <total :statistics="statistics" />
      </div>
      <div class="row">
        <div class="col-md-4">
          <pie :statistics="statistics" style="height: 400px" />
        </div>
        <div class="col-md-8">
          <graphe :statistics="statistics" style="height: 400px" />
        </div>
      </div>
    </div>
    <div v-else>
      <p>Encours...</p>
    </div>

    <b-modal
      id="filter-dashboard-data"
      cancel-variant="outline-danger"
      ok-title="Ajouter"
      cancel-title="Fermer"
      centered
      title="Filtrer le tableau de bord"
      hide-footer
    >
      <b-form>
        <div class="form-group">
          <label> Année </label>
          <select class="form-control" v-model="form.year">
            <option disabled value="">Choisir</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>

        <div class="form-group">
          <label> Mois </label>
          <select class="form-control" v-model="form.month">
            <option disabled value="">Choisir</option>
            <option value="1">Janvier</option>
            <option value="2">Février</option>
            <option value="3">Mars</option>
            <option value="4">Avril</option>
            <option value="5">Mai</option>
            <option value="6">Juin</option>
            <option value="7">Juillet</option>
            <option value="8">Août</option>
            <option value="9">Septembre</option>
            <option value="10">Octobre</option>
            <option value="11">Novembre</option>
            <option value="12">Decembre</option>
          </select>
        </div>

        <div class="demo-inline-spacing justify-content-end" :align="'right'">
          <b-button
            @click="closed()"
            :disabled="disabled"
            :align="'right'"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="outline-primary"
          >
            Quitter
          </b-button>

          <b-button
            :align="'right'"
            :disabled="disabled"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            @click="index()"
            variant="primary"
          >
            Filtrer
          </b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import {
  BCard,
  BCardText,
  BTable,
  BAvatar,
  BBadge,
  BRow,
  BCol,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BDropdown,
  BDropdownItem,
  BModal,
  VBModal,
  BForm,
  BLink,
} from "bootstrap-vue";
import Pie from "./pages/dashboard/pie";
import Graphe from "./pages/dashboard/graphe";
import Total from "./pages/dashboard/total";
import auth from "../helpers/auth";
import vSelect from "vue-select";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BCard,
    BCardText,
    Pie,
    Graphe,
    Total,
    BTable,
    BAvatar,
    BBadge,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BDropdown,
    BDropdownItem,
    BModal,
    VBModal,
    BForm,
    vSelect,
    Ripple,
    BLink,
  },
  data() {
    return {
      user: auth.getUser(),
      statistics: "",
      loading: false,
      disabled: false,
      form: {
        year: "",
        month: "",
      },
    };
  },
  mounted() {
    this.index();
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },
  methods: {
    closed() {
      this.form.year = "";
      this.form.month = "";
      this.disabled = false;
      this.$bvModal.hide("add-admin-modal");
    },
    index() {
      this.loading = false;
      this.$http
        .post("/admin/dashboard", this.form)
        .then((res) => {
          this.statistics = res.data.data;

          this.loading = true;
          this.closed();
        })
        .catch((errors) => {
          //errors
        });
    },
  },
};
</script>

<style></style>
