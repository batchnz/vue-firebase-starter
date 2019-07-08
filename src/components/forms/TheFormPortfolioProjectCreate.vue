<template>
  <form @submit.prevent="handleSubmit">
    <VRow>
      <VColumn>
        <VLabel label-for="project-name-create" text="Project Name" />
        <VInput
          id="project-name-create"
          v-model="form.name"
          :value="form.name"
          type="text"
          name="projectNameCreate"
          placeholder="...?"
        />
      </VColumn>
    </VRow>
    <VButton
      type="submit"
      :disabled="isSubmitting"
      :text="isSubmitting ? 'Submitting' : 'Create'"
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
  name: "the-form-portfolio-project-create",
  components: {
    VRow,
    VLabel,
    VColumn,
    VButton,
    VInput
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
        name: ""
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
