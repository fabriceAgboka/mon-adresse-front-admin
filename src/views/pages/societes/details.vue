<template>
  <div>
    <div v-if="loading == true">
      <h3 style="color: #000; font-size: 25px" class="mb-2">
        Salut {{ user.name }}!
      </h3>
      <div class="row">
        <div class="col-md-6">
          <total :entity="statistics" />
        </div>
        <div class="col-md-6">
          <pie :statistics="statistics" style="height: 400px" />
        </div>
        <div class="col-md-12">
          <admins :admins="statistics.admins" style="height: 400px" />
        </div>
      </div>
    </div>
    <div v-else>
      <p>Encours...</p>
    </div>
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
import Pie from "../societes/dashboard/pie";
import Total from "../societes/dashboard/total";
import Admins from "../societes/dashboard/admins";
import auth from "@/helpers/auth";

export default {
  components: {
    BCard,
    BCardText,
    Pie,
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
    BForm,
    BLink,
    Admins,
  },
  data() {
    return {
      user: auth.getUser(),
      statistics: {},
      loading: false,
      disabled: false,
      form: {
        societe: "",
      },
    };
  },
  mounted() {
    this.form.societe = this.$router.currentRoute.params.id;
    this.loading = false;
    this.$http
      .post("/admin/dashboard/societe", this.form)
      .then((res) => {
        this.statistics = res.data;
        this.loading = true;
      })
      .catch((errors) => {
        //errors
      });
  },
};
</script>

<style></style>
