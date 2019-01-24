import { mapActions } from "vuex";

export default {
  ...mapActions("kinv", [
    "refrescarIclas",
    "refrescarIclahs",
    "refrescarIgrus",
    "refrescarIpacs",
    "refrescarIffas",
    "refrescarIccns",
    "refrescarIunis",
    "refrescarItars"
  ]),
  guardar() {
    this.$emit("guardar", this.model);
  },
  elegirGenerico(model) {
    this.model.IDGENERICO = model.IDGENERICO;
    this.generico = model.DESCRIPCION;
  },
  elegirPreComercial(tgen) {
    var self = this;
    setTimeout(() => {
      self.$refs.tabla_precomercial.cerrarDialog();
    }, 1000);
    self.panelPresentacionComercial = undefined;
    self.tgen_precomercial = tgen;
    self.model.PRECOMERCIAL = tgen.CODIGO;
  },
  filtrarPrecomerciales() {
    this.filas = [];
    this.columnas = [];
    if (this.palabras.length <= 0) {
      this.filas = this.precomercials;
    } else {
      for (let i = 0; i < this.precomercials.length; i++) {
        const el = this.precomercials[i];
        var agregar = true;
        for (let index = 0; index < this.palabras.length; index++) {
          const word = this.palabras[index];
          if (el.DESCRIPCION.toUpperCase().indexOf(word.toUpperCase()) > 0) {
            // this.filas.push(el);
            // break;
          } else {
            agregar = false;
          }
        }
        if (agregar) {
          this.filas.push(el);
        }
      }
    }
    if (this.filas.length > 0) {
      Object.keys(this.filas[0]).forEach(col => {
        this.columnas.push({ text: col.replace("_", " "), value: col });
      });
    }
  },
  remove(item) {
    this.palabras.splice(this.palabras.indexOf(item), 1);
    this.palabras = [...this.palabras];
  },
  cargarHermanos() {
    if (!this.model.IDARTICULO || this.model.IDARTICULO === "") return;
    if (!this.editar) return;
    this.hermanos = [];
    var model = {
      PRINCIPAL: 0,
      IDARTICULO: this.model.IDARTICULO
    };
    const json = "json=" + JSON.stringify({ model: model });
    this.$http
      .post(`iart/get`, json)
      .then(res => {
        this.hermanos = res.result.recordset;
        console.log("hermanos: ", this.hermanos);
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.cargando_tabla = false;
      });
  },
  cargarFabricantes() {
    if (this.model && this.model.IDPRINACTIVO) {
      this.fabricantes = [];
      this.$http
        .get(`iart/fabricantes/${this.model.IDPRINACTIVO}`)
        .then(res => {
          this.fabricantes = res.result.recordset;
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => { });
    }
  }
}