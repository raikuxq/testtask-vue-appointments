import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

/**
 * Vuex modules
 */
import appointments from "@/store/appointments";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    appointments
  },
  plugins: [
    createPersistedState({
      paths: ["appointments"]
    })
  ]
});
