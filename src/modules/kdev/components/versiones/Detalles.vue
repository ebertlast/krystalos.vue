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
              <span class="grey--text">ID</span>
              <div>{{(model && model.ID) ? model.ID : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">PRODUCTO</span>
              <div>{{(model && model.PRODUCTO) ? model.PRODUCTO : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">FECHA</span>
              <div>{{(model && model.FECHA) ? model.FECHA : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">ESTADO</span>
              <div>{{(model && model.ESTADO) ? model.ESTADO : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">IDANT</span>
              <div>{{(model && model.IDANT) ? model.IDANT : ""}}</div>
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
      ID: undefined,
      PRODUCTO: undefined,
      FECHA: undefined,
      ESTADO: undefined,
      IDANT: undefined
    }
  }),
  mounted() {
    this.refrescarDatos();
  },
  methods: {
    ...mapActions(["notificacion"]),
    refrescarDatos() {
      if (!this.fila) return;
      this.cargando = true;
      this.model = {};
      this.$http
        .get(`versiones`)
        .then(res => {
          this.model = res.result.recordset[0];
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
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
    