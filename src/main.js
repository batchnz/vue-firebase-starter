import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import Toasted from "vue-toasted";
import VueCloudinary from "vue-cloudinary";
// import "./registerServiceWorker";
import "@/assets/css/tailwind.css";

Vue.config.productionTip = false;
Vue.use(Toasted);
Vue.use(VueCloudinary, { cloud_name: "batch" });

new Vue({
  router,
  store,
  render: h => h(App),
  async created() {
    try {
      // Checking user status in firebase on the page load
      store.dispatch("users/onAuthStateChanged");
    } catch (error) {
      this.$router.onError(error);
    }
  }
}).$mount("#app");
