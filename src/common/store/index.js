import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { default as actions } from "./actions";
import { default as getters } from "./getters";
import { default as mutations } from "./mutations";
import { default as states } from "./states";

// #region Módulos
import { default as modules } from "../../modules";
// #endregion
export default new Vuex.Store({
  // namespaced: true,
  actions: actions,
  getters: getters,
  mutations: mutations,
  state: states,
  modules: {
    kcentral: modules.kcentral.store,
    kseg: modules.kseg.store,
    dynamic_report: modules.dynamic_report.store,
    kryocr: modules.kryocr.store,
    klog: modules.klog.store,
    krycnf: modules.krycnf.store,
    kasis: modules.kasis.store,
    klab: modules.klab.store,
    kinv: modules.kinv.store
  }
});