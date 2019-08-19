<template>
  <li class="sidebar-nav__item">
    <router-link :to="projectLink" class="sidebar-nav__link">
      {{ project.name }}
      <VPill v-if="project.createdAt" className="bg-orange mb-4 ml-4">{{
        createdAt
      }}</VPill>
      <VPill v-if="updatedAt" type="warning" className="ml-4">{{
        updatedAt
      }}</VPill>
    </router-link>
    <VPill type="danger" className="ml-4" @clicked="onDeleteProject(project.id)"
      >⨉</VPill
    >
  </li>
</template>

<script>
import { routePaths } from "@/helpers/constants";
import { getDate } from "@/helpers";
import VPill from "@/components/bases/VPill";
export default {
  name: "project-list-item",
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  components: { VPill },
  data() {
    return {
      projectLink: routePaths.dashboard.project.view(this.project.id),
      projectEditLink: routePaths.dashboard.project.edit(this.project.id)
    };
  },
  computed: {
    createdAt() {
      if (this.project && this.project.createdAt) {
        return getDate(this.project.createdAt.toDate());
      }
      return null;
    },
    updatedAt() {
      if (this.project && this.project.updatedAt) {
        return getDate(this.project.updatedAt.toDate());
      }
      return null;
    }
  },
  methods: {
    onDeleteProject(projectUID) {
      this.$emit("onDelete", projectUID);
    }
  }
};
</script>
