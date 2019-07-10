<template>
  <section>
    <ProjectPreview :project="formPreview" :isEdit="true" />
    <!-- Editor -->
    <TheFormProject
      :userID="user.uid"
      :isSubmitting="isSubmitting"
      :isEdit="true"
      :formPreview="formPreview"
      @clicked="handleUpdateProject"
      @changed="handleFormChange"
    />
    <!-- Go back link -->
    <VButtonLink
      :to="projectViewLink"
      text="Cancel Edit"
      type="danger"
      size="tiny"
      className="max-w-xs mt-6"
    />
  </section>
</template>

<script>
import { mapState } from "vuex";
import { toastedError, toastedSuccess } from "@/helpers/toasted";
import { routePaths } from "@/helpers/constants";
import VButtonLink from "@/components/bases/VButtonLink";
import TheFormProject from "@/components/forms/TheFormProject";
import ProjectPreview from "@/components/ProjectPreview";

import { updateProject } from "@/firebase/actionsStore";

export default {
  name: "page-dashboard-project-edit",
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  components: {
    VButtonLink,
    TheFormProject,
    ProjectPreview
  },
  data() {
    return {
      isSubmitting: false,
      formPreview: this.project,
      error: false,
      projectViewLink: routePaths.dashboard.project.view(this.$route.params.id)
    };
  },
  computed: {
    ...mapState("users", ["user"]),
    isLoading() {
      if (!this.formPreview && !this.error) return true;
      return false;
    }
  },
  watch: {
    error(newV) {
      if (newV) this.$route.push(routePaths.dashboard.home);
    }
  },
  methods: {
    handleFormChange(form) {
      this.formPreview = form;
    },
    async handleUpdateProject(form) {
      try {
        this.isSubmitting = true;
        // TODO, add error message to errorSchema()
        if (!this.user || !this.user.uid) throw new Error("Missing userID");
        if (!form) throw new Error("Missing form data");
        form.userID = this.user.uid;
        await updateProject(form, this.$route.params.id);
        toastedSuccess(this.$toasted, "The project is updated");
      } catch (error) {
        toastedError(this.$toasted, error.message);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>
