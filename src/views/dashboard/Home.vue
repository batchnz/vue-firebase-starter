<template>
  <section></section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "page-dashboard-home",
  computed: {
    ...mapState("users", ["user"])
  }
};
</script>
