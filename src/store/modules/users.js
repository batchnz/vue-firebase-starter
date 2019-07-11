import consola from "consola";
import { errorToObject, errorMsg } from "@/helpers/errorHandler";
import { routePaths } from "@/helpers/constants";
import { fireAuth, fireStore } from "@/firebase/index";
import {
  updateAuthInfo,
  updatePassword,
  updateAuthEmail,
  sendPasswordResetEmail
} from "@/firebase/actionsAuth";
import router from "@/router";

// initial state
const state = {
  user: null,
  userDoc: null
};

const getters = {
  isAuthenticated(state) {
    return Boolean(state.user && state.user.uid);
  },
  isAdmin(state) {
    return Boolean(state.user && state.user.claims && state.user.claims.admin);
  }
};

const mutations = {
  setUser(state, user) {
    if (!user) {
      state.user = user;
    } else {
      state.user = {
        ...(state.user && state.user),
        ...(user.displayName && {
          firstName: user.displayName.split(" ")[0],
          lastName: user.displayName.split(" ")[1]
        }),
        ...(user.firstName && { firstName: user.firstName }),
        ...(user.lastName && { lastName: user.lastName }),
        ...(user.email && { email: user.email }),
        ...(user.uid && { uid: user.uid })
      };
      if (user.claims && user.claims.admin) {
        if (!state.user.claim) state.user.claim = {};
        Object.assign(state.user.claim, { admin: user.claims.admin });
      }
    }
  },
  setUserDoc(state, userDoc) {
    if (!userDoc) state.userDoc = userDoc;
    else
      state.userDoc = {
        ...state.userDoc,
        ...userDoc
      };
  }
};

/**
 * Actions context
 * https://vuex.vuejs.org/api/#actions
 */
const actions = {
  async signup({ commit }, form) {
    try {
      if (!form) throw new Error(errorMsg.form);
      const userRef = fireStore.collection("user");
      const { email, password, firstName, lastName, group: groupID } = form;
      // 1. Create new user in firebase auth
      const { user } = await fireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      // 2. Update the new user in firebase Auth with extra info
      const updateAuthProfile = user.updateProfile({
        displayName: `${firstName} ${lastName}`
      });
      // 3.Store user's basic info in fireStore user collection
      const createNewUserDoc = userRef.doc(user.uid).set({
        userID: user.uid,
        groupID,
        claims: { isCompleted: false }
      });
      await Promise.all([updateAuthProfile, createNewUserDoc]);
      commit("setUserDoc", {
        userID: user.uid,
        groupID,
        claims: { isCompleted: false }
      });
      commit("setUser", user);
      return true;
    } catch (error) {
      throw errorToObject(error);
    }
  },
  async login({ commit }, form) {
    try {
      if (!form) throw new Error(errorMsg.form);
      const { email, password } = form;
      // ! Causing: The message port closed before a response was received, Chrome Error
      const { user } = await fireAuth.signInWithEmailAndPassword(
        email,
        password
      );
      const { claims } = await user.getIdTokenResult();
      user.claims = {};
      if (claims) Object.assign(user.claims, claims);
      commit("setUser", user);
      return true;
    } catch (error) {
      throw errorToObject(error);
    }
  },
  async onAuthStateChanged({ getters, commit, dispatch }) {
    try {
      const { isAuthenticated } = getters;
      fireAuth.onAuthStateChanged(async user => {
        if (user) {
          consola.info("Authenticated User - auto signin");
          if (!isAuthenticated) {
            const { claims } = await user.getIdTokenResult();
            if (!user.claims) user.claims = {};
            if (claims) Object.assign(user.claims, claims);
            commit("setUser", user);
            router.push(routePaths.dashboard.home);
          }
        } else {
          consola.info("Unauthenticated User - auto signout");
          if (isAuthenticated) await dispatch("logout");
        }
      });
    } catch (error) {
      throw errorToObject(error);
    }
  },
  async logout({ commit }) {
    try {
      /*
        ! Caveat !
        * (Case 1) If directing user before clean up the data, Route's Guard will have side effect
        * (Case 2)If directing user after clean up the data,
        *         There is short moment that component will missing props and have unexpected errors
      */
      commit("setUser", null);
      // Redirect user at action level
      // for more fine grounded controls
      router.push(routePaths.auth.login);
      commit("setUserDoc", null);
      await fireAuth.signOut();
      return true;
    } catch (error) {
      throw errorToObject(error);
    }
  },
  async updateAuthPassword(_, password) {
    try {
      await updatePassword(password);
    } catch (error) {
      throw error;
    }
  },
  async updateAuthInfo({ commit }, form) {
    try {
      if (!form) throw new Error(errorMsg.form);
      await updateAuthInfo(form);
      if (form.email) {
        await updateAuthEmail(form.email);
      }
      commit("setUser", form);
    } catch (error) {
      throw errorToObject(error);
    }
  },
  async updateProfile({ state }, form) {
    try {
      const userRef = fireStore.collection("user");
      await userRef.doc(state.user.uid).update({
        // form is not required
        ...(form && form),
        ...(!state.userDoc.claims.isCompleted && {
          claims: { isCompleted: true }
        })
      });
      return true;
    } catch (error) {
      throw errorToObject(error);
    }
  },
  async reloadUserDoc({ commit }, uid) {
    try {
      if (!uid) throw new Error(errorMsg.uid);
      const userRef = fireStore.collection("user");
      const userSnapshot = await userRef.doc(uid).get();
      const userDoc = userSnapshot.data();
      commit("setUserDoc", userDoc);
    } catch (error) {
      throw errorToObject(error);
    }
  },
  async reloadUserAuth({ commit }) {
    try {
      const user = await fireAuth.currentUser;
      if (user) commit("setUser", user);
      return true;
    } catch (error) {
      throw errorToObject(error);
    }
  },
  async sendEmailResetPassword(_, email) {
    try {
      await sendPasswordResetEmail(email);
      return true;
    } catch (error) {
      throw errorToObject(error);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
