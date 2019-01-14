import { default as mutations } from "./mutations";
import { default as actions } from "./actions";
import { default as state } from "./states";
import { default as getters } from "./getters";
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
};
