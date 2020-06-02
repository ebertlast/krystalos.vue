<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-scroll-y-transition mode="out-in">
        <v-flex xs12 v-if="cargando">
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-flex>
      </v-scroll-y-transition>
      <v-flex xs2>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">ID</span>
              <div>{{(model && model.ID) ? model.ID : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs2>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">ORDEN</span>
              <div>{{(model && model.ORDEN) ? model.ORDEN : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs2>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">TIPO</span>
              <div>{{(model && model.TIPO) ? model.TIPO : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs2>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">NOMBRE</span>
              <div>{{(model && model.NOMBRE) ? model.NOMBRE : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-scroll-y-transition mode="out-in" v-if="!cargando">
        <v-flex xs4>
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
    <v-flex xs6 v-if="false">
      <v-hover>
        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
          <v-card-text class="text-sm-left">
            <span class="grey--text">BORRADO</span>
            <div>{{(model && model.BORRADO) ? model.BORRADO : ""}}</div>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-flex>
    <v-flex xs3 v-if="false">
      <v-hover>
        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
          <v-card-text class="text-sm-left">
            <span class="grey--text">QUERY</span>
            <div>{{(model && model.QUERY) ? model.QUERY : ""}}</div>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-flex>
    <v-flex xs3 v-if="false">
      <v-hover>
        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
          <v-card-text class="text-sm-left">
            <span class="grey--text">QUERY2</span>
            <div>{{(model && model.QUERY2) ? model.QUERY2 : ""}}</div>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-flex>
    <v-flex xs12>
      <v-hover>
        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
          <v-card-text class="text-sm-left">
            <span class="grey--text">INSTRUCCION</span>
            <pre style="cursor: pointer" @click="setClipboard(model.INSTRUCCION)">{{(model && model.INSTRUCCION) ? model.INSTRUCCION : ""}}</pre>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-flex>
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
      ORDEN: undefined,
      NOMBRE: undefined,
      TIPO: undefined,
      BORRADO: undefined,
      QUERY: undefined,
      QUERY2: undefined,
      INSTRUCCION: undefined
    }
  }),
  mounted() {
    this.refrescarDatos();
  },
  methods: {
    ...mapActions(["notificacion", "setClipboard"]),
    refrescarDatos() {
      if (!this.fila) return;
      this.cargando = true;
      this.model = {};
      var ruta = "sqlix/";
      if (this.fila.ID && this.fila.ORDEN)
        ruta = `sqlix/${this.fila.ID}/${this.fila.ORDEN}`;
      this.$http
        .get(ruta)
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
    