<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-scroll-y-transition mode="out-in">
        <v-flex xs12 v-if="cargando">
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-flex>
      </v-scroll-y-transition>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">IDMEDICO</span>
              <div>{{(model && model.IDMEDICO) ? model.IDMEDICO : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">TIPO_USUARIO</span>
              <div>{{(model && model.TIPO_USUARIO) ? model.TIPO_USUARIO : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs6>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">NOMBRE</span>
              <div>{{(model && model.NOMBRE) ? model.NOMBRE : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">ESPECIALIDAD</span>
              <div>{{(model && model.ESPECIALIDAD) ? model.ESPECIALIDAD : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">CELULAR</span>
              <div>{{(model && model.CELULAR) ? model.CELULAR : "Sin Información"}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">TELEFONO</span>
              <div>{{(model && model.TELEFONO) ? model.TELEFONO : "Sin Información"}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">ESTADO</span>
              <div>{{(model && model.ESTADO) ? model.ESTADO : "Sin Información"}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">EMAIL</span>
              <div>{{(model && model.EMAIL) ? model.EMAIL : "Sin Información"}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-scroll-y-transition mode="out-in" v-if="!cargando">
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
      </v-scroll-y-transition>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["fila"],
  data: () => ({
    cargando: false,
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
    }
  }),
  mounted() {
    this.refrescarDatos();
  },
  methods: {
    ...mapActions(["notificacion"]),
    refrescarDatos() {
      if (!this.fila || !this.fila.IDMEDICO) return;
      this.cargando = true;
      this.model = {};
      this.$http
        .get(`med/${this.fila.IDMEDICO}`)
        .then(res => {
          this.model = res.result.recordset[0];
        })
        .then(() => {
          this.cargando = false;
        })
        .catch(err => {
          this.cargando = false;
        });
    },
    seleccionar() {
      this.$emit("seleccionar", this.model);
    },
    eliminar() {
      return this.notificacion({
        message:
          "No está permitido eliminar un registro de esta tabla, intente inactivarlo",
        type: "error"
      });
    },
    cancelar() {
      this.$emit("cancelar");
    },
    editarFila() {
      this.$emit("editar", this.model);
    }
  },
  watch: {
    fila() {
      this.refrescarDatos();
    }
  }
};
</script>
    