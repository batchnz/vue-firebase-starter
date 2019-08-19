<template>
  <section class="max-w-sm m-auto">
    <h1
      class="text-xl md:text-4xl font-semibold leading-tight text-center mb-12"
    >
      Login
    </h1>
    <TheFormLogin @clicked="handleSubmit" :isSubmitting="isSubmitting" />
    <div class="text-center mt-4">
      <router-link :to="routePaths.auth.register">
        Don't have an account? Register here
      </router-link>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import TheFormLogin from "@/components/forms/TheFormLogin";
import { routePaths } from "@/helpers/constants";
import { toastedError } from "@/helpers/toasted";

export default {
  name: "page-auth-login",
  components: {
    TheFormLogin
  },
  data() {
    return {
      isSubmitting: false,
      routePaths
    };
  },
  methods: {
    ...mapActions("users", ["login"]),
    async handleSubmit(form) {
      try {
        this.isSubmitting = true;
        await this.login(form);
        this.$router.push(routePaths.dashboard.home);
      } catch (error) {
        toastedError(this.$toasted, error.message);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>
