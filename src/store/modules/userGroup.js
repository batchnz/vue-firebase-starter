import { errorToObject } from "@/helpers/errorHandler";
import { getUserGroupList } from "@/firebase/actionsStore";

// initial state
const state = {
  groups: []
};

const mutations = {
  setGroups(state, groups) {
    state.groups = groups;
  }
};

/**
 * Actions context
 * https://vuex.vuejs.org/api/#actions
 */
const actions = {
  async getUserGroups({ commit }) {
    try {
      const groups = await getUserGroupList();
      commit("setGroups", groups);
    } catch (error) {
      throw errorToObject(error);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
