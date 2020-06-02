<template>
  <tabla
    :columnas="columnas"
    :filas="filas"
    :loading="cargando_tabla"
    @fila="fila=$event;"
    titulo="Agrupación de Medicamentos"
    ref="tabla"
  >
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
        ref="formulario_nuevo"
        :editar="false"
      ></formulario>
    </template>
  </tabla>
</template>

<script>
import { default as global_components } from "../../../../common/components/";
import { default as components } from "../";
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    cargando: false,
    fila: {},
    filas: [],
    columnas: [],
    cargando_tabla: false,
    model: {
      IDCLASE: undefined,
      IDSUBCLASE: undefined,
      IDGRUPO: undefined,
      DESCRIPCION: undefined
    },
    editar: false
  }),
  components: {
    Tabla: global_components.DataTabla,
    EnConstruccion: global_components.EnConstruccion,
    Detalles: components.IGRUDetalles,
    Formulario: components.IGRUFormulario
  },
  mounted() {
    this.recargarFilas();
  },
  methods: {
    ...mapActions(["notificacion"]),
    recargarFilas() {
      this.cargando_tabla = true;
      this.filas = [];
      this.columnas = [];
      this.$http
        .get(`igru`)
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
      console.log(this.model);
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
          .post(`igru`, json)
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
          .put(`igru`, json)
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
  }
};
</script>