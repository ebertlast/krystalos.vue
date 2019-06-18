export default {
  ipss() {
    // console.log("IPS's: ", this.ipss);
  },
  epss() {
    // console.log("Empleadores: ", this.epss);
  },
  afi() {
    this.aut.IDAFILIADO = this.afi.IDAFILIADO;
    // this.aut.IDPLAN = this.afi.IDPLAN;
    this.aut.DIRECCION = this.afi.DIRECCION;
    
    this.ciudad = this.afi.CIUDAD;
    // this.aut.CIUDAD = this.afi.CIUDAD;
    this.panelAfi = undefined;
  },
  med() {
    // this.aut.IDSOLICITANTE = this.med.IDMEDICO;
    this.aut.IDMEDICOSOLICITA = this.med.IDMEDICO;
    this.panelMed = undefined;
  },
  ips() {
    this.aut.IDIPS = this.ips.IDTERCERO;
  },
  "aut.IDCONTRATANTE"() {
    this.aut.IDTERCEROCA = this.aut.IDCONTRATANTE;
    this.actualizarPLNs();
  },
  eps() {
    // this.aut.IDTERCEROCA = this.eps;
    this.aut.IDSOLICITANTE = this.eps;
  },
  // pln() {
  //   this.aut.IDPLAN = this.pln;
  // },
  "aut.IDPLAN"() {
    this.cargando = true;
    this.servicios_del_plan = [];
    this.$http.get(`ser/articulos/${this.aut.IDPLAN}`).then(res => {
      this.servicios_del_plan = res.result.recordset;
      // console.log(this.servicios_del_plan.filter(function (el) { return el.CODIGO == 'ART0002635' })[0])
    }).catch(err => { console.log(err); }).then(() => { this.cargando = false; })
  },
  // eps(){
  //   this.aut.
  // }
  aut() {
    // alert("");
  },
  ciudad() {
    this.aut.CIUDAD = this.ciudad;
  },
  urgencia() {
    this.aut.URGENCIA = this.urgencia;
  },
  ser() {
    var CODIGO = this.ser.IDSERVICIO;
    var articulo = this.sers.filter(function (el) {
      return el.CODIGO == CODIGO;
    })[0];
    if (articulo) {
      this.ser.DESCSERVICIO = articulo.ARTICULO;
    }
  },
  servicios() {
    this.aut.SERVICIOS = this.servicios;
  },
  archivos() {
    // this.aut.ARCHIVOS = this.archivos;
  },
  fecharealizacion() {
    // this.aut.FECHAREALIZACION = this.fechayhora(this.fecharealizacion);
  },
  fechasol() {
    // this.aut.FECHASOL = this.fechayhora(this.fechasol);
  },
  fechagen() {
    // this.aut.FECHAGEN = this.fechayhora(this.fechagen);
  },
  idcontratante(value) {
    this.aut.IDCONTRATANTE = value;
    this.aut.IDTERCEROCA = this.aut.IDCONTRATANTE;
    this.actualizarPLNs();
    // alert(value)
  }
  // "aut.IDAFILIADO"() {
  //   console.log(this.aut.IDAFILIADO);
  // }
}