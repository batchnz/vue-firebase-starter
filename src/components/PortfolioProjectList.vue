<template>
  <section>
    <!-- UI 1, spinner -->
    <VSpinner v-if="isLoading" />
    <!-- UI 2, When the user has no project -->
    <div v-else-if="!hasProject">No Project</div>
    <!-- UI 3, When the user has projects -->
    <ul v-else class="sidebar-nav__items">
      <PortfolioProjectListItem
        v-for="project in projects"
        :key="project.id"
        :project="project"
        @onDelete="handleProjectDelete"
      />
    </ul>
  </section>
</template>

<script>
import {
  getPortfolioProjectListByUser,
  deletePortfolioProject
} from "@/firebase/actionsStore";
import { toastedError, toastedInfo, toastedClear } from "@/helpers/toasted";
import VSpinner from "@/components/bases/VSpinner";
import PortfolioProjectListItem from "@/components/PortfolioProjectListItem";
export default {
  name: "portfolio-projects-list",
  components: { PortfolioProjectListItem, VSpinner },
  props: {
    userID: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      projects: [],
      isLoading: false
    };
  },
  mounted() {
    this.getProjectList();
  },
  computed: {
    hasProject() {
      if (this.projects && this.projects.length) return true;
      return false;
    }
  },
  methods: {
    async getProjectList() {
      try {
        this.isLoading = true;
        const projects = await getPortfolioProjectListByUser(this.userID);
        if (!projects || !projects.length) return true;
        this.projects = projects;
      } catch (error) {
        toastedError(this.$toasted, error.message);
      } finally {
        this.isLoading = false;
      }
    },
    async handleProjectDelete(projectUID) {
      try {
        toastedInfo(this.$toasted, "Deleting the project");
        await deletePortfolioProject(projectUID);
        // TODO, consider relace it whit a lodash method
        this.projects = this.projects.filter(
          project => project.id !== projectUID
        );
      } catch (error) {
        const _this = this;
        // * Avoid Notification run into racing condition
        setTimeout(function() {
          toastedError(_this.$toasted, error.message);
        }, 100);
      } finally {
        toastedClear(this.$toasted);
      }
    }
  }
};
</script>
