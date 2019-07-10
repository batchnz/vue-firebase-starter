<template>
  <section>
    <TheFormProjectCreate
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
import { addProject } from "@/firebase/actionsStore";
import { routePaths } from "@/helpers/constants";
import { toastedError } from "@/helpers/toasted";

import VButtonLink from "@/components/bases/VButtonLink";
import TheFormProjectCreate from "@/components/forms/TheFormProjectCreate";

export default {
  name: "page-dashboard-project-add",
  components: {
    VButtonLink,
    TheFormProjectCreate
  },
  data() {
    return {
      isSubmitting: false,
      projectsHomeLink: routePaths.dashboard.projects.home
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
        const projectID = await addProject(form);
        setTimeout(function() {
          _this.$router.push(`/dashboard/projects/${projectID}/edit`);
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
