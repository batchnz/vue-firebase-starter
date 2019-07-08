<template>
  <main class="font-sans leading-normal antialiased">
    <TheNavBar />
    <router-view />
  </main>
</template>

<script>
import { routePaths } from "@/helpers/constants";
import TheNavBar from "@/components/TheNavBar";

export default {
  name: "layout-auth",
  components: { TheNavBar },
  data() {
    return {
      routePaths
    };
  }
};
</script>
