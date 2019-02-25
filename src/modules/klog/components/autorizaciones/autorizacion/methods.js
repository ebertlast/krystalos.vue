import { mapActions } from "vuex";

export default {
  ...mapActions(["setAlert", "notificacion"]),
  ...mapActions("krycnf", [
    "actualizarIpss",
    "actualizarEpss"
  ]),
  submit() {
    this.$validator.validateAll();
    // console.log(this.$validator.validateAll());
  },
  clear() {
    this.name = "";
    this.email = "";
    this.select = null;
    this.checkbox = null;
    this.$validator.reset();
  },
  elegirArchivo() {
    this.archivo = {};
    this.texto = undefined;
    this.$refs.archivo.click();
  },
  mostrarArchivo() {
    this.archivo = {
      TIPODOC: ""
    };
    // this.archivos = [];

    var inputFile = this.$refs.archivo;
    // console.log(inputFile.files[0]);
    // console.log(inputFile.value)
    if (inputFile.value !== "") {
      // var file = inputFile.mozFullPath;
      // this.archivos.push(inputFile.files[0]);
      this.nombreArchivo = inputFile.files[0].name;
      this.archivo.file = inputFile.files[0];
      // console.log("Nombre Archivo: ",this.nombreArchivo)
      // console.log("Archivo: ", this.archivo);
      // console.log("Archivos: " , this.archivos);
    }
  },
  agregarArchivo() {
    // console.log(this.archivo)
    this.archivos.push(this.archivo);
    this.archivo = {};
    this.texto = undefined;
    this.nombreArchivo = "";
  },
  tipoArchivo(codigo) {
    return this.docXTpo.filter(function (el) { return el.CODIGO == codigo; })[0].DESCRIPCION;
  },
  quitarArchivo(_archivo) {
    var aux = 0;
    this.archivos.forEach(archivo => {
      if (archivo.file.name === _archivo.file.name && archivo.file.TIPODOC === _archivo.file.TIPODOC) {
        this.archivos.splice(aux, 1);
      }
      aux++;
    });
  },
  actualizarContratantes() {
    this.cargando = true;
    this.contratantes = [];
    this.$http
      .get(`usvgs/TERCATCONTRATANTE`)
      .then(res => {
        return res.result.recordset[0];
      })
      .then(usvgs => {
        this.cargando = true;
        this.$http
          .get(`ter/categoria/${usvgs.DATO}`)
          .then(res => {
            this.contratantes = res.result.recordset;
          })
          .catch(err => {
            console.log(err);
          })
          .then(() => {
            this.cargando = false;
          });
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.cargando = false;
      });
  },
  actualizarEPSsDEPRECATED() {
    this.cargando = true;
    this.epss = [];
    this.$http
      .get(`usvgs/TERCATEPS`)
      .then(res => {
        return res.result.recordset[0];
      })
      .then(usvgs => {
        this.cargando = true;
        this.$http
          .get(`ter/categoria/${usvgs.DATO}`)
          .then(res => {
            this.epss = res.result.recordset;
          })
          .catch(err => {
            console.log(err);
          })
          .then(() => {
            this.cargando = false;
          });
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.cargando = false;
      });
  },
  actualizarPLNs() {
    this.plns = [];
    this.cargando = true;
    this.$http.get(`pln/ter/${this.aut.IDCONTRATANTE}`).then(res => {
      this.plns = res.result.recordset;
      console.log(this.plns);
    }).catch(err => { console.log(err) }).then(() => {
      this.cargando = false
    })
  },
  agregarServicio() {
    if (!this.servicios) { this.servicios = [] }
    var ser = this.ser;
    console.log(ser)
    if (!ser || ser.IDSERVICIO == "" || ser.DESCSERVICIO == "") {
      return this.$refs.IDSERVICIO.focus();
    }
    if (!ser.CANTIDAD || ser.CANTIDAD * 1 < 1) {
      return this.$refs.CANTIDADSERVICIO.focus();
    }
    var agregar = true;
    for (let i = 0; i < this.servicios.length; i++) {
      const ser = this.servicios[i];
      if (ser.IDSERVICIO === this.ser.IDSERVICIO) {
        agregar = false;
      }
    }
    if (agregar) {
      this.servicios.push(ser);
    }
    this.ser = { CANTIDAD: 1 }
    this.$refs.IDSERVICIO.focus();
  },
  descartarArticulo(ser) {
    this.servicios = this.servicios.filter(function (el) { return el != ser });
  },
  guardar() {
    this.cargando = true;
    this.$http.get('aut/generarid/').then(res => {
      const aut = this.aut;
      const formData = new FormData();
      //#region Agregar Archivos
      aut.ARCHIVOS = [];
      for (let i = 0; i < this.archivos.length; i++) {
        const file = this.archivos[i].file;
        file.tipodoc = this.archivos[i].TIPODOC;
        aut.ARCHIVOS.push({ NOMBRE: file.name, TIPODOC: file.tipodoc });
        formData.append("file", file, file.name);
      }
      //#endregion

      aut.IDAUT = res.result.recordset[0].IDAUT;
      aut.FECHAREALIZACION = this.fechayhora(this.fecharealizacion);
      aut.FECHASOL = this.fechayhora(this.fechasol);
      aut.FECHAGEN = this.fechayhora(this.fechagen);

      var model = JSON.stringify({ aut });
      // console.log("Model: ", model)
      formData.append("json", model);

      this.$http.put('aut', formData).then(res => {
        // console.log(res);
        if (!res) {
          this.notificacion({
            message: "Ha ocurrido un error al intentar registrar la autorización. Vuelve a intentarlo.",
            type: "error"
          });

        } else {
          this.notificacion({
            message: "Autorización Registrada Satisfactoriamente",
            type: "success"
          });
          // this.aut = undefined;
          // this.e1 = 1;
          // this.fecharealizacion = undefined;
          // this.fechasol = undefined;
          // this.fechagen = undefined;
          // this.panelAfi = [false];
          // this.panelMed = [false];
          // this.panelIPS = [false];
          // this.med = undefined;
          // this.afi = undefined;
          // this.ips = undefined;
          // this.eps = undefined;
          // this.pln = undefined;
          // this.ser = undefined;
          // this.departamento = undefined;
          // this.ciudad = undefined;
          // this.servicios = [];
          // this.archivos = [];
          // this.urgencia = false;
          // this.$router.push({ name: "autorizaciones" })
          this.confirmar_autorizacion(aut.IDAUT);
        }
      }).catch(err => { console.log(err) });//.then(() => { this.cargando = false; })
    }).catch(err => { console.log(err); this.cargando = false; })
  },
  confirmar_autorizacion(_idaut) {
    this.cargando = true;
    this.$http
      .get(`aut/confirmar/${_idaut}`)
      .then(res => {
        if (res.success) {
          this.aut.ESTADO = "Autorizada";
          this.notificacion({
            message: "Autorización autorizada para ser Despachada",
            type: "success"
          });
          this.$router.push({ name: "autorizaciones" })
        } else {
          this.notificacion({
            message: "Problemas al confirmar la autorización",
            type: "error"
          });
        }
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.cargando = false;
      });
  },
  descartarPalabra(item) {
    this.palabras.splice(this.palabras.indexOf(item), 1);
    this.palabras = [...this.palabras];
  },
  editarComentarios(item) {
    console.log(item)
    this.servicio_comentario = item;
    this.dialogComentarios = true;
    var self = this;
    setTimeout(() => {
      self.$refs.comentarios.focus();
    }, 400);
  },
  editarDireccion() {
    this.aut.DIRECCION = "";
    this.$refs.direccionador.show = true;
  },
  valido(paso) {
    var valido = true;
    switch (paso) {
      case 1:
        if (!this.aut.IDAFILIADO || this.aut.IDAFILIADO === '') valido = false;
        if (valido && (!this.aut.IDIPS || this.aut.IDIPS === '')) valido = false;
        if (valido && (!this.aut.IDSOLICITANTE || this.aut.IDSOLICITANTE === '')) valido = false;
        if (valido && (!this.aut.ORIGEN || this.aut.ORIGEN === '')) valido = false;
        if (valido && (!this.aut.NOAUT || this.aut.NOAUT === '')) valido = false;
        if (valido && (!this.aut.NUMAUTORIZA || this.aut.NUMAUTORIZA === '')) valido = false;
        if (valido && this.archivos.length <= 0) valido = false;
        break;
      case 2:
        //   !' || !aut.DIRECCION || aut.DIRECCION === ''
        if (!this.aut.IDSOLICITANTE || this.aut.IDSOLICITANTE == '') valido = false;
        if (valido && (!this.aut.IDIPS || this.aut.IDIPS === '')) valido = false;
        if (valido && (!this.fecharealizacion || this.fecharealizacion == '')) valido = false;
        if (valido && (!this.fechasol || this.fechasol == '')) valido = false;
        if (valido && (!this.fechagen || this.fechagen == '')) valido = false;
        if (valido && (!this.aut.ATENCION || this.aut.ATENCION === '')) valido = false;
        if (valido && (!this.aut.FUNCIONARIO_AUT || this.aut.FUNCIONARIO_AUT === '')) valido = false;
        if (valido && (!this.ciudad || this.ciudad == '')) valido = false;
        if (valido && (!this.aut.CIUDAD || this.aut.CIUDAD === '')) valido = false;
        if (valido && (!this.aut.DIRECCION || this.aut.DIRECCION === '')) valido = false;
        break;
      case 3:
        if (this.servicios.length <= 0) valido = false;
      default:
        break;
    }
    return valido
  }
}