<template>
  <section class="max-w-md m-auto">
    <h1
      class="text-xl md:text-4xl font-semibold leading-tight text-center mb-12"
    >
      Register
    </h1>
    <TheFormAuth
      :is-register="true"
      :isSubmitting="isSubmitting"
      @clicked="handleSubmit"
    />
    <div class="text-center mt-4">
      <router-link :to="routePaths.auth.login">
        Already have an account?
      </router-link>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import { firstLetterUppercase } from "@/helpers/index";
import { routePaths } from "@/helpers/constants";
import TheFormAuth from "@/components/forms/TheFormAuth";
import { toastedError } from "@/helpers/toasted";

export default {
  name: "page-auth-register-1",
  components: { TheFormAuth },
  data() {
    return {
      isSubmitting: false,
      routePaths
    };
  },
  methods: {
    ...mapActions("users", ["signup", "login"]),
    async handleSubmit(form) {
      try {
        this.isSubmitting = true;
        // TODO (1) Form integrity checking
        form.firstName = firstLetterUppercase(form.firstName);
        form.lastName = firstLetterUppercase(form.lastName);
        // (2) Signup
        await this.signup(form);
        // (3) Login
        await this.login(form);
        // (4) Redirect to next step
        setTimeout(() => {
          this.$router.push(routePaths.auth.register2);
        });
      } catch (error) {
        toastedError(this.$toasted, error.message);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>
