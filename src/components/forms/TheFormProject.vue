<template>
  <form @submit.prevent="handleSubmit">
    <VRow>
      <VColumn>
        <VLabel label-for="project-name" text="Project Name" />
        <VInput
          id="project-name"
          v-model="form.name"
          type="text"
          name="projectName"
          placeholder="Project Name"
          @input="handleOnEdit(false)"
        />
      </VColumn>
      <VColumn>
        <VLabel text="Project Description" />
        <div class="editor__wrapper">
          <VTextEditor @edit="handleOnEdit" :content="form.description" />
        </div>
      </VColumn>
    </VRow>
    <VButton
      type="submit"
      :disabled="isSubmitting"
      :text="isSubmitting ? 'Submitting' : isEdit ? 'Update' : 'Create'"
    />
  </form>
</template>

<script>
import VRow from "@/components/bases/VRow";
import VColumn from "@/components/bases/VColumn";
import VLabel from "@/components/bases/VLabel";
import VInput from "@/components/bases/VInput";
import VButton from "@/components/bases/VButton";
import VTextEditor from "@/components/bases/VTextEditor";

export default {
  name: "the-form-project",
  components: {
    VRow,
    VLabel,
    VColumn,
    VButton,
    VInput,
    VTextEditor
  },
  props: {
    isSubmitting: {
      type: Boolean,
      default: false,
      required: false
    },
    isEdit: {
      type: Boolean,
      default: false,
      required: false
    },
    formPreview: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      form: {
        name: (this.formPreview && this.formPreview.name) || "",
        images: (this.formPreview && this.formPreview.images) || [],
        description:
          (this.formPreview && this.formPreview.description) ||
          `
          <h3>Hi there,</h3>
          <p>Editor <em>supports</em> Markdown syntax.</p>
          <br>
          <blockquote>
            Your project looks amazing  👏
          </blockquote>
        `
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("clicked", this.form);
    },
    handleOnEdit(html) {
      if (html) this.form.description = html;
      this.$emit("changed", this.form);
    }
  }
};
</script>

<style>
.editor__wrapper {
  @apply bg-white p-6 my-6;
}
</style>
