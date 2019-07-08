<template>
  <Spinner color="#9561e2" :loading="loading" />
</template>

<script>
import { ScaleLoader as Spinner } from "@saeris/vue-spinners";
export default {
  name: "v-spinner",
  props: {
    loading: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  components: { Spinner }
};
</script>
