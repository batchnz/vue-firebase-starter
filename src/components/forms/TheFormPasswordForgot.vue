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
    </VRow>
    <VButton text="Reset Password" type="submit" />
  </form>
</template>

<script>
import VRow from "@/components/bases/VRow";
import VColumn from "@/components/bases/VColumn";
import VLabel from "@/components/bases/VLabel";
import VInput from "@/components/bases/VInput";
import VButton from "@/components/bases/VButton";

export default {
  name: "the-form-password-forgot",
  components: {
    VRow,
    VColumn,
    VLabel,
    VInput,
    VButton
  },
  data() {
    return {
      form: {
        email: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("clicked", this.form);
    }
  }
};
</script>
