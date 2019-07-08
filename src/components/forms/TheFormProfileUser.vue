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

      <VColumn size="1/2">
        <VLabel label-for="" text="Skills" />
        <Multiselect
          v-model="form.skills"
          multiple="multiple"
          :options="skillList"
        />
      </VColumn>

      <!-- Portfolio Address -->
      <VColumn size="1/2">
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
      <VColumn size="1/2">
        <VLabel label-for="specialty" text="Specialty" />
        <TheDropdownSpecialty
          v-model="form.specialty"
          :value="form.specialty"
        />
      </VColumn>

      <!-- Experience -->
      <VColumn size="1/2">
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

      <!-- Standard Rate -->
      <VColumn size="full">
        <VLabel label-for="rate" text="Standard Rate ($)" />
        <VInput
          id="rate"
          v-model.number="form.rate"
          :value="form.rate"
          name="rate"
          placeholder="85"
          type="number"
        />
      </VColumn>

      <!-- Biography -->
      <VColumn size="full">
        <VLabel label-for="biography" text="Biography" />
        <VTextarea
          name="biography"
          id="biography"
          v-model="form.biography"
          :value="form.biography"
          placeholder="Say something about yourself?"
        />
      </VColumn>

      <!-- Accepting Work -->
      <VColumn size="full">
        <VCheckbox
          name="isAcceptingWork"
          v-model="form.isAcceptingWork"
          :value="form.isAcceptingWork"
          text="Are you accepting work?"
        />
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
import VTextarea from "@/components/bases/VTextarea";
import VCheckbox from "@/components/bases/VCheckbox";
import VButton from "@/components/bases/VButton";
import Multiselect from "vue-multiselect";

import TheDropdownCity from "@/components/forms/TheDropdownCity";
import TheDropdownCountry from "@/components/forms/TheDropdownCountry";
import TheDropdownExperience from "@/components/forms/TheDropdownExperience";
import TheDropdownSpecialty from "@/components/forms/TheDropdownSpecialty";

export default {
  name: "the-form-portfolio-user",
  components: {
    VRow,
    VColumn,
    VLabel,
    VInput,
    VTextarea,
    VCheckbox,
    VButton,
    Multiselect,
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
          skills: [],
          // TODO, the hard-code data shold be move into constants.js
          specialty: "Graphic, branding & design",
          experience: "World class",
          city: "Auckland",
          country: "New Zealand",
          phone: "",
          biography: "",
          portfolio: "",
          rate: 0,
          isAcceptingWork: false
        };
      },
      required: false
    }
  },
  data() {
    const { initialForm } = this;
    return {
      skillList: ["Web Design", "Wireframing", "Moble Development"],
      form: {
        phone: initialForm.phone,
        portfolio: initialForm.portfolio,
        biography: initialForm.biography,
        // If props value re-write defaul props and it's empty
        skills: initialForm.skills || [],
        specialty: initialForm.specialty || "Graphic, branding & design",
        experience: initialForm.experience || "World class",
        city: initialForm.city || "Auckland",
        country: initialForm.country || "New Zealand",
        rate: initialForm.rate,
        // Force conver to Boolean value
        isAcceptingWork: Boolean(initialForm.isAcceptingWork)
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
