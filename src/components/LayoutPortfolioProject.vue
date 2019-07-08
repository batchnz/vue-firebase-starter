<template>
  <!-- Loading -->
  <VSpinner v-if="isLoading" />
  <!-- Error UI -->
  <div v-else-if="error">Project not found</div>
  <router-view v-else :project="project" />
</template>

<script>
// TODO, Better styled Error UI `TheErrorProtfolioProject.vue`
import { getPortfolioProject } from "@/firebase/actionsStore";
import { toastedError } from "@/helpers/toasted";
import VSpinner from "@/components/bases/VSpinner";
export default {
  name: "layout-portfolio-project",
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
    this.getPortfolioProject();
  },
  methods: {
    async getPortfolioProject() {
      try {
        this.project = await getPortfolioProject(this.$route.params.id);
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
