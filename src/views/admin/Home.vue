<template>
  <section>
    <VSpinner v-if="isLoading" />
    <template v-else>
      <table v-if="hasUserList" class="w-full">
        <thead>
          <tr class="bg-grey-light">
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Website</td>
            <td>isAdmin</td>
            <td>isCompleted</td>
            <td>Set Addmin</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name && user.name }}</td>
            <td>{{ user.email && user.email }}</td>
            <td>{{ user.phone && user.phone }}</td>
            <td>{{ user.website && user.website }}</td>
            <td>{{ user.claims && user.claims.admin ? "Yes" : "No" }}</td>
            <td>{{ user.claims && user.claims.isCompleted ? "Yes" : "No" }}</td>
            <td>
              <VButton
                text="Add"
                className="mr-2"
                @clicked="handleSetAdminRole(user.uid, true)"
              />
              <VButton
                text="Remove"
                className="mr-2"
                @clicked="handleSetAdminRole(user.uid, false)"
              />
              <VButton text="Delete" @clicked="handleDeleteUser(user.uid)" />
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </section>
</template>

<script>
import { mapState } from "vuex";
import VSpinner from "@/components/bases/VSpinner";
import VButton from "@/components/bases/VButton";
import { toastedError, toastedSuccess } from "@/helpers/toasted";
import { getUserList as retrieveUserList } from "@/firebase/actionsStore";
import {
  setAdminRole,
  getUserList,
  deleteUser
} from "@/firebase/actionsFunction";

export default {
  name: "page-admin-home",
  components: { VSpinner, VButton },
  data() {
    return {
      users: [],
      isLoading: false
    };
  },
  computed: {
    ...mapState("users", ["user"]),
    hasUserList() {
      return Boolean(this.users && this.users.length);
    }
  },
  mounted() {
    this.handleGetUserList();
  },
  methods: {
    async handleSetAdminRole(uid, admin) {
      try {
        const successMsg = await setAdminRole({ uid, admin });
        this.users = this.users.map(user => {
          if (user.uid === uid) user.claims.admin = admin;
          return user;
        });
        toastedSuccess(this.$toasted, successMsg.message);
      } catch (error) {
        toastedError(this.$toasted, error.message);
      }
    },
    async handleGetUserList() {
      try {
        this.isLoading = true;
        const [userAuthList, userDocList] = await Promise.all([
          getUserList(),
          retrieveUserList()
        ]);
        const userList = userAuthList.map(userAuth => {
          const userDoc = userDocList.find(
            _userDoc => _userDoc.id === userAuth.uid
          );
          Object.assign(userAuth.claims, userDoc && userDoc.claims);
          if (userDoc && userDoc.claims) delete userDoc.claims;
          return {
            ...(userDoc && userDoc),
            ...userAuth
          };
        });
        this.users = userList;
      } catch (error) {
        toastedError(this.$toasted, error.message);
      } finally {
        this.isLoading = false;
      }
    },
    async handleDeleteUser(uid) {
      try {
        const successMsg = await deleteUser({ uid });
        this.users = this.users.filter(user => user.uid !== uid);
        toastedSuccess(this.$toasted, successMsg.message);
      } catch (error) {
        toastedError(this.$toasted, error.message);
      }
    }
  }
};
</script>
