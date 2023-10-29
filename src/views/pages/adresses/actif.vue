<template>
  <div>
    <h2 style="color: black">Liste des adresses actifs</h2>
    <div class="card">
      <div class="m-2" v-if="loading == true">
        <b-row>
          <b-col md="2" sm="4" class="my-1">
            <b-form-group class="mb-0">
              <label class="d-inline-block text-sm-left mr-50">Par page</label>
              <b-form-select
                id="perPageSelect"
                v-model="perPage"
                size="sm"
                :options="pageOptions"
                class="w-50"
              />
            </b-form-group>
          </b-col>
          <b-col md="4" sm="8" class="my-1">
            <b-form-group
              label="Trier"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              label-for="sortBySelect"
              class="mb-0"
            >
              <b-input-group size="sm">
                <b-form-select
                  id="sortBySelect"
                  v-model="sortBy"
                  :options="sortOptions"
                  class="w-75"
                >
                  <template v-slot:first>
                    <option value="">-- Aucun --</option>
                  </template>
                </b-form-select>
                <b-form-select
                  v-model="sortDesc"
                  size="sm"
                  :disabled="!sortBy"
                  class="w-25"
                >
                  <option :value="false">Croissant</option>
                  <option :value="true">Décroussant</option>
                </b-form-select>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="6" class="my-1">
            <b-form-group
              label="Filtrer"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              label-for="filterInput"
              class="mb-0"
            >
              <b-input-group size="sm">
                <b-form-input
                  id="filterInput"
                  v-model="filter"
                  type="search"
                  placeholder="Zone de recherche"
                />
                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''">
                    Effacer
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-table
              striped
              hover
              responsive
              :per-page="perPage"
              :current-page="currentPage"
              :items="items"
              :fields="fields"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              :filter="filter"
              :filter-included-fields="filterOn"
              @filtered="onFiltered"
            >
              <template #cell(statut)="data">
                <b-badge :variant="status[data.item.statut_id - 1]">
                  {{ data.value }}
                </b-badge>
              </template>

              <template #cell(user)="data">
                <b-link
                  class="ml-25"
                  :to="{
                    name: 'users_adresses',
                    params: { id: data.item.user_id },
                  }"
                  >{{ data.item.user }}</b-link
                >
              </template>

              <template #cell(created_at)="data">
                {{ format_date(data.value) }}
              </template>
            </b-table>
          </b-col>

          <b-col cols="12">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="right"
              size="sm"
              class="my-0"
            />
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import {
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
  BLink,
} from "bootstrap-vue";
import moment from "moment";
import Swal from "sweetalert2";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
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
    BLink,
  },
  data() {
    return {
      loading: false,
      perPage: 30,
      pageOptions: [3, 5, 10, 30, 50, 100, 500, 1000],
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
        },
        {
          key: "user",
          label: "Abonné(e)",
          sortable: true,
        },
        {
          key: "adresse",
          label: "Adresse",
          sortable: true,
        },
        {
          key: "typeadresse",
          label: "Type adresse",
          sortable: true,
        },
        {
          key: "created_at",
          label: "Soumis le",
          sortable: true,
        },
      ],
      status: ["light-warning", "light-success", "light-danger", "light-info"],
      change_status_component: [
        {
          name: "en cours",
          link: "/en-cours",
          id: 1,
        },
        {
          name: "activer",
          link: "/actif",
          id: 2,
        },
        {
          name: "désactiver",
          link: "/inactif",
          id: 3,
        },
        {
          name: "suspendre",
          link: "/suspendu",
          id: 4,
        },
        {
          name: "traiter",
          link: "/traitement",
          id: 5,
        },
      ],
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    },
  },
  mounted() {
    // Set the initial number of items
    this.index();
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    index() {
      this.loading = false;
      let form = {
        status: 2,
      };
      this.$http
        .post("/admin/adresses/index", form)
        .then((res) => {
          this.items = res.data;
          this.totalRows = this.items.length;

          this.loading = true;
          this.init_page = true;
          this.current_page = page;
        })
        .catch((errors) => {
          //errors
        });
    },

    change_status(id, status) {
      let data = this.change_status_component[status - 1];
      this.confirmText(id, data);
    },

    async confirmText(id, data) {
      const result = await Swal.fire({
        title: "Êtes-vous sûr de vouloir " + data.name + " ?",
        text: "Cette action est irréversible.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, " + data.name + "!",
        cancelButtonText: "Annuler",
        reverseButtons: true, // Inverse l'ordre des boutons
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1 mr-1",
        },
        buttonsStyling: false,
      });

      if (result.isConfirmed) {
        let form = {
          adresse: id,
        };
        this.$http
          .post("/admin/adresses/status" + data.link, form)
          .then((res) => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: "Opération réussie!",
                icon: "UserIcon",
                variant: "success",
              },
            });
          })
          .catch((errors) => {
            //errors
          });
      } else {
        // code
      }
    },

    format_date(date) {
      return moment(date).locale("fr").format("LL");
    },
  },
};
</script>
