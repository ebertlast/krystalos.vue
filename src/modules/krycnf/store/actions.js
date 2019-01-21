import axios from "axios"
export default {
  refrescarPaiss: ({ commit }, payload) => {
    if (!payload) {
      axios.get(`pais/`).then(res => {
        commit("setPaiss", res.result.recordset);
      }).catch(err => { console.log(err) })
    } else {
      commit("setPaiss", payload);
    }
  },
  refrescarDeps: ({ commit }, payload) => {
    if (!payload) {
      axios.get(`dep/`).then(res => {
        commit("setDepartamentos", res.result.recordset);
      }).catch(err => { console.log(err) })
    } else {
      commit("setDepartamentos", payload);
    }
  },
  refrescarCius: ({ commit }, payload) => {
    if (!payload) {
      axios.get(`ciu/`).then(res => {
        commit("setCius", res.result.recordset);
      }).catch(err => { console.log(err) })
    } else {
      commit("setCius", payload);
    }
  },
  actualizarBarrios: ({ commit }, payload) => {
    if (!payload) {
      axios.get(`ciub/`).then(res => {
        commit("setBarrios", res.result.recordset);
      }).catch(err => { console.log(err) })
    } else {
      commit("setBarrios", payload);
    }
  },
  setBarrios: ({ commit }, payload) => {
    commit("setBarrios", payload);
  },
  setMed: ({ commit }, payload) => {
    commit("setMed", payload);
  },
  actualizarTipoDocumentos: ({ commit }, payload) => {
    if (!payload) {
      axios
        .get(`tgen/GENERAL/TIPOIDENT/`)
        .then(res => {
          commit("setTipoDocumentos", res.result.recordset);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      commit("setTipoDocumentos", payload);
    }
  },
  actualizarDocXTpo: ({ commit }, payload) => {
    if (!payload) {
      axios
        .get(`tgen/DOCXTPO/TIPODOC/`)
        .then(res => {
          commit("setDocXTpo", res.result.recordset);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      commit("setDocXTpo", payload);
    }
  },
  actualizarMes: ({ commit }, payload) => {
    if (!payload) {
      axios
        .get(`mes/`)
        .then(res => {
          commit("setMes", res.result.recordset);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      commit("setMes", payload);
    }
  },
  actualizarMdxs: ({ commit }, payload) => {
    if (!payload) {
      axios
        .get(`mdx/`)
        .then(res => {
          commit("setMdxs", res.result.recordset);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      commit("setMdxs", payload);
    }
  },
  actualizarIpss: ({ commit }, payload) => {
    if (!payload) {
      axios
        .get(`usvgs/TERCATIPS`)
        .then(res => {
          return res.result.recordset[0];
        })
        .then(usvgs => {
          axios
            .get(`ter/categoria/${usvgs.DATO}`)
            .then(res => {
              commit("setIpss", res.result.recordset);
            })
            .catch(err => {
              console.log(err);
            })
        })
        .catch(err => {
          console.log(err);
        })

    } else {
      commit("setIpss", payload);
    }
  },
  actualizarEpss: ({ commit }, payload) => {
    if (!payload) {
      axios
        .get(`usvgs/TERCATEPS`)
        .then(res => {
          return res.result.recordset[0];
        })
        .then(usvgs => {
          axios
            .get(`ter/categoria/${usvgs.DATO}`)
            .then(res => {
              commit("setEpss", res.result.recordset);
            })
            .catch(err => {
              console.log(err);
            })
        })
        .catch(err => {
          console.log(err);
        })

    } else {
      commit("setEpss", payload);
    }
  },

  actualizarSers: ({ commit }, payload) => {
    if (!payload) {
      axios
        .get(`ser/articulos`)
        .then(res => {
          commit("setSers", res.result.recordset);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      commit("setSers", payload);
    }
  },
}
