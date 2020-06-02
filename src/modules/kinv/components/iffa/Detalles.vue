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
              <span class="grey--text">IDFORFARM</span>
              <div>{{(model && model.IDFORFARM) ? model.IDFORFARM : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">DESCRIPCION</span>
              <div>{{(model && model.DESCRIPCION) ? model.DESCRIPCION : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">IDITAR</span>
              <div>{{(model && model.IDITAR) ? model.IDITAR : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
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
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["fila"],
  data: () => ({
    cargando: false,
    model: {
      IDFORFARM: undefined,
      DESCRIPCION: undefined,
      IDITAR: undefined
    }
  }),
  mounted() {
    this.refrescarDatos();
  },
  methods: {
    ...mapActions(["notificacion"]),
    refrescarDatos() {
      if (!this.fila || !this.fila.IDFORFARM) return;
      this.cargando = true;
      this.model = {};
      this.$http
        .get(`iffa/${this.fila.IDFORFARM}`)
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
    