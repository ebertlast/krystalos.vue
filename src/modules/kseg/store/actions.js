export default {
  setUsusu: ({ commit }, usu) => {
    commit("setUsusu", usu);
  },
  initUsusu: ({ commit }) => {
    commit("initUsusu");
  },
  setToken: ({ commit }, token) => {
    // alert(token)
    commit("setToken", token);
  },
  clearUsusu: ({ commit }) => {
    commit("clearUsusu");
  }
}