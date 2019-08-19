<template>
  <form @submit.prevent="handleSubmit">
    <p>GroupA Form</p>
    <VRow>
      <!-- Phone -->
      <VColumn size="1/2">
        <VLabel label-for="phone" text="Phone" />
        <VInput
          id="phone"
          :value.sync="form.phone"
          placeholder="03 421 6601"
          type="tel"
          required
        />
      </VColumn>

      <!-- Website -->
      <VColumn size="1/2">
        <VLabel label-for="website" text="Webstie" />
        <VInput
          id="website"
          :value.sync="form.website"
          placeholder="https://www.disney.com/"
          type="url"
          required
        />
      </VColumn>

      <!-- Country -->
      <VColumn size="1/2">
        <VLabel label-for="country" text="country" />
        <VDropdown id="country" :value.sync="form.country" required>
          <option
            v-for="country in countries"
            :key="country.value"
            :value="country.value"
          >
            {{ country.label }}
          </option>
        </VDropdown>
      </VColumn>

      <!-- Biography -->
      <VColumn size="full">
        <VLabel label-for="biography" text="Biography" />
        <VTextarea
          id="biography"
          :value.sync="form.biography"
          placeholder="Say something about yourself?"
          required
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
import VDropdown from "@/components/bases/VDropdown";

export default {
  name: "the-form-user",
  components: {
    VRow,
    VColumn,
    VLabel,
    VInput,
    VDropdown,
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
      },
      countries: [
        { value: "New Zealand", label: "New Zealand" },
        { value: "Australia", label: "Australia" }
      ]
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
