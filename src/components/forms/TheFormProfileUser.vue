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

      <!-- Address -->
      <VColumn size="1/2">
        <VLabel label-for="website" text="Webstie" />
        <VInput
          id="website"
          v-model="form.website"
          :value="form.website"
          name=""
          placeholder="www.disney.com"
          type="url"
        />
      </VColumn>

      <!-- Country -->
      <VColumn size="1/2">
        <VLabel label-for="country" text="country" />
        <TheDropdownCountry v-model="form.country" :value="form.country" />
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
import VButton from "@/components/bases/VButton";

export default {
  name: "the-form-user",
  components: {
    VRow,
    VColumn,
    VLabel,
    VInput,
    VTextarea,
    VButton
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
          // TODO, the hard-code data shold be move into constants.js
          phone: "",
          biography: "",
          country: "New Zealand",
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
        biography: initialForm.biography,
        // If props value re-write defaul props and it's empty
        country: initialForm.country || "New Zealand",
        website: initialForm.website
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
