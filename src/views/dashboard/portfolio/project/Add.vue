<template>
  <section>
    <TheFormPortfolioProjectCreate
      :isSubmitting="isSubmitting"
      @clicked="handleProjectCreate"
    />
    <VButtonLink
      :to="projectsHomeLink"
      text="Go back to projects"
      className="max-w-xs mt-6"
    />
  </section>
</template>

<script>
import { mapState } from "vuex";
import { addPortfolioProject } from "@/firebase/actionsStore";
import { routePaths } from "@/helpers/constants";
import { toastedError } from "@/helpers/toasted";

import VButtonLink from "@/components/bases/VButtonLink";
import TheFormPortfolioProjectCreate from "@/components/forms/TheFormPortfolioProjectCreate";
import { setTimeout } from "timers";

export default {
  name: "page-dashboard-portfolio-project-add",
  components: {
    VButtonLink,
    TheFormPortfolioProjectCreate
  },
  data() {
    return {
      isSubmitting: false,
      projectsHomeLink: routePaths.dashboard.portfolio.projects.home
    };
  },
  computed: {
    ...mapState("users", ["user"])
  },
  methods: {
    handleFormChange(form) {
      this.formPreview = form;
    },
    async handleProjectCreate(form) {
      try {
        const _this = this;
        this.isSubmitting = true;
        form.userID = this.user.uid;
        const projectID = await addPortfolioProject(form);
        setTimeout(function() {
          _this.$router.push(`/dashboard/portfolio/projects/${projectID}/edit`);
        }, 500);
      } catch (error) {
        toastedError(this.$toasted, error.message);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>
