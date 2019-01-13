export default {
  setPaises: (state, paises) => {
    state.paises = paises;
  },
  setDepartamentos: (state, departamentos) => {
    // console.log("Departamentos (store): ", departamentos)
    state.departamentos = departamentos;
  },
  setCiudades: (state, ciudades) => {
    state.ciudades = ciudades;
  },
  setBarrios: (state, barrios) => {
    state.barrios = barrios;
  },
  setTipoDocumentos: (state, tipoDocumentos) => {
    state.tipoDocumentos = tipoDocumentos;
  },
  setDocXTpo: (state, docXTpo) => {
    state.docXTpo = docXTpo;
  },
  setMes: (state, mes) => {
    state.mes = mes;
  },
  setMed: (state, med) => {
    state.med = med;
  },
  setMdxs: (state, mdxs) => {
    state.mdxs = mdxs;
  },
  setSers: (state, sers) => {
    state.sers = sers;
  },
  setEpss: (state, epss) => {
    state.epss = epss;
  },
  setIpss: (state, ipss) => {
    state.ipss = ipss;
  },
}
