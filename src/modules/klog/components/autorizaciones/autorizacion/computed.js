import { mapGetters } from "vuex";
export default {
  ...mapGetters("kasis", ["edad_afi"]),
  ...mapGetters("krycnf", ["docXTpo", "mes", "deps", "cius", "mdxs", "sers", "ipss", "epss"]),
  ...mapGetters(["extensionArchivo", "fechayhora"]),
  nombre_afi() {
    return this.afi.AFILIADO || `${this.afi.PNOMBRE} ${this.afi.SNOMBRE || ""} ${this.afi.PAPELLIDO} ${
      this.afi.SAPELLIDO || ""
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
    return this.cius.filter(function (el) {
      return el.DPTO == dpto;
    })
  },
  // nombre_servicio(idservicio) {
  //   if (!idservicio || idservicio === "") {
  //     return ""
  //   }
  //   return this.sers.filter(function (el) { return el.CODIGO == idservicio })
  // }
  articulos() {
    var servicios = [];
    this.servicios_del_plan.forEach(ser => {
      servicios.push(ser);
    });
    for (let i = 0; i < servicios.length; i++) {
      const servicio = servicios[i];
      this.servicios.forEach(ser => {
        if (ser.IDSERVICIO == servicio.CODIGO) {
          servicios.splice(i, 1);
        }
      });
    }
    return servicios;
  },
  articulos_DEPRECATED() {
    var servicios = [];
    for (let i = 0; i < this.servicios_del_plan.length; i++) {
      const servicio = this.sers[i];
      var agregar = true;
      this.servicios.forEach(ser => {
        // console.log(ser.IDSERVICIO, servicio)
        if (ser.IDSERVICIO == servicio.CODIGO) {
          agregar = false;
        }
      });
      if (agregar && this.palabras.length > 0 && false) {
        for (let j = 0; j < this.palabras.length; j++) {
          const palabra = this.palabras[j];
          if (agregar) {
            if (servicio.ARTICULO.toUpperCase().search(palabra.toUpperCase()) < 0) {
              agregar = false;
            }
          }
        }
      }
      if (agregar) {
        servicios.push(servicio)
      }
    }
    // this.palabras.forEach(el => {
    //   console.log(el)
    // });
    return servicios;
  },
  nombre_departamento() {
    if (!this.aut || !this.aut.CIUDAD) return "";
    var self = this;
    var DPTO = this.cius.filter(function (el) { return el.CIUDAD == self.ciudad })[0].DPTO;
    return this.deps.filter(function (el) { return el.DPTO == DPTO; })[0].NOMBRE || "";
  },
  nombre_ciudad() {
    if (!this.aut || !this.aut.CIUDAD) return "";
    const _ciudad = this.ciudad;
    return this.cius.filter(function (el) { return el.CIUDAD == _ciudad })[0].NOMBRE;
  },
  servicios_organizados() {
    let servicios = [];
    for (let i = this.servicios.length; i > 0; i--) {
      const el = this.servicios[i - 1];
      servicios.push(el);
    }
    return servicios;
  }
}