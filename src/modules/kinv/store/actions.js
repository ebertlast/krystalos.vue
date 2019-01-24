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
  refrescarIccns: ({ commit }, payload) => {
    if (!payload) {
      axios
        .get(`iccn/`)
        .then(res => {
          commit("setIccns", res.result.recordset);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      commit("setIccns", payload);
    }
  },
  refrescarIunis: ({ commit }, payload) => {
    if (!payload) {
      axios
        .get(`iuni/`)
        .then(res => {
          commit("setIunis", res.result.recordset);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      commit("setIunis", payload);
    }
  },
  refrescarItars: ({ commit }, payload) => {
    if (!payload) {
      axios
        .get(`itar/`)
        .then(res => {
          commit("setItars", res.result.recordset);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      commit("setItars", payload);
    }
  },
  refrescarPrecomercials: ({ commit }, payload) => {
    if (!payload) {
      axios
        .get(`tgen/IART/PRECOMERCIAL/`)
        .then(res => {
          commit("setPrecomercials", res.result.recordset);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      commit("setPrecomercials", payload);
    }
  },
};