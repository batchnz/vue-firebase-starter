<template>
  <div class="lg:flex lg:h-screen">
    <div class="bg-white text-black lg:w-1/2 p-10 md:p-16 xl:p-32">
      <div class="h-full w-full overflow-y-auto">
        <header class="md:h-full">
          <h1 class="text-xl md:text-4xl font-medium leading-tight mb-6">
            Vue Firebase starter
          </h1>
          <div class="text-sm md:text-lg rte md:w-4/5 mb-8 mb:mb-16">
            <ul class="list-reset">
              <VTickItem text="VTickItem component 1" />
              <VTickItem text="VTickItem component 2" />
            </ul>
            <p>
              Please register below.
            </p>
          </div>
          <template v-if="isAuthenticated">
            <router-link
              :to="routePaths.dashboard.home"
              class="button button--primary mb-4"
            >
              Go to your dashboard
            </router-link>
          </template>
          <template v-else>
            <router-link
              :to="routePaths.auth.register"
              class="button button--primary mb-4"
            >
              Register
            </router-link>
            <router-link :to="routePaths.auth.login">
              Already have an account?
            </router-link>
          </template>
        </header>
      </div>
    </div>
    <div
      class="hidden lg:block w-1/2 h-full bg-cover bg-right-bottom bg-no-repeat"
      :style="{ backgroundImage: `url('${bgImg}')` }"
    ></div>
  </div>
</template>

<script>
import bgImg from "@/assets/img/bg-3.jpg";

import { mapGetters } from "vuex";
import { routePaths } from "@/helpers/constants";
import VTickItem from "@/components/bases/VTickItem";

export default {
  name: "page-home",
  components: { VTickItem },
  data() {
    return {
      routePaths,
      bgImg
    };
  },
  computed: {
    ...mapGetters("users", ["isAuthenticated"])
  }
};
</script>
