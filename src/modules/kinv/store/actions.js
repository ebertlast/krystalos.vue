import axios from "axios"
export default {
  refrescarIclas: ({ commit }, payload) => {
    if (!payload) {
      axios
        .get(`icla/`)
        .then(res => {
          commit("setIclas", res.result.recordset);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      commit("setIclas", payload);
    }
  },
  refrescarIclahs: ({ commit }, payload) => {
    if (!payload) {
      axios
        .get(`iclah/`)
        .then(res => {
          commit("setIclahs", res.result.recordset);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      commit("setIclahs", payload);
    }
  },
  refrescarIgrus: ({ commit }, payload) => {
    if (!payload) {
      axios
        .get(`igru/`)
        .then(res => {
          commit("setIgrus", res.result.recordset);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      commit("setIgrus", payload);
    }
  },
  refrescarIpacs: ({ commit }, payload) => {
    if (!payload) {
      axios
        .get(`ipac/`)
        .then(res => {
          commit("setIpacs", res.result.recordset);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      commit("setIpacs", payload);
    }
  },
  refrescarIffas: ({ commit }, payload) => {
    if (!payload) {
      axios
        .get(`iffa/`)
        .then(res => {
          commit("setIffas", res.result.recordset);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      commit("setIffas", payload);
    }
  },
};