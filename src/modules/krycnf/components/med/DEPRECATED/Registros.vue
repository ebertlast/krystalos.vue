<template>
  <tabla :columnas="columnas" :filas="filas" :loading="cargando_tabla" @fila="fila=$event;" titulo="Médicos" ref="tabla" @agregar="prepararNuevoRegistro">
    <template slot="detalles">
      <template>
        <v-progress-linear :indeterminate="true" v-if="cargando"></v-progress-linear>
      </template>
      <v-scroll-y-transition mode="out-in">
        <v-container grid-list-md text-xs-center v-if="!editar">
          <v-layout row wrap>
            <v-flex xs12>
              <v-card dark :color="(model.ESTADO==='Activo')?'success':'error'">
                <v-card-text class="px-0 text-capitalize" v-html="`${model.NOMBRE} (${especialidad}) [${model.ESTADO}]`"></v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12>
                <v-list-tile-content>
                  <v-list-tile-title>
                    <strong>Dirección #1:</strong>
                    {{model.DIRECCION}} {{ciudad}}</v-list-tile-title>
                  <v-list-tile-sub-title>
                    <strong>Dirección #2:</strong> {{model.DIR_OTRA}}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              
            </v-flex>
            <v-flex xs3>
                <v-list-tile-content>
                  <v-list-tile-title><h4>Registro Médico:</h4></v-list-tile-title>
                  <v-list-tile-sub-title v-html="(model.NO_REGISTRO && model.NO_REGISTRO!=='')?model.NO_REGISTRO:'Sin Información'"></v-list-tile-sub-title>
                </v-list-tile-content>
            </v-flex>
            <v-flex xs3>
                <v-list-tile-content>
                  <v-list-tile-title><h4>Celular:</h4></v-list-tile-title>
                  <v-list-tile-sub-title v-html="(model.CELULAR)?model.CELULAR:'Sin Información'"></v-list-tile-sub-title>
                </v-list-tile-content>
            </v-flex>
            <v-flex xs3>
                <v-list-tile-content>
                  <v-list-tile-title><h4>Otros Contactos:</h4></v-list-tile-title>
                  <v-list-tile-sub-title v-html="telefonos"></v-list-tile-sub-title>
                </v-list-tile-content>
            </v-flex>
            <v-flex xs3>
                <v-list-tile-content>
                  <v-list-tile-title><h4>Correo Electrónico:</h4></v-list-tile-title>
                  <v-list-tile-sub-title v-html="(model.EMAIL)?model.EMAIL:'Sin Información'"></v-list-tile-sub-title>
                </v-list-tile-content>
            </v-flex>
            <v-flex xs12>
              <v-tooltip top>
                <v-btn slot="activator" color="warning" @click="seleccionar" fab small dark>
                  <v-icon>done_outline</v-icon>
                </v-btn>
                <span>Seleccionar</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn slot="activator" color="primary" @click="editarFila" fab small dark>
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
            </v-flex>
          </v-layout>
        </v-container>
      </v-scroll-y-transition>
      <v-scroll-y-transition mode="out-in">
        <v-container grid-list-md text-xs-center v-if="editar">
          <formulario @cancelar="editar=false" @guardar="guardar($event)" :fila="model" ref="formulario_edicion"></formulario>
        </v-container>
      </v-scroll-y-transition>
    </template>
    <template slot="formulario">
      <!-- <v-progress-linear :indeterminate="true" v-if="cargando"></v-progress-linear> -->
      <formulario @cancelar="cancelar" @guardar="guardar($event)" ref="formulario_nuevo"></formulario>
    </template>
  </tabla>
</template>

<script>
import { default as global_components } from " ../../../src/common/components/";
import { default as components } from "../";
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    cargando: false,
    fila: {},
    filas: [],
    columnas: [],
    cargando_tabla: false,
    model: {
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
    },
    editar: false
  }),
  mounted() {
    this.recargarFilas();
  },
  components: {
    Tabla: global_components.DataTabla,
    Formulario: components.MEDFormulario
  },
  methods: {
    ...mapActions("krycnf", ["setMed"]),
    ...mapActions(["notificacion"]),
    recargarFilas() {
      this.cargando_tabla = true;
      this.filas = [];
      this.columnas = [];
      this.$http
        .get(`med`)
        .then(res => {
          this.filas = res.result.recordset;
          this.columnas = [];
          Object.keys(this.filas[0]).forEach(col => {
            this.columnas.push({ text: col.replace("_", " "), value: col });
          });
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          this.cargando_tabla = false;
        });
    },
    prepararNuevoRegistro() {
      this.model = {
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
      setTimeout(() => {
        this.$refs.formulario_nuevo.$refs.TIPO_ID.focus();
      }, 1000);
    },
    consultarFila() {
      this.cargando = true;
      this.$http
        .get(`med/${this.fila.IDMEDICO}`)
        .then(res => {
          this.model = res.result.recordset[0];
          // console.log(this.model);
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          this.cargando = false;
        });
    },
    seleccionar() {
      this.setMed(this.model);
      this.$emit("model", this.model);
      this.$refs.tabla.cerrarDialog();
    },
    eliminar() {
      return this.notificacion({
        message: "No está permitido eliminar un Médico, intente inactivarlo",
        type: "error"
      });
    },
    cancelar() {
      this.$refs.tabla.cerrarDialog();
    },
    guardar(_model) {
      const json = "json=" + JSON.stringify({ model: _model });
      // console.log(_model.IDMEDICO);
      // console.log(json);
      // return;
      this.cargando = true;
      if (!this.editar) {
        this.$refs.tabla.cerrarDialog();
        this.$http
          .put(`med`, json)
          .then(res => {
            this.cargando = false;
            if (res.success) {
              this.recargarFilas();
              this.notificacion({
                message:
                  "Registro Agregado a la Base de Datos Satisfactoriamente",
                type: "success"
              });
            } else {
              this.notificacion({
                message:
                  "Problemas al Intentar Realizar el Registro en la Base de Datos",
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
      } else {
        this.editar = false;
        this.$http
          .post(`med`, json)
          .then(res => {
            this.cargando = false;
            if (res.success) {
              this.recargarFilas();
              this.notificacion({
                message: "Registro Actualizado Satisfactoriamente",
                type: "success"
              });
              // this.$refs.tabla.cerrarDialog();
            } else {
              this.notificacion({
                message:
                  "Problemas al Intentar Actualizar el Registro en la Base de Datos",
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
      }
    },
    editarFila() {
      this.editar = true;
    },
    confirmarEdicion() {}
  },
  watch: {
    fila() {
      this.consultarFila();
    }
  },
  computed: {
    ...mapGetters("krycnf", ["mes", "cius", "deps"]),
    especialidad() {
      // console.log(this.mes);
      var model = this.model;
      if (!model.IDEMEDICA) return "";
      var especialidad = this.mes.filter(function(el) {
        return el.IDEMEDICA == model.IDEMEDICA;
      })[0].DESCRIPCION;
      return especialidad;
    },
    telefonos() {
      var telefonos = "";
      if (this.model.TELEFONOS && this.model.TELEFONOS.toString().trim() !== "")
        telefonos += this.model.TELEFONOS;
      if (this.model.TELEFONO && this.model.TELEFONO.toString().trim() !== "")
        telefonos += ", " + this.model.TELEFONO;
      if (this.model.TEL_OTRA && this.model.TEL_OTRA.toString().trim() !== "")
        telefonos += ", " + this.model.TEL_OTRA;
      if (telefonos === "") telefonos = "Sin Información";
      return telefonos;
    },
    ciudad() {
      if (!this.model.CIUDAD || this.model.CIUDAD === "") return "";
      var model = this.model;
      var ciudad = "";
      var ciu = this.cius.filter(function(el) {
        return el.CIUDAD == model.CIUDAD;
      })[0];
      if (!ciu) {
        return "";
      }
      if (ciu.NOMBRE && ciu.NOMBRE !== "") {
        ciudad += " - " + ciu.NOMBRE;
        var departamento = this.deps.filter(function(el) {
          return el.DPTO == ciu.DPTO;
        })[0];
        if (departamento.NOMBRE && departamento.NOMBRE !== "") {
          ciudad += " - " + departamento.NOMBRE;
        }
      }
      ciudad += ".";
      return ciudad;
    }
  }
};
</script>

<style>
</style>
