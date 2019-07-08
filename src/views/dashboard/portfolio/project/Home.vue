<template>
  <section>
    <PortfolioProjectList v-if="user.uid" :userID="user.uid" />
    <VButtonLink
      :to="routePaths.dashboard.portfolio.projects.add"
      text="Add new project"
    />
  </section>
</template>

<script>
// TODO, logout will cause user data missing and got console error
import { mapState } from "vuex";
import { routePaths } from "@/helpers/constants";
import PortfolioProjectList from "@/components/PortfolioProjectList";
import VButtonLink from "@/components/bases/VButtonLink";

export default {
  name: "page-dashboard-portfolio-project-home",
  components: { PortfolioProjectList, VButtonLink },
  data() {
    return {
      routePaths
    };
  },
  computed: {
    ...mapState("users", ["user"])
  }
};
</script>
