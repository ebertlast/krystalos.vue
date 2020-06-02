<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs2>
        <v-autocomplete
          :items="productos"
          label="Producto"
          solo
          item-text="PRODUCTO"
          item-value="PRODUCTO"
          v-model="producto"
          :loading="cargando_versiones"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs2 v-show="producto && producto!=''">
        <v-autocomplete
          :items="versiones_x_productos"
          label="Versión"
          solo
          item-text="ID"
          item-value="ID"
          v-model="version"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs12 v-show="version && version!=''">
        <tabla
          :columnas="columnas"
          :filas="filas"
          :loading="cargando_tabla"
          @fila="fila=$event;"
          titulo="SQLIX"
          ref="tabla"
        >
          <!-- v-show="versiones.length<=0" -->
          <template slot="detalles">
            <v-scroll-y-transition mode="out-in">
              <detalles
                @cancelar="cancelar"
                :fila="fila"
                v-if="!editar"
                @editar="editarFila($event)"
                @seleccionar="seleccionar($event)"
              ></detalles>
            </v-scroll-y-transition>
            <v-scroll-y-transition mode="out-in">
              <v-container grid-list-md text-xs-center v-if="editar">
                <formulario
                  @cancelar="editar=false"
                  @guardar="guardar($event)"
                  :fila="model"
                  ref="formulario_edicion"
                  :editar="true"
                ></formulario>
              </v-container>
            </v-scroll-y-transition>
          </template>
          <template slot="formulario">
            <formulario
              @cancelar="cancelar"
              @guardar="guardar($event)"
              :id="version"
              ref="formulario_nuevo"
              :editar="false"
            ></formulario>
          </template>
        </tabla>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { default as global_components } from "../../../../common/components/";
import { default as components } from "../";
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    cargando: false,
    cargando_versiones: false,
    fila: {},
    filas: [],
    columnas: [],
    cargando_tabla: false,
    model: {
      ID: undefined,
      ORDEN: undefined,
      NOMBRE: undefined,
      TIPO: undefined,
      BORRADO: undefined,
      QUERY: undefined,
      QUERY2: undefined,
      INSTRUCCION: undefined
    },
    editar: false,
    versiones: [],
    version: undefined,
    producto: undefined
  }),
  components: {
    Tabla: global_components.DataTabla,
    EnConstruccion: global_components.EnConstruccion,
    Detalles: components.SQLIXDetalles,
    Formulario: components.SQLIXFormulario
  },
  mounted() {
    this.recargarVersiones();
  },
  methods: {
    ...mapActions(["notificacion"]),
    recargarVersiones() {
      this.cargando_versiones = true;
      this.filas = [];
      this.columnas = [];
      this.$http
        .get(`versiones`)
        .then(res => {
          this.versiones = res.result.recordset;
          console.log(this.versiones);
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          this.cargando_versiones = false;
        });
    },
    recargarFilas() {
      if (!this.version || this.version == "") {
        return;
      }
      this.cargando_tabla = true;
      this.filas = [];
      this.columnas = [];
      this.$http
        .get(`sqlix/${this.version}`)
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
    seleccionar(model) {
      this.model = model;
      this.$emit("model", this.model);
      this.$refs.tabla.cerrarDialog();
    },
    editarFila(_model) {
      this.model = _model;
      this.editar = true;
    },
    guardar(_model) {
      const json = "json=" + JSON.stringify({ model: _model });
      this.cargando = true;
      if (!this.editar) {
        this.$refs.tabla.cerrarDialog();
        this.$http
          .post(`sqlix`, json)
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
          .put(`sqlix`, json)
          .then(res => {
            this.cargando = false;
            if (res.success) {
              this.recargarFilas();
              this.notificacion({
                message: "Registro Actualizado Satisfactoriamente",
                type: "success"
              });
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
    cancelar() {
      this.$refs.tabla.cerrarDialog();
    }
  },
  watch: {
    version(val) {
      console.log("Version: ", val);
      this.recargarFilas();
    },
    versiones(val) {
      console.log("Versiones: ", val);
    },
    producto(val) {
      console.log("Producto: ", val);
    }
  },
  computed: {
    productos() {
      var productos = [];
      for (let i = 0; i < this.versiones.length; i++) {
        const el = this.versiones[i];
        var existe = productos.filter(function(element) {
          return element.PRODUCTO == el.PRODUCTO;
        }).PRODUCTO;
        if (!existe) {
          productos.push(el.PRODUCTO);
        }
      }
      console.log("Productos: ", productos);
      return productos;
    },
    versiones_x_productos() {
      var self = this;
      return this.versiones.filter(function(el) {
        return el.PRODUCTO == self.producto;
      });
    }
  }
};
</script>