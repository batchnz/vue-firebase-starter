<template>
  <form @submit.prevent="handleSubmit">
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

      <!-- Protfolio Address -->
      <VColumn size="full">
        <VLabel label-for="portfolio-address" text="Portfolio Address" />
        <VInput
          id="portfolio-address"
          v-model="form.portfolio"
          :value="form.portfolio"
          name="portfolio"
          placeholder="www.disney.com"
          type="url"
        />
      </VColumn>

      <!-- Specialty -->
      <VColumn size="2/3">
        <VLabel label-for="specialty" text="Specialty" />
        <TheDropdownSpecialty
          v-model="form.specialty"
          :value="form.experience"
        />
      </VColumn>

      <!-- Experience -->
      <VColumn size="1/3">
        <VLabel label-for="experience" text="Experience" />
        <TheDropdownExperience
          v-model="form.experience"
          :value="form.experience"
        />
      </VColumn>

      <!-- City -->
      <VColumn size="1/2">
        <VLabel label-for="city" text="City" />
        <TheDropdownCity v-model="form.city" :value="form.city" />
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

import TheDropdownCity from "@/components/forms/TheDropdownCity";
import TheDropdownCountry from "@/components/forms/TheDropdownCountry";
import TheDropdownExperience from "@/components/forms/TheDropdownExperience";
import TheDropdownSpecialty from "@/components/forms/TheDropdownSpecialty";

export default {
  name: "the-form-portfolio-company",
  components: {
    VRow,
    VColumn,
    VLabel,
    VInput,
    VButton,
    TheDropdownCity,
    TheDropdownCountry,
    TheDropdownExperience,
    TheDropdownSpecialty
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
          specialty: "Graphic, branding & design",
          experience: "World class",
          city: "Auckland",
          country: "New Zealand",
          phone: "",
          portfolio: ""
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
        portfolio: initialForm.portfolio,
        // If props value re-write defaul props and it's empty
        specialty: initialForm.specialty || "Graphic, branding & design",
        experience: initialForm.experience || "World class",
        city: initialForm.city || "Auckland",
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
