<template>
  <ul>
    <p class="menu-libelle-header">ADMINISTRATION</p>
    <component
      :is="resolveNavItemComponent(item)"
      v-for="item in items"
      :key="item.header || item.title"
      :item="item"
    />

    <b-button
      type="submit"
      variant="primary"
      class="logout-button"
      @click="logout"
    >
      Déconnexion
    </b-button>
  </ul>
</template>

<script>
import { BButton } from "bootstrap-vue";
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from "@core/layouts/utils";
import { provide, ref } from "@vue/composition-api";
import VerticalNavMenuHeader from "../vertical-nav-menu-header";
import VerticalNavMenuLink from "../vertical-nav-menu-link/VerticalNavMenuLink.vue";
import VerticalNavMenuGroup from "../vertical-nav-menu-group/VerticalNavMenuGroup.vue";
import auth from "@/helpers/auth";
import router from "@/router/index"; // Ajoutez le chemin correct

export default {
  watch: {},
  components: {
    BButton,
    VerticalNavMenuHeader,
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  setup() {
    provide("openGroups", ref([]));

    return {
      resolveNavItemComponent,
    };
  },
  methods: {
    logout() {
      console.log("logout");
      auth.logout();
      router.push("/login");
    },
  },
};
</script>
<style>
/* Ajoutez ces styles CSS à votre fichier */
.menu-container {
  margin-bottom: 60px; /* Espace en bas pour le bouton de déconnexion */
}

.logout-button {
  position: fixed;
  bottom: 20px; /* Ajustez la distance du bas selon vos besoins */
  left: 50%; /* Centre le bouton horizontalement */
  transform: translateX(-50%); /* Centre le bouton horizontalement */
}
</style>
