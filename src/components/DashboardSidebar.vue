<template>
  <div class="flex flex-col justify-between h-full">
    <aside>
      <VSpinner v-if="isLoading" />
      <template v-else>
        <img
          class="h-20 w-20 rounded-full shadow mb-4"
          v-cl-image="user.avatar"
          width="150"
          height="150"
          crop="fill"
          gravity="face"
          alt="avatar"
        />
        <div class="mb-5">
          <div
            class="text-2xl leading-none text-grey-darker block font-semibold mb-3"
          >
            {{ user.firstName || "N/A" }} {{ user.lastName || "N/A" }}
          </div>
          <div class="text-sm leading-tight text-grey-darker font-bold mb-1">
            {{ userDoc.country }}
          </div>
        </div>
        <nav class="sidebar-nav">
          <ul class="sidebar-nav__items">
            <li class="sidebar-nav__item">
              <router-link
                class="sidebar-nav__link"
                :to="routePaths.dashboard.home"
                >Dashboard</router-link
              >
            </li>
            <li class="sidebar-nav__item">
              <router-link
                class="sidebar-nav__link"
                :to="routePaths.dashboard.portfolio.home"
                >Portfolio</router-link
              >
              <ul class="sidebar-nav__items sidebar-nav__items--nested">
                <li class="sidebar-nav__item sidebar-nav__item--nested">
                  <router-link
                    class="sidebar-nav__link"
                    :to="routePaths.dashboard.portfolio.projects.home"
                    >Projects</router-link
                  >
                </li>
                <li class="sidebar-nav__item sidebar-nav__item--nested">
                  <router-link
                    class="sidebar-nav__link"
                    :to="routePaths.dashboard.portfolio.projects.add"
                    >Add new projects</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="sidebar-nav__item">
              <router-link
                class="sidebar-nav__link"
                :to="routePaths.dashboard.account"
                >Account</router-link
              >
            </li>
            <li
              v-if="user.claims && user.claims.admin"
              class="sidebar-nav__item"
            >
              <router-link class="sidebar-nav__link" :to="routePaths.admin.home"
                >Admin</router-link
              >
            </li>
          </ul>
        </nav>
      </template>
    </aside>
    <aside>
      <a
        @click.prevent="handleLogout"
        href="#"
        class="button button--secondary button--tiny"
        >Logout</a
      >
    </aside>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { routePaths } from "@/helpers/constants";
import { toastedError } from "@/helpers/toasted";
import VSpinner from "@/components/bases/VSpinner";

export default {
  name: "dashboard-sidebar",
  components: {
    VSpinner
  },
  data() {
    return {
      routePaths
    };
  },
  computed: {
    ...mapState("users", ["user", "userDoc"]),
    isLoading() {
      if (!this.userDoc) return true;
      return false;
    }
  },
  mounted() {
    if (!this.userDoc) this.reloadUserDocument();
  },
  methods: {
    ...mapActions("users", ["logout", "reloadUserDoc"]),
    async handleLogout() {
      try {
        await this.logout();
      } catch (error) {
        toastedError(this.$toasted, error.message);
      }
    },
    async reloadUserDocument() {
      try {
        await this.reloadUserDoc(this.user.uid);
      } catch (error) {
        toastedError(this.$toasted, error.message);
      }
    }
  }
};
</script>

<style>
.sidebar-nav {
  @apply font-bold text-base mb-10;
}

.sidebar-nav__items {
}

.sidebar-nav__items--nested {
  @apply mt-2 ml-4 pt-2;
}

.sidebar-nav__item {
  @apply mb-5;
}

.sidebar-nav__item--nested {
  @apply mb-4;
}

.sidebar-nav__link {
  @apply text-gray-800 no-underline;

  &:hover,
  &:focus,
  &.router-link-exact-active {
    @apply text-purple-800;
  }
}
</style>
