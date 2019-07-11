<template>
  <section>
    <h1 class="text-4xl leading-none mb-16">Account</h1>
    <TheFormAuth
      :initial-form="user"
      :isSubmitting="isSubmitting"
      @clicked="handleUpdateUserAccount"
      className="mb-6 pb-6 border-b-2 border-gray-light"
    />
    <TheFormPasswordReset
      :isSubmitting="isSubmittingPasswordReset"
      @clicked="handleResetPassword"
    />
  </section>
</template>

<script>
import { pickBy } from "lodash";
import { mapState, mapActions } from "vuex";
import TheFormAuth from "@/components/forms/TheFormAuth";
import TheFormPasswordReset from "@/components/forms/TheFormPasswordReset";
import { updatePassword } from "@/firebase/actionsAuth";
import { toastedError, toastedSuccess } from "@/helpers/toasted";

export default {
  name: "page-dashboard-account",
  components: { TheFormAuth, TheFormPasswordReset },
  data() {
    return {
      isSubmitting: false,
      isSubmittingPasswordReset: false
    };
  },
  computed: {
    ...mapState("users", ["user"])
  },
  methods: {
    ...mapActions("users", ["updateAuthInfo"]),
    async handleUpdateUserAccount(form) {
      try {
        this.isSubmitting = true;
        // TODO, (1) Form Validation
        // (2) Update firebase Auth
        const compactedForm = pickBy(form);
        await this.updateAuthInfo(compactedForm);
        // (3) Sent Success message
        toastedSuccess(this.$toasted, "your account info is updated");
      } catch (error) {
        toastedError(this.$toasted, error.message);
      } finally {
        this.isSubmitting = false;
      }
    },
    async handleResetPassword(form) {
      try {
        this.isSubmittingPasswordReset = true;
        const { password, passwordConfirm } = form;
        // (1) Form Validation
        if (!password || !passwordConfirm) {
          throw new Error("The form hasn't been completed.");
        }
        if (password !== passwordConfirm) {
          throw new Error("Password word does not match.");
        }
        // (2) Updating Password
        await updatePassword(password);
        // (3) Finish
        toastedSuccess(this.$toasted, "your password info is updated");
      } catch (error) {
        toastedError(this.$toasted, error.message);
      } finally {
        this.isSubmittingPasswordReset = false;
      }
    }
  }
};
</script>
