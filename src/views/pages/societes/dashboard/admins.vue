<template>
  <div>
    <h2 style="color: black">Liste des gérants de la société</h2>
    <div class="card mt-2">
      <div class="m-2">
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
              <template #cell(created_at)="data">
                {{ format_date(data.value) }}
              </template>

              <template #cell(id)="data">
                <span>
                  <span>
                    <b-dropdown
                      variant="link"
                      toggle-class="text-decoration-none"
                      no-caret
                    >
                      <template v-slot:button-content>
                        <feather-icon
                          icon="MoreVerticalIcon"
                          size="16"
                          class="text-body align-middle mr-25"
                        />
                      </template>
                      <b-dropdown-item @click="destroy(data.item.id)">
                        <feather-icon
                          icon="CloseIcon"
                          class="mr-50 text-success"
                        />
                        <span>Retirer</span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </span>
                </span>
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
  BModal,
  VBModal,
  BForm,
} from "bootstrap-vue";
import moment from "moment";
import vSelect from "vue-select";
import Ripple from "vue-ripple-directive";

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
    BModal,
    VBModal,
    BForm,
    vSelect,
    Ripple,
  },
  props: {
    admins: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      items: this.admins,
      disabled: false,
      errors: {},
      entity: {
        email: "",
      },
      loading: false,
      perPage: 10,
      pageOptions: [3, 5, 10, 30],
      totalRows: this.admins.length,
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
          key: "fullname",
          label: "Nom complet",
          sortable: true,
        },
        {
          key: "email",
          label: "Email",
          sortable: true,
        },
        {
          key: "telephone",
          label: "Telephone",
          sortable: true,
        },
        {
          key: "created_at",
          label: "Ajouter le",
          sortable: true,
        },
        {
          key: "id",
          label: "Actions",
          sortable: true,
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
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
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
    format_date(date) {
      return moment(date).locale("fr").format("LL");
    },
  },
};
</script>
