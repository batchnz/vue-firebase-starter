<template>
  <main class="font-sans leading-normal antialiased">
    <div class="lg:flex lg:h-screen">
      <div class="lg:h-full lg:w-80 p-10 xl:p-12 xl:pt-16 bg-white">
        <Sidebar />
      </div>
      <div class="lg:flex-1 h-full p-10 xl:py-16 xl:px-24 bg-grey-lightest">
        <router-view />
      </div>
    </div>
  </main>
</template>

<script>
import { default as Sidebar } from "@/components/DashboardSidebar";

export default {
  name: "layout-dashboard",
  components: { Sidebar }
};
</script>
