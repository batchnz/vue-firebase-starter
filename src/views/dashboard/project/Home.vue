<template>
  <section>
    <ProjectList v-if="user.uid" :userID="user.uid" />
    <VButtonLink
      :to="routePaths.dashboard.projects.add"
      text="Add new project"
    />
  </section>
</template>

<script>
// TODO, logout will cause user data missing and got console error
import { mapState } from "vuex";
import { routePaths } from "@/helpers/constants";
import ProjectList from "@/components/ProjectList";
import VButtonLink from "@/components/bases/VButtonLink";

export default {
  name: "page-dashboard-project-home",
  components: { ProjectList, VButtonLink },
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
