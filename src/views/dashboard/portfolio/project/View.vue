<template>
  <section>
    <PortfolioProjectPreview :project="project" />
    <VButtonLink :to="projectEditLink" text="Edit" />
  </section>
</template>

<script>
import { routePaths } from "@/helpers/constants";

import VButtonLink from "@/components/bases/VButtonLink";
import PortfolioProjectPreview from "@/components/PortfolioProjectPreview";
export default {
  name: "page-dashboard-portfolio-project",
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  components: {
    VButtonLink,
    PortfolioProjectPreview
  },
  data() {
    return {
      projectEditLink: routePaths.dashboard.portfolio.projects.edit(
        this.$route.params.id
      )
    };
  }
};
</script>
