<template>
  <div class="preview">
    <h2 class="mb-4">{{ project.name }}</h2>
    <h6 v-if="project.createdAt" class="mb-4">
      <VPill>{{ createdAt }}</VPill>
      <VPill v-if="updatedAt" type="warning" className="ml-4">{{
        updatedAt
      }}</VPill>
    </h6>
    <div v-if="project.description" v-html="project.description" />
  </div>
</template>

<script>
import { getDate } from "@/helpers";
import VPill from "@/components/bases/VPill";
export default {
  name: "portfolio-project-preview",
  props: {
    project: {
      type: Object,
      required: true
    },
    isEdit: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  components: { VPill },
  computed: {
    createdAt() {
      if (this.project && this.project.createdAt) {
        return getDate(this.project.createdAt.toDate());
      }
      return null;
    },
    updatedAt() {
      if (this.project && this.project.updatedAt) {
        return getDate(this.project.updatedAt.toDate());
      }
      return null;
    }
  }
};
</script>

<style scoped>
.preview {
  @apply mb-6 bg-white px-6 py-8;
}
</style>
