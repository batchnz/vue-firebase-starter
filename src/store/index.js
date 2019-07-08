import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import createPersistedState from "vuex-persistedstate";

import users from "./modules/users";
import userGroup from "./modules/userGroup";

Vue.use(Vuex);

const isDev = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    users,
    userGroup
  },
  actions: {},
  strict: isDev,
  devtools: isDev,
  plugins: [...(isDev ? [createLogger()] : []), createPersistedState()]
});
