<template>
  <section class="max-w-sm m-auto">
    <h1
      class="text-xl md:text-4xl font-semibold leading-tight text-center mb-12"
    >
      Forgot Password
    </h1>
    <TheFormPasswordForgot @clicked="handleSubmit" />
    <div class="text-center mt-4">
      <router-link :to="routePaths.auth.login">
        Remember your password?
      </router-link>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import TheFormPasswordForgot from "@/components/forms/TheFormPasswordForgot";
import { routePaths } from "@/helpers/constants";
import { toastedError, toastedSuccess } from "@/helpers/toasted";

export default {
  name: "page-auth-forgot-password",
  components: { TheFormPasswordForgot },
  data() {
    return {
      routePaths
    };
  },
  methods: {
    ...mapActions("users", ["sendEmailResetPassword"]),
    async handleSubmit(form) {
      try {
        const { $router } = this;
        // TODO, (1) check form validation
        // (2) set redirect message
        toastedSuccess(this.$toasted, "Reset password email is sent.");
        // (3) send reset password requests
        await this.sendEmailResetPassword(form.email);
        // (4) Fouce redirect user if no action about
        setTimeout(function() {
          $router.push(routePaths.auth.login);
        }, 5000);
      } catch (error) {
        toastedError(this.$toasted, error.message);
      }
    }
  }
};
</script>
