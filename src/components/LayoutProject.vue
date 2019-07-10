<template>
  <!-- Loading -->
  <VSpinner v-if="isLoading" />
  <!-- Error UI -->
  <div v-else-if="error">Project not found</div>
  <router-view v-else :project="project" />
</template>

<script>
// TODO, Better styled Error UI `TheErrorProject.vue`
import { getProject } from "@/firebase/actionsStore";
import { toastedError } from "@/helpers/toasted";
import VSpinner from "@/components/bases/VSpinner";
export default {
  name: "layout-project",
  components: {
    VSpinner
  },
  data() {
    return {
      project: null,
      error: false
    };
  },
  computed: {
    isLoading() {
      if (!this.project && !this.error) return true;
      return false;
    }
  },
  mounted() {
    this.getProject();
  },
  methods: {
    async getProject() {
      try {
        this.project = await getProject(this.$route.params.id);
        if (!this.project)
          throw new Error("Oops! you seem in the wrong place.");
      } catch (error) {
        toastedError(this.$toasted, error.message);
        this.error = true;
      }
    }
  }
};
</script>
