<template>
  <section>
    <ProjectPreview :project="project" />
    <VButtonLink :to="projectEditLink" text="Edit" />
  </section>
</template>

<script>
import { routePaths } from "@/helpers/constants";

import VButtonLink from "@/components/bases/VButtonLink";
import ProjectPreview from "@/components/ProjectPreview";
export default {
  name: "page-dashboard-project",
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  components: {
    VButtonLink,
    ProjectPreview
  },
  data() {
    return {
      projectEditLink: routePaths.dashboard.projects.edit(this.$route.params.id)
    };
  }
};
</script>
