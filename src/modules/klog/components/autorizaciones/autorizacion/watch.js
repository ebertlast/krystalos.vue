export default {
  ipss() {
    console.log("IPS's: ", this.ipss);
  },
  epss() {
    console.log("EPS's: ", this.epss);
  },
  afi() {
    this.aut.IDAFILIADO = this.afi.IDAFILIADO;
    this.panelAfi = undefined;
  },
  med() {
    this.aut.IDSOLICITANTE = this.med.IDMEDICO;
    this.panelMed = undefined;
  },
  ips() {
    this.aut.IDIPS = this.ips.IDTERCERO;
  },
  "aut.IDCONTRATANTE"() {
    this.actualizarPLNs();
  },
  eps() {
    this.aut.IDTERCEROCA = this.eps;
  },
  pln() {
    this.aut.IDPLAN = this.pln;
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
  }
}