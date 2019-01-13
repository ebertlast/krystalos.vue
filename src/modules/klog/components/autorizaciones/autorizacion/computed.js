import { mapGetters } from "vuex";
export default {
  ...mapGetters("kasis", ["edad_afi"]),
  ...mapGetters("krycnf", ["docXTpo", "mes", "departamentos", "ciudades", "mdxs", "sers", "ipss", "epss"]),
  ...mapGetters(["extensionArchivo", "fechayhora"]),
  nombre_afi() {
    return `${this.afi.PNOMBRE} ${this.afi.SNOMBRE} ${this.afi.PAPELLIDO} ${
      this.afi.SAPELLIDO
      }`;
  },
  especialidad() {
    var model = this.med;
    if (!model.IDEMEDICA) return "";
    var especialidad = this.mes.filter(function (el) {
      return el.IDEMEDICA == model.IDEMEDICA;
    })[0].DESCRIPCION;
    return especialidad;
  },
  ciudadesFiltradas() {
    if (!this.departamento || this.departamento === '') {
      return []
    }
    var dpto = this.departamento
    return this.ciudades.filter(function (el) {
      return el.DPTO == dpto;
    })
  },
  // nombre_servicio(idservicio) {
  //   if (!idservicio || idservicio === "") {
  //     return ""
  //   }
  //   return this.sers.filter(function (el) { return el.CODIGO == idservicio })
  // }
}