<template>
  <section>
    <h1 class="text-4xl leading-none mb-16">Portfolio</h1>
    <VSpinner v-if="isLoading" />
    <template v-else>
      <!-- Warning Box -->
      <details
        v-if="userDoc && userDoc.claims && !userDoc.claims.isCompleted"
        class="mb0-4"
      >
        <summary class="text-red mb-4">
          Warning! you haven't completed your user portfolio.
        </summary>
        <p>Please fill up the form.</p>
      </details>
      <!-- Group dispaly
      <h3 class="mb-4">{{ userGroup.name }} Form</h3> -->
      <!-- Form -->
      <TheFormProfileUser
        v-if="userGroup.id === groupConst.user.id"
        :initial-form="userDoc"
        :isSubmitting="isSubmitting"
        @clicked="handleUpdateProfile"
      />
      <TheFormProfileCompany
        v-else-if="userGroup.id === groupConst.company.id"
        :initial-form="userDoc"
        :isSubmitting="isSubmitting"
        @clicked="handleUpdateProfile"
      />
      <p v-else>
        Oops, something wrong, Please refresh the page.
      </p>
      <!-- Form Avatar -->
      <TheFormAvatar :user="user" />
    </template>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { userGroup as groupConst } from "@/helpers/constants";
import { toastedError, toastedSuccess } from "@/helpers/toasted";
import TheFormProfileUser from "@/components/forms/TheFormProfileUser";
import TheFormProfileCompany from "@/components/forms/TheFormProfileCompany";
import TheFormAvatar from "@/components/forms/TheFormAvatar";
import VSpinner from "@/components/bases/VSpinner";
export default {
  name: "page-dashboard-portfolio",
  components: {
    TheFormProfileUser,
    TheFormProfileCompany,
    TheFormAvatar,
    VSpinner
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
      if (!groups || !userDoc) return null;
      const v = groups.find(group => group.id === userDoc.groupID);
      return v;
    },
    isLoading() {
      if (!this.groups || !this.groups.length || !this.userDoc) return true;
      return false;
    }
  },
  async mounted() {
    try {
      const { user, userDoc } = this.$store.state.users;
      const { groups } = this.$store.state.userGroup;
      // (1)
      if (groups && groups.length && userDoc) return true;
      // (2)
      const fetchingList = [];
      if (!groups || !groups.length) {
        fetchingList.push(this.$store.dispatch("userGroup/getUserGroups"));
      }
      if (!userDoc) {
        fetchingList.push(
          this.$store.dispatch("users/reloadUserDoc", user.uid)
        );
      }
      await Promise.all(fetchingList);
    } catch (error) {
      toastedError(this.$toasted, error.message);
    }
  },
  methods: {
    ...mapActions("users", ["updateProfile", "reloadUserDoc"]),
    async handleUpdateProfile(form) {
      try {
        this.isSubmitting = true;
        // TODO, (1) Form Validation
        // (2) Update profile
        await this.updateProfile(form);
        // (3) Get User Collection
        await this.reloadUserDoc(this.user.uid);
        // (4) Success Message
        toastedSuccess(this.$toasted, "Your portfolio is updated.");
      } catch (error) {
        toastedError(this.$toasted, error.message);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>
