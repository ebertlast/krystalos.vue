<template>
  <div>
    <data-tabla :columnas="columnas" :filas="filas" :loading="cargando_tabla" @fila="fila=$event;" titulo="Pacientes" ref="tabla" @agregar="prepararNuevoRegistro">
        <!-- <v-scroll-y-transition mode="out-in"> -->
      <template slot="detalles">
          <v-container grid-list-md text-xs-center v-if="crud===VER">
              <div class="text-xs-center" v-if="!afi.PNOMBRE">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </div>
              <v-card
                v-else
                class="pt-4 mx-auto"
                flat
                max-width="1000">
                <v-card-text>
                  <v-avatar
                    size="88"
                  >
                    <v-img
                      :src="avatar"
                      class="mb-4"
                    ></v-img>
                  </v-avatar>
                  <h3 class="headline mb-2">
                    {{nombre_paciente}} ({{edad}})
                  </h3>
                  <div class="blue--text mb-2"> {{afi.EMAIL}} </div>
                  <div class="blue--text subheading font-weight-bold"> {{afi.DIRECCION}} - {{afi.NOMBRE_BARRIO}} - {{afi.NOMBRE_CIUDAD}} - {{afi.NOMBRE_DEPARTAMENTO}} </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-layout
                  tag="v-card-text"
                  text-xs-left
                  wrap
                  >
                  <!-- <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Company:</v-flex> -->
                  <!-- <v-flex>{{ selected.company.name }}</v-flex> -->
                  <!-- <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Website:</v-flex> -->
                  <!-- <v-flex>
                    <a :href="`//${selected.website}`" target="_blank">{{ selected.website }}</a>
                  </v-flex> -->
                  <v-flex tag="strong" xs4 class="text-xs-right">Teléfono Laboral:</v-flex>
                  <v-flex xs2 class="text-xs-left">{{ afi.TELEFONOLAB }}</v-flex>
                  <v-flex tag="strong" xs4 class="text-xs-right">Teléfono Particular:</v-flex>
                  <v-flex xs2 class="text-xs-left">{{ afi.TELEFONORES }}</v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout align-start justify-center row fill-height>
                  <v-tooltip top>
                    <v-btn slot="activator" color="warning" @click="seleccionar" fab small dark>
                      <v-icon>done_outline</v-icon>
                    </v-btn>
                    <span>Seleccionar</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <v-btn slot="activator" color="primary" @click="editar" fab small dark>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <span>Editar</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <v-btn slot="activator" color="error" @click="eliminar" fab small dark>
                      <v-icon>delete</v-icon>
                    </v-btn>
                    <span>Eliminar</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <v-btn slot="activator" @click="cancelar" fab small>
                      <v-icon>undo</v-icon>
                    </v-btn>
                    <span>Cancelar</span>
                  </v-tooltip>

                </v-layout>
              </v-card>
          </v-container>
          <v-container grid-list-md text-xs-center v-if="crud === EDITAR">
              <formulario :afi="afi" @guardar="actualizarAfi($event)" ref="formulario_edicion" @cancelar="crud=VER"></formulario>
              <!-- <v-btn color="success" @click="crud=VER">Regresar</v-btn> -->
          </v-container>
      </template>
        <!-- </v-scroll-y-transition> -->
      <template slot="formulario">
        <formulario :afi="afi" @guardar="registrarAfi($event)" @cancelar="$refs.tabla.dialogFormulario = false;" ref="formulario_ingreso"></formulario>
        <!-- <v-btn color="warning" @click="pruebas">Pruebas</v-btn> -->
      </template>
    </data-tabla>
  </div>
</template>

<script>
import { default as global_components } from "../../../../../src/common/components/";
import { default as components } from "../";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    fila: {},
    //#region Afi
    afi: {
      IDAFILIADO: undefined,
      PAPELLIDO: undefined,
      SAPELLIDO: undefined,
      PNOMBRE: undefined,
      SNOMBRE: undefined,
      TIPO_DOC: "CC",
      DOCIDAFILIADO: undefined,
      IDALTERNA: undefined,
      IDAFILIADOPPAL: undefined,
      GRUPO_SANG: undefined,
      ESTADO_CIVIL: undefined,
      GRUPOETNICO: undefined,
      SEXO: "Masculino",
      IDPARENTESCO: undefined,
      LOCALIDAD: undefined,
      DIRECCION: undefined,
      TELEFONORES: undefined,
      CIUDAD: undefined,
      ZONA: undefined,
      CODENTIDADANTERIOR: undefined,
      ESTADO: "Activo",
      FECHAULTESTADO: undefined,
      IDSEDE: undefined,
      IDPROVEEDOR: undefined,
      FNACIMIENTO: undefined,
      FECHAAFILSGSSS: undefined,
      ACT_ECONO: undefined,
      IDESCOLARIDAD: undefined,
      INDCOTIZANTE: undefined,
      ULTIMOANOAPROBADO: undefined,
      INCAPACIDADLABORAL: undefined,
      TIPODISCAPACIDAD: undefined,
      TIPOAFILIADO: undefined,
      GRUPOATESPECIAL: undefined,
      CABEZADEFAMILIA: undefined,
      ASOCIADO: undefined,
      TIENEOBS: undefined,
      CAMPOUSUARIO1: undefined,
      FECHAUVISITA: undefined,
      CONSANGUINIDAD: undefined,
      IDADMINISTRADORA: undefined,
      IDCAUSAL: undefined,
      FECHACAUSAL: undefined,
      CLASIFPC: undefined,
      NIVELSOCIOEC: undefined,
      IDPLAN: undefined,
      FECHAAFILIACION: undefined,
      NUMCARNET: undefined,
      CIUDADDOC: undefined,
      IDEMPLEADOR: undefined,
      SEMANASCOT: undefined,
      CARNETIZADO: undefined,
      FECHACARNET: undefined,
      CONSCERTIFICADO: undefined,
      CIUDADNAC: undefined,
      IDOCUPACION: undefined,
      NACIONALIDAD: undefined,
      CELULAR: undefined,
      DIRECCIONLAB: undefined,
      TELEFONOLAB: undefined,
      CNSAFIAA: undefined,
      SISBENNUMFICHA: undefined,
      SISBENFECHAFICHA: undefined,
      SISBENPUNTAJE: undefined,
      SISBENNUCLEOFAM: undefined,
      SISBENGRUPOB: undefined,
      IDCONTRATO: undefined,
      IDBARRIO: undefined,
      CLASEAFILIACIONARS: undefined,
      FORMULARIO: undefined,
      EMAIL: undefined,
      NORADICACION: undefined,
      FECHARADICACION: undefined,
      IDTIPOAFILIACION: undefined,
      IDCLASEAFILIACION: undefined,
      V_FORMULARIO: undefined,
      SISBENNIVEL: undefined,
      CNSXCPA: undefined,
      FESTADO: undefined,
      OKBD: undefined,
      USUARIOBD: undefined,
      NACIMIENTO: undefined,
      ITFC: undefined,
      CNSITFC: undefined,
      TIPOSUBSIDIO: undefined,
      COBERTURA_SALUD: undefined,
      TIPOAFILIADO2: undefined,
      IDAFI_TITULAR: undefined,
      ES_NN: undefined,
      IDESPECIAL: undefined,
      MTRIAGE: undefined,
      FTRIAGE: undefined,
      GRUPOPOB: undefined,
      IDSEDETRIAGE: undefined,
      F_ACTUALIZA: undefined,
      PRIORIDAD: undefined,
      URG_NOMBRE: undefined,
      URG_TELE: undefined,
      URG_DIR: undefined,
      URG_VINCULO: undefined,
      RAIPOSITIVO: undefined,
      RAIFECHA: undefined,
      RAIUSU: undefined,
      USUARIOATIENDE: undefined
    },
    //#endregion
    afiNuevo: {},
    afis: [],
    columnas: [],
    filas: [],
    cargando_tabla: false,
    crud: 0, // 0: Read Only, 1: Create, 2: Edit, 3: Delete
    VER: 0,
    NUEVO: 1,
    EDITAR: 2,
    ELIMINAR: 3
  }),
  components: {
    DataTabla: global_components.DataTabla,
    Formulario: components.AFIFormulario
  },
  mounted() {
    this.cargarAfiliados();
  },
  watch: {
    fila() {
      this.afi = {};
      this.crud = this.VER;
      this.cargando = true;
      this.$http
        .get(`/afi/${this.fila.IDAFILIADO}`)
        .then(res => {
          this.afi = res.result.recordset[0];
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          this.cargando = false;
        });
    }
  },
  computed: {
    ...mapGetters("krycnf", ["ciudades", "departamentos", "barrios"]),
    edad() {
      var hoy = new Date();
      var cumpleanos = new Date(this.afi.FNACIMIENTO);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var m = hoy.getMonth() - cumpleanos.getMonth();

      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }
      return edad;
    },
    nombre_paciente() {
      return `${this.afi.PAPELLIDO} ${this.afi.SAPELLIDO} ${this.afi.PNOMBRE} ${
        this.afi.SNOMBRE
      }`;
    },
    avatar() {
      var avatar = "";
      if (!this.afi) {
        return "";
      }
      if (!this.afi.SEXO) {
        return "";
      }
      if (this.afi.SEXO.toUpperCase() === "FEMENINO") {
        if (this.edad > 59) {
          return "src/assets/images/avatars/Abuela.png";
        } else if (this.edad > 20 && this.edad < 60) {
          return "src/assets/images/avatars/Adulta.png";
        } else if (this.edad > 10 && this.edad < 20) {
          return "src/assets/images/avatars/Adolescenta.png";
        } else if (this.edad > 3 && this.edad < 10) {
          return "src/assets/images/avatars/Niña.png";
        } else {
          return "src/assets/images/avatars/Beba.png";
        }
      } else {
        if (this.edad > 59) {
          return "src/assets/images/avatars/Abuelo.png";
        } else if (this.edad > 20 && this.edad < 60) {
          return "src/assets/images/avatars/Adulto.png";
        } else if (this.edad > 10 && this.edad < 20) {
          return "src/assets/images/avatars/Adolescente.png";
        } else if (this.edad > 3 && this.edad < 10) {
          return "src/assets/images/avatars/Niño.png";
        } else {
          return "src/assets/images/avatars/Bebe.png";
        }
      }
      return avatar;
    }
  },
  methods: {
    ...mapActions(["setAlert", "notificacion"]),
    ...mapActions("kasis", ["setAfi"]),
    prepararNuevoRegistro() {
      this.afi = {
        IDAFILIADO: undefined,
        PAPELLIDO: undefined,
        SAPELLIDO: undefined,
        PNOMBRE: undefined,
        SNOMBRE: undefined,
        TIPO_DOC: "CC",
        DOCIDAFILIADO: undefined,
        IDALTERNA: undefined,
        IDAFILIADOPPAL: undefined,
        GRUPO_SANG: undefined,
        ESTADO_CIVIL: undefined,
        GRUPOETNICO: undefined,
        SEXO: "Masculino",
        IDPARENTESCO: undefined,
        LOCALIDAD: undefined,
        DIRECCION: undefined,
        TELEFONORES: undefined,
        CIUDAD: undefined,
        ZONA: undefined,
        CODENTIDADANTERIOR: undefined,
        ESTADO: "Activo",
        FECHAULTESTADO: undefined,
        IDSEDE: undefined,
        IDPROVEEDOR: undefined,
        FNACIMIENTO: undefined,
        FECHAAFILSGSSS: undefined,
        ACT_ECONO: undefined,
        IDESCOLARIDAD: undefined,
        INDCOTIZANTE: undefined,
        ULTIMOANOAPROBADO: undefined,
        INCAPACIDADLABORAL: undefined,
        TIPODISCAPACIDAD: undefined,
        TIPOAFILIADO: undefined,
        GRUPOATESPECIAL: undefined,
        CABEZADEFAMILIA: undefined,
        ASOCIADO: undefined,
        TIENEOBS: undefined,
        CAMPOUSUARIO1: undefined,
        FECHAUVISITA: undefined,
        CONSANGUINIDAD: undefined,
        IDADMINISTRADORA: undefined,
        IDCAUSAL: undefined,
        FECHACAUSAL: undefined,
        CLASIFPC: undefined,
        NIVELSOCIOEC: undefined,
        IDPLAN: undefined,
        FECHAAFILIACION: undefined,
        NUMCARNET: undefined,
        CIUDADDOC: undefined,
        IDEMPLEADOR: undefined,
        SEMANASCOT: undefined,
        CARNETIZADO: undefined,
        FECHACARNET: undefined,
        CONSCERTIFICADO: undefined,
        CIUDADNAC: undefined,
        IDOCUPACION: undefined,
        NACIONALIDAD: undefined,
        CELULAR: undefined,
        DIRECCIONLAB: undefined,
        TELEFONOLAB: undefined,
        CNSAFIAA: undefined,
        SISBENNUMFICHA: undefined,
        SISBENFECHAFICHA: undefined,
        SISBENPUNTAJE: undefined,
        SISBENNUCLEOFAM: undefined,
        SISBENGRUPOB: undefined,
        IDCONTRATO: undefined,
        IDBARRIO: undefined,
        CLASEAFILIACIONARS: undefined,
        FORMULARIO: undefined,
        EMAIL: undefined,
        NORADICACION: undefined,
        FECHARADICACION: undefined,
        IDTIPOAFILIACION: undefined,
        IDCLASEAFILIACION: undefined,
        V_FORMULARIO: undefined,
        SISBENNIVEL: undefined,
        CNSXCPA: undefined,
        FESTADO: undefined,
        OKBD: undefined,
        USUARIOBD: undefined,
        NACIMIENTO: undefined,
        ITFC: undefined,
        CNSITFC: undefined,
        TIPOSUBSIDIO: undefined,
        COBERTURA_SALUD: undefined,
        TIPOAFILIADO2: undefined,
        IDAFI_TITULAR: undefined,
        ES_NN: undefined,
        IDESPECIAL: undefined,
        MTRIAGE: undefined,
        FTRIAGE: undefined,
        GRUPOPOB: undefined,
        IDSEDETRIAGE: undefined,
        F_ACTUALIZA: undefined,
        PRIORIDAD: undefined,
        URG_NOMBRE: undefined,
        URG_TELE: undefined,
        URG_DIR: undefined,
        URG_VINCULO: undefined,
        RAIPOSITIVO: undefined,
        RAIFECHA: undefined,
        RAIUSU: undefined,
        USUARIOATIENDE: undefined
      };
    },
    cargarAfiliados() {
      this.cargando_tabla = true;
      this.columnas = [];
      this.filas = [];
      this.$http
        .get("/afi/")
        .then(res => {
          Object.keys(res.result.recordset[0]).forEach(col => {
            this.columnas.push({ text: col.replace("_", " "), value: col });
          });
          // this.columnas.push({ text: "", value: "", sortable: false });
          this.filas = res.result.recordset;
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          this.cargando_tabla = false;
        });
    },
    registrarAfi(afi) {
      this.afiNuevo = afi;
      // const json = "json=" + JSON.stringify({ model: this.afiNuevo });
      this.cargando = true;
      this.$http
        .put(`afi`, json)
        .then(res => {
          this.cargando = false;
          if (res.success) {
            this.cargarAfiliados();
            this.notificacion({
              message: "Afiliado Registrado Satisfactoriamente",
              type: "success"
            });
            this.$refs.tabla.dialogFormulario = false;
          } else {
            this.notificacion({
              message: "Problemas al Registrar el Paciente",
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

    actualizarAfi(afi) {
      // console.log(this.$refs.tabla)
      // this.$refs.tabla.cerrarDialog();
      // this.setAfi(afi);
      // console.log("Departamentos: ", this.departamentos);
      // console.log("ciudades: ", this.ciudades);

      // {{afi.NOMBRE_BARRIO}} - {{afi.NOMBRE_CIUDAD}} - {{afi.NOMBRE_DEPARTAMENTO}}

      var ciu = this.ciudades.filter(function(el) {
        return (el.CIUDAD = afi.CIUDAD);
      })[0];
      afi.NOMBRE_CIUDAD = ciu.NOMBRE;
      afi.NOMBRE_DEPARTAMENTO = this.departamentos.filter(function(el) {
        return (el.DPTO = ciu.DPTO);
      })[0].NOMBRE;
      afi.NOMBRE_BARRIO = this.barrios.filter(function(el) {
        return (el.IDBARRIO = afi.IDBARRIO);
      })[0].NOMBRE;

      alert("Actualizar Afi");

      this.afi = afi;
      const json = "json=" + JSON.stringify({ model: this.afi });
      // console.log("Ciudad: ", afi.CIUDAD);
      // console.log("json: ", json);
      this.cargando = true;
      this.$http
        .post(`afi`, json)
        .then(res => {
          this.cargando = false;
          if (res.success) {
            this.cargarAfiliados();
            this.notificacion({
              message: "Afiliado Actualizado Satisfactoriamente",
              type: "success"
            });
            this.$refs.tabla.dialogFormulario = false;

            this.crud = this.VER;
          } else {
            this.notificacion({
              message: "Problemas al Registrar el Paciente",
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
    seleccionar() {
      this.setAfi(this.afi);
      this.$emit("model", this.afi);
      this.$refs.tabla.cerrarDialog();
    },
    editar() {
      // console.log("Departamentos: ", this.departamentos);
      // console.log("ciudades: ", this.ciudades);

      this.cargando = true;
      this.$http
        .get(`afi/${this.afi.IDAFILIADO}`)
        .then(res => {
          this.afi = res.result.recordset[0];
          console.log(this.afi.CIUDAD);
          this.crud = this.EDITAR;
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          this.cargando = false;
        });
    },
    eliminar() {
      return this.notificacion({
        message: "No está permitido eliminar un Afiliado, intente inactivarlo",
        type: "error"
      });
      this.crud = this.ELIMINAR;
    },
    cancelar() {
      this.$refs.tabla.cerrarDialog();
    }
  }
};
</script>

<style>
</style>
