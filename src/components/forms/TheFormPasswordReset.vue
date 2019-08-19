<template>
  <form @submit.prevent="handleSubmit">
    <VRow>
      <!-- Password -->
      <VColumn size="1/2">
        <VLabel label-for="password" text="Password" />
        <VInput
          id="password"
          :value.sync="form.password"
          type="password"
          autocomplete="new-password"
        />
      </VColumn>
      <!-- Password Confirm -->
      <VColumn size="1/2">
        <VLabel label-for="password-confirm" text="Confirm Password" />
        <VInput
          id="password-confirm"
          :value.sync="form.passwordConfirm"
          type="password"
          autocomplete="new-password"
        />
      </VColumn>
    </VRow>
    <VButton
      type="submit"
      :idsabled="isSubmitting"
      :text="isSubmitting ? 'Reset Password' : 'Reset Password'"
    />
  </form>
</template>

<script>
import VRow from "@/components/bases/VRow";
import VColumn from "@/components/bases/VColumn";
import VLabel from "@/components/bases/VLabel";
import VInput from "@/components/bases/VInput";
import VButton from "@/components/bases/VButton";

export default {
  name: "the-form-password-reset",
  components: {
    VRow,
    VColumn,
    VLabel,
    VInput,
    VButton
  },
  props: {
    isSubmitting: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      form: {
        password: "",
        passwordConfirm: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("clicked", this.form);
      if (this.form.password || this.form.passwordConfirm) {
        this.form.password = "";
        this.form.passwordConfirm = "";
      }
    }
  }
};
</script>
