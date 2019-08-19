<template>
  <section class="max-w-md m-auto">
    <h1
      class="text-xl md:text-4xl font-semibold leading-tight text-center mb-12"
    >
      Register
    </h1>
    <div v-if="userGroup">
      <TheFormProfileGroupA
        v-if="userGroup.id === groupConst.groupA.id"
        :is-register="true"
        :isSubmitting="false"
        @clicked="handleSubmit"
      />
      <TheFormProfileGroupB
        v-if="userGroup.id === groupConst.groupB.id"
        :is-register="true"
        :isSubmitting="false"
        @clicked="handleSubmit"
      />
    </div>
    <div v-else>
      <p>Oops, something wrong, Please refresh the page.</p>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import store from "@/store";
import TheFormProfileGroupB from "@/components/forms/TheFormProfileGroupB";
import TheFormProfileGroupA from "@/components/forms/TheFormProfileGroupA";
import { routePaths, userGroup as groupConst } from "@/helpers/constants";
import { toastedError, toastedInfo } from "@/helpers/toasted";

export default {
  name: "page-auth-register-2",
  components: { TheFormProfileGroupA, TheFormProfileGroupB },
  async beforeRouteEnter(to, from, next) {
    // In-component Router Guard
    try {
      const { "users/isAuthenticated": isAuthenticated } = store.getters;
      if (!isAuthenticated) {
        toastedInfo(false, "Please completed the first step of registration");
        return next(routePaths.auth.register);
      }
      const { user, userDoc } = store.state.users;
      const { groups } = store.state.userGroup;
      if (!userDoc || !groups || !groups.length) {
        const fetchingList = [];
        if (!groups || !groups.length)
          fetchingList.push(store.dispatch("userGroup/getUserGroups"));
        if (!userDoc)
          fetchingList.push(store.dispatch("users/reloadUserDoc", user.uid));
        await Promise.all(fetchingList);
      }
      if (userDoc && userDoc.claims && userDoc.claims.isCompleted) {
        toastedInfo(false, "You've already completed the registeration");
        return next(routePaths.dashboard.home);
      }
      next();
    } catch (error) {
      next(error);
    }
  },
  data() {
    return {
      isSubmitting: false,
      groupConst
    };
  },
  computed: {
    ...mapState("users", ["user", "userDoc"]),
    ...mapState("userGroup", ["groups"]),
    userGroup() {
      const { groups, userDoc } = this;
      return groups.find(group => group.id === userDoc.groupID);
    }
  },
  methods: {
    ...mapActions("users", ["updateProfile", "reloadUserDoc"]),
    async handleSubmit(form) {
      try {
        this.isSubmitting = true;
        // TODO, (1) Form Validation
        // (2) Update user profile
        await this.updateProfile(form);
        // (3) Reload user profile
        await this.reloadUserDoc(this.user.uid);
        // (4) Redirect
        this.$router.push(routePaths.dashboard.home);
      } catch (error) {
        toastedError(this.$toasted, error.message);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>
