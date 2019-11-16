import { mapActions } from "vuex";

export default {
  ...mapActions(["setAlert", "notificacion", "setAutEditar"]),
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
  quitarArchivoSubido(_archivo) {
    var aux = 0;
    this.archivos_subidos.forEach(archivo => {
      if (archivo.NOMBRE === _archivo.NOMBRE && archivo.TIPODOC === _archivo.TIPODOC) {
        this.archivos_subidos.splice(aux, 1);
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
      // console.log(this.plns);
    }).catch(err => { console.log(err) }).then(() => {
      this.cargando = false
    })
  },
  agregarServicio() {
    if (!this.servicios) { this.servicios = [] }
    var ser = this.ser;
    // console.log(ser)
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
      // console.log("Servicio a agregar: ", ser)
      var articulo = this.articulos.filter(function (el) { return el.CODIGO == ser.IDSERVICIO })
      if (articulo) {
        ser.PREFIJO = articulo[0].PREFIJO
      }
      this.servicios.push(ser);
    }
    this.ser = { CANTIDAD: 1 }
    this.$refs.IDSERVICIO.focus();
  },
  descartarArticulo(ser) {
    this.servicios = this.servicios.filter(function (el) { return el != ser });
  },
  validarNumeroAutorizacion() {
    if (this.aut.NOAUT !== '') {
      this.validando_autorizacion = true;
      this.ruleNOAUT = [];
      var validarAutorizacion = true;
      if (this.aut_editar !== undefined && this.aut_editar.AUT.NOAUT == this.aut.NOAUT) { validarAutorizacion = false; }
      if (validarAutorizacion) {
        this.$http.get(`aut/existenoaut/${this.aut.NOAUT}`).then(res => {
          if (res.result.recordset.length > 0) {
            const NOAUT = this.aut.NOAUT
            this.ruleNOAUT = [v => v !== NOAUT || "Número de autorización ya diligenciado"];
          }
        }).catch(err => { console.log(err) }).then(() => {
          this.validando_autorizacion = false;
        })
      }
    }
  },
  guardar(_confirmar) {
    if (!this.$refs.form.validate()) {
      return;
    }
    this.cargando = true;
    // this.aut.FECHAREALIZACION = this.fechayhora(this.fecharealizacion);
    // this.aut.FECHASOL = this.fechayhora(this.fechasol);
    // this.aut.FECHAGEN = this.fechayhora(this.fechagen);
    // return console.log(this.aut);
    if (this.aut_editar === undefined) { // Nueva Autorización
      const aut = this.aut;
      if (this.aut.RECORDATORIO !== undefined && this.aut.RECORDATORIO) {
        if (!this.fechainicio_recordatorio) {
          this.notificacion({
            message: "Si marcas el tilde de recordatorio debes rellenar el campo de fecha",
            type: "error"
          });
        } else {
          aut.FECHAINICIO_RECORDATORIO = this.fechayhora(this.fechainicio_recordatorio);
        }
      }
      // alert(aut.FECHAINICIO_RECORDATORIO)

      this.$http.get('aut/generarid/').then(res => {
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

        // console.log(`aut.FECHAREALIZACION: ${aut.FECHAREALIZACION}`)
        // console.log(`aut.FECHASOL: ${aut.FECHASOL}`)
        // console.log(`aut.FECHAGEN: ${aut.FECHAGEN}`)

        var model = JSON.stringify({ aut });
        // return console.log("Autorización: ", model)
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
              message: "Autorización Guardada Satisfactoriamente",
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
            if (_confirmar === true) {
              this.confirmar_autorizacion(aut.IDAUT);
              this.setAutEditar(undefined);
              // this.limpiar_aut()
            } else {
              this.cargando = false;
              this.setAutEditar(undefined);
              // this.limpiar_aut()
              this.e1 = 1;
              this.$router.push({ name: "autorizaciones" })
            }
          }
        }).catch(err => { console.log(err); this.cargando = false; });//.then(() => { this.cargando = false; })
      }).catch(err => { console.log(err); this.cargando = false; })
    } else { // Actualizar una ya editada
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
      this.archivos_subidos.forEach(archivo => {
        aut.ARCHIVOS.push(archivo)
      });
      // console.log(aut.ARCHIVOS);
      //#endregion

      aut.FECHAREALIZACION = this.fechayhora(this.fecharealizacion);
      aut.FECHASOL = this.fechayhora(this.fechasol);
      aut.FECHAGEN = this.fechayhora(this.fechagen);

      // console.log(`aut.FECHAREALIZACION: ${aut.FECHAREALIZACION}`)
      // console.log(`aut.FECHASOL: ${aut.FECHASOL}`)
      // console.log(`aut.FECHAGEN: ${aut.FECHAGEN}`)

      var model = JSON.stringify({ aut });
      // console.log("Model: ", model)
      formData.append("json", model);

      this.$http.post('aut', formData).then(res => {

        // setTimeout(() => {
        //   this.cargando = false;
        //   this.notificacion({
        //     message: "Solicitud autorizada para ser dispensada",
        //     type: "success"
        //   });
        //   this.$router.push({ name: "autorizaciones" })
        // }, 3000);
        // console.log(res);
        if (res.success) {
          if (_confirmar === true) {
            this.confirmar_autorizacion(aut.IDAUT);
          } else {
            this.cargando = false;
            this.setAutEditar(undefined);
            this.$router.push({ name: "autorizaciones" })
          }
        } else {
          this.cargando = false;
        }
      }).catch(err => { console.log(err); this.cargando = false; })
    }
  },
  confirmar_autorizacion(_idaut) {
    this.cargando = true;
    this.$http
      .get(`aut/confirmar/${_idaut}`)
      .then(res => {
        if (res.success) {
          this.aut.ESTADO = "Autorizada";
          this.notificacion({
            message: "Solicitud autorizada para ser dispensada",
            type: "success"
          });
          this.setAutEditar(undefined);
          this.e1 = 1;
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
    // console.log(item)
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
        // if (valido && (!this.aut.IDSOLICITANTE || this.aut.IDSOLICITANTE === '')) valido = false;
        if (valido && (!this.aut.ORIGEN || this.aut.ORIGEN === '')) valido = false;
        if (valido && (!this.aut.NOAUT || this.aut.NOAUT === '')) valido = false;
        // if (valido && (!this.aut.NUMAUTORIZA || this.aut.NUMAUTORIZA === '')) valido = false;
        if (valido && this.archivos.length + this.archivos_subidos.length <= 0) valido = false;
        break;
      case 2:
        //   !' || !aut.DIRECCION || aut.DIRECCION === ''
        // if (!this.aut.IDSOLICITANTE || this.aut.IDSOLICITANTE == '') valido = false;
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
        if (this.servicios.length + this.archivos_subidos.length <= 0) valido = false;
      default:
        break;
    }
    // valido = true;
    return valido
  },
  limpiar_aut() {
    var self = this;
    setTimeout(() => {

      self.panelAfi = [false]
      self.panelMed = [false]
      self.panelIPS = [false]
      self.e1 = 1
      // alert(self.e1)
      self.cargando = false
      self.aut = {
        ORIGEN: "",
        TIPOAUTORIZACION: "Previa",
        ALTOCOSTO: "No",
        ATENCION: "Ambulatoria",
        URGENCIA: 0,
        IMPUTABLE_A: "Administradora",
        ESTADO: "Solicitada",
        VALORTOTAL: 0,
        VALORCOPAGO: 0,
        VALORBENEFICIO: 0,
        VALOREXEDENTE: 0,
        VALORTOTALCOSTO: 0,
        VALORCOPAGOCOSTO: 0,
        IMPRESO: 0,
        CLASEORDEN: "Normal",
        GENEROCAJA: 0,
        AUTORIZADO: 1,
        CIUDAD: undefined,
        FUNCIONARIO_AUT: undefined,
        FECHAREALIZACION: undefined,
        FECHASOL: undefined,
        FECHAGEN: undefined,
        PEDIDOINV: 0,

        IDAFILIADO: "",
        AUTORIZADOPOR: "",
        NUMAUTORIZA: "",
        DIRECCION: "",
        RECORDATORIO: false
      };
      self.fecharealizacion = undefined;
      self.fechasol = undefined;
      self.fechagen = undefined;
      self.plns = [];
      self.name = "";
      self.email = "";
      self.select = null;
      // self.items = ["Chat", "Correo", "En Punto", "Llamada", "Otro"];
      self.checkbox = null;
      self.urgencia = false;
      self.dictionary = {
        attributes: {
          email: "Correo Electrónico",
          medio: "Medio de la Solicitud"
          // custom attributes
        },
        custom: {
          name: {
            // required: () => "Name can not be empty",
            max: "The name field may not be greater than 10 characters"
            // custom messages
          },
          select: {
            required: "Select field is required"
          }
        }
      };

      self.archivos = [];
      self.nombreArchivo = "";
      self.archivo = {
        TIPODOC: ""
      };
      self.med = {
        IDMEDICO: undefined,
        TIPO_USUARIO: undefined,
        TIPOVINCULACION: undefined,
        NOMBRE: undefined,
        IDEMEDICA: undefined,
        NO_REGISTRO: undefined,
        IDMODELO: undefined,
        DIRECCION: undefined,
        TELEFONOS: undefined,
        BEEPER: undefined,
        CELULAR: undefined,
        CIUDAD: undefined,
        AUTORIZACION: undefined,
        SEL_PROVEED: undefined,
        MANEJAMSEDES: undefined,
        NO_CONSULTAS: undefined,
        IDTERCERO: undefined,
        EMPLEADO: undefined,
        TOPEPACIENTES: undefined,
        PACIENTESASIG: undefined,
        ESTADO: undefined,
        IDMODELOPRE: undefined,
        LUGARATENCION: undefined,
        IDSEDEATENCION: undefined,
        DIR_OTRA: undefined,
        TEL_OTRA: undefined,
        CIU_OTRA: undefined,
        TIPO_ID: undefined,
        PNOMBRE: undefined,
        SNOMBRE: undefined,
        PAPELLIDO: undefined,
        SAPELLIDO: undefined,
        IDFIRMA: undefined,
        CLASIFICACION: undefined,
        NUMACCIONES: undefined,
        NUMMSDS: undefined,
        CODCOLEGIO: undefined,
        TELEFONO: undefined,
        EMAIL: undefined,
        ACCIONES: undefined,
        MINUTOSCAMBIO: undefined
      };
      self.afi = {}
      self.ips = {}
      self.eps = {}
      self.pln = {}
      self.ser = { CANTIDAD: 1 }
      self.departamento = {}
      self.ciudad = {};
      self.messages = [
        {
          avatar: "/src/assets/images/medical/Group_Doctors_Check.ico",
          name: "John Leider",
          title: "Welcome to Vuetify.js!",
          excerpt: "Thank you for joining our community..."
        },
        {
          color: "red",
          icon: "people",
          name: "Social",
          new: 1,
          total: 3,
          title: "Twitter"
        },
        {
          color: "teal",
          icon: "local_offer",
          name: "Promos",
          new: 2,
          total: 4,
          title: "Shop your way",
          exceprt: "New deals available, Join Today"
        }
      ];
      self.contratantes = [];
      self.servicios = [];
      self.dialog_frm_ips = false;
      self.palabras = [];
      self.items_palabras = [];
      self.dialogComentarios = false
      self.servicio_comentario = {}
      self.servicios_del_plan = [];
      self.dialogConfirmacion = false;
      self.confirmar_autorizacion_al_guardar = true;
      self.archivos_subidos = [];
      self.idcontratante = "";
      self.formvalid = true;
      self.ruleNOAUT = [];
      self.validando_autorizacion = false;
      self.fechainicio_recordatorio = false;
      self.fechainicio_recordatorio = undefined;
    }, 300);

  },
  imprimir(idDiv) {
    var prtContent = document.getElementById(idDiv);
    var WinPrint = window.open(
      "",
      "",
      "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
    );
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  }
}