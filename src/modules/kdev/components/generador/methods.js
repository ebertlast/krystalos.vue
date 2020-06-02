import { mapActions } from "vuex";

export default {
  ...mapActions(["notificacion", "setClipboard"]),
  generar() {
    if (this.tabla === "") {
      this.notificacion({
        message: "Debes indicar el nombre de la tabla",
        type: "error"
      });
      return this.$refs.tabla.focus();
    }
    this.cargando = true;
    this.$http
      .get(`cgen/${this.tabla}`)
      .then(res => {
        this.cargando = false;
        this.propiedades = res.result.recordset;
        // if (this.propiedades.length <= 0) {
        //   this.animarDiv("inputTabla");
        // }
        // console.log("Propiedades:", this.propiedades);
      })
      .catch(err => {
        this.cargando = false;
        console.log(err);
      });
    return this.$refs.tabla.focus();
  },
  generar2() {
    this.cargando = true;
    this.$http
      .get(`cgen/estructura/${this.basedatos}/${this.tablaBD}`)
      .then(res => {
        this.cargando = false;
        this.propiedades = res.result.recordset;
        
        var tabla = this.tablaBD;
        this.tabla = this.tablas.filter(function (el) { return el.object_id == tabla })[0].name;

        // if (this.propiedades.length <= 0) {
        //   this.animarDiv("inputTabla");
        // }
        // console.log("Propiedades:", this.propiedades);
        // console.log("tabla:", tabla);
      })
      .catch(err => {
        this.cargando = false;
        console.log(err);
      });
    return this.$refs.tablaBD.focus();
  },
  parametro(fila, index) {
    var linea = `@${fila.COLUMNA} ${fila.TIPO.toUpperCase()}`;
    switch (fila.TIPO.toUpperCase()) {
      case "VARCHAR":
        var tamanio = fila.TAMANIO;
        if (tamanio < 0) { tamanio = 'MAX' }
        linea += `(${tamanio})`;
        break;
      case "DECIMAL":
        linea += `(${fila.PRECISION}, ${fila.ESCALA})`;
        break;
      default:
        break;
    }
    linea += ` = NULL`;
    if (index !== this.propiedades.length - 1) {
      linea += `,`;
    }

    return linea;
  },
  cadenaDelete() {
    var cadena = `DELETE ${this.Tabla} WHERE 1 = 1 `;
    if (this.propiedades.length <= 0 || this.llaves.length <= 0) {
      const propiedad = this.noLlaves[0];
      cadena += `AND ${propiedad.COLUMNA} = @${propiedad.COLUMNA} `;
    } else {
      this.llaves.forEach(propiedad => {
        cadena += `AND ${propiedad.COLUMNA} = @${propiedad.COLUMNA} `;
      });
    }
    return cadena;
  },
  rutaGet() {
    var ruta = "";
    if (this.llaves.length <= 0) {
      const propiedad = this.noLlaves[0];
      ruta += `/:${propiedad.COLUMNA}?`;
    }
    this.llaves.forEach(propiedad => {
      ruta += `/:${propiedad.COLUMNA}`;
      if (this.llaves.length === 1) ruta += "?";
    });
    return ruta;
  },
  rutaDelete() {
    var ruta = "";
    if (this.llaves.length <= 0) {
      const propiedad = this.noLlaves[0];
      ruta += `/:${propiedad.COLUMNA}`;
    }
    this.llaves.forEach(propiedad => {
      ruta += `/:${propiedad.COLUMNA}`;
    });
    return ruta;
  },
  copiarNombreSql() {
    this.setClipboard(this.nombreSQL);
  }
}