<template>
  <nav class="nav">
    <router-link class="nav__item" :to="routePaths.home">Home</router-link>
    <!-- is Authenticated Links -->
    <template v-if="isAuthenticated">
      <router-link class="nav__item" :to="routePaths.dashboard.home"
        >Dashboard</router-link
      >
      <a class="nav__item" @click.prevent="handleLogout" href="#">Logout</a>
    </template>
    <!-- is NOT Authenticated Links -->
    <template v-else>
      <router-link class="nav__item" :to="routePaths.auth.login"
        >Login</router-link
      >
      <router-link class="nav__item" :to="routePaths.auth.register"
        >Register</router-link
      >
    </template>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { routePaths } from "@/helpers/constants";
import { toastedError } from "@/helpers/toasted";

export default {
  name: "the-nav-bar",
  data() {
    return {
      routePaths
    };
  },
  computed: {
    ...mapState("users", ["user"]),
    ...mapGetters("users", ["isAuthenticated"])
  },
  methods: {
    ...mapActions("users", ["logout"]),
    async handleLogout() {
      try {
        await this.logout();
      } catch (error) {
        toastedError(this.$toasted, error.message);
      }
    }
  }
};
</script>
