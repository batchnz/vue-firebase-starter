<template>
  <form @submit.prevent="handleSubmit">
    <p>GroupB Form</p>
    <VRow>
      <!-- Phone -->
      <VColumn size="1/2">
        <VLabel label-for="phone" text="Phone" />
        <VInput
          id="phone"
          v-model="form.phone"
          :value="form.phone"
          name="phone"
          placeholder="03 421 6601"
          type="tel"
        />
      </VColumn>

      <!-- Website -->
      <VColumn size="full">
        <VLabel label-for="website" text="Website" />
        <VInput
          id="website"
          v-model="form.website"
          :value="form.website"
          name="website"
          placeholder="https://www.disney.com/"
          type="url"
        />
      </VColumn>

      <!-- Country -->
      <VColumn size="1/2">
        <VLabel label-for="country" text="country" />
        <TheDropdownCountry v-model="form.country" :value="form.country" />
      </VColumn>
    </VRow>
    <VButton
      type="submit"
      :disabled="isSubmitting"
      :text="
        isSubmitting
          ? 'Submitting'
          : (isRegister && 'Complete Registration') || 'Update'
      "
    />
  </form>
</template>

<script>
import VRow from "@/components/bases/VRow";
import VColumn from "@/components/bases/VColumn";
import VLabel from "@/components/bases/VLabel";
import VInput from "@/components/bases/VInput";
import VButton from "@/components/bases/VButton";

import TheDropdownCountry from "@/components/forms/TheDropdownCountry";

export default {
  name: "the-form-company",
  components: {
    VRow,
    VColumn,
    VLabel,
    VInput,
    VButton,
    TheDropdownCountry
  },
  props: {
    isSubmitting: {
      type: Boolean,
      default: false,
      required: false
    },
    isRegister: {
      type: Boolean,
      default: false,
      required: false
    },
    initialForm: {
      type: Object,
      default() {
        return {
          country: "New Zealand",
          phone: "",
          website: ""
        };
      },
      required: false
    }
  },
  data() {
    const { initialForm } = this;
    return {
      form: {
        phone: initialForm.phone,
        website: initialForm.website,
        // If props value re-write defaul props and it's empty
        country: initialForm.country || "New Zealand"
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
