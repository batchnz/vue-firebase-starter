<template>
  <form @submit.prevent="handleSubmit">
    <VRow>
      <VColumn>
        <VLabel text="Email" label-for="email" />
        <VInput
          id="email"
          v-model="form.email"
          name="email"
          placeholder="walt@disney.com"
          type="email"
        />
      </VColumn>
      <VColumn>
        <VLabel label-for="password" text="Password" />
        <VInput
          id="password"
          v-model="form.password"
          name="password"
          type="password"
        />
        <router-link
          :to="routePaths.auth.forgotPassword"
          class="text-sm inline-block mt-2"
        >
          Forgot your password?
        </router-link>
      </VColumn>
    </VRow>
    <VButton
      type="submit"
      :disabled="isSubmitting"
      :text="isSubmitting ? 'Submitting' : 'Login'"
    />
  </form>
</template>

<script>
import { routePaths } from "@/helpers/constants";
import VRow from "@/components/bases/VRow";
import VColumn from "@/components/bases/VColumn";
import VLabel from "@/components/bases/VLabel";
import VInput from "@/components/bases/VInput";
import VButton from "@/components/bases/VButton";

export default {
  name: "the-form-login",
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
        email: "",
        password: ""
      },
      routePaths
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("clicked", this.form);
    }
  }
};
</script>
