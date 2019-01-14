<template>
  <tabla
    :columnas="columnas"
    :filas="filas"
    :loading="cargando_tabla"
    @fila="fila=$event;"
    titulo="Artículos"
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
          ></formulario>
        </v-container>
      </v-scroll-y-transition>
    </template>
    <template slot="formulario">
      <en-construccion @cancelar="cancelar"></en-construccion>
    </template>
  </tabla>
</template>

<script>
import { default as global_components } from "../../../../common/components/";
import { default as components } from "../";
export default {
  data: () => ({
    cargando: false,
    fila: {},
    filas: [],
    columnas: [],
    cargando_tabla: false,
    model: {
      IDARTICULO: undefined,
      IDCLASE: undefined,
      IDSUBCLASE: undefined,
      IDGRUPO: undefined,
      DESCRIPCION: undefined,
      IDPRINACTIVO: undefined,
      IDFORFARM: undefined,
      IDCONCENTRA: undefined,
      IDUNIDAD: undefined,
      PCOSTO: undefined,
      EXISTOTAL: undefined,
      STOCKMINIMO: undefined,
      STOCKMAXIMO: undefined,
      PUNTOREORDEN: undefined,
      IDITAR: undefined,
      ESTRANSFORMABLE: undefined,
      ESTADO: undefined,
      IDGENERICO: undefined,
      CUENTA: undefined,
      IDFABRICANTE: undefined,
      ESACTIVO: undefined,
      IDTIPOACTIVO: undefined,
      IDALTERNA: undefined,
      REGINVIMA: undefined,
      ALTO_COSTO: undefined,
      CONT_ESPECIAL: undefined,
      ENTREGA_TURNO: undefined,
      UTILIDAD: undefined,
      DOSIFICADO: undefined,
      NDOSIS: undefined,
      CODCUM: undefined,
      ESCALA_RIESGO: undefined,
      IDSERVICIO: undefined,
      PRINCIPAL: undefined,
      CLASERIESGO: undefined,
      TESTABILIDAD: undefined,
      CLASE: undefined,
      MLOTEO: undefined,
      IDSERVICIOBASE: undefined,
      CANTIDADBASE: undefined,
      IDSERVICIOMEZCLA: undefined,
      CANTIDADMEZCLA: undefined,
      CODIBASE: undefined,
      CENTRAL: undefined,
      IDSERVICIOCOBRO: undefined,
      CTV: undefined,
      F_VIGENCIAINV: undefined,
      REGULADO: undefined,
      PRECOMERCIAL: undefined,
      NOPOS: undefined,
      CONTADOR: undefined,
      GRUPO: undefined,
      LABILIDAD: undefined,
      INSTITUCIONAL: undefined,
      HEMOCLASIFICACION: undefined,
      JUSTIFICACION: undefined,
      CODBARRA: undefined
    },
    editar: false
  }),
  components: {
    Tabla: global_components.DataTabla,
    EnConstruccion: global_components.EnConstruccion,
    Detalles: components.IARTDetalles,
    Formulario: components.IARTFormulario
  },
  mounted() {
    this.recargarFilas();
  },
  methods: {
    recargarFilas() {
      this.cargando_tabla = true;
      this.filas = [];
      this.columnas = [];
      this.$http
        .get(`iart`)
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
        this.$http
          .put(`iart`, json)
          .then(res => {
            this.cargando = false;
            if (res.success) {
              this.recargarFilas();
              this.notificacion({
                message:
                  "Registro Agregado a la Base de Datos Satisfactoriamente",
                type: "success"
              });
              this.$refs.tabla.cerrarDialog();
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
        this.$http
          .post(`iart`, json)
          .then(res => {
            this.cargando = false;
            if (res.success) {
              this.recargarFilas();
              this.notificacion({
                message: "Registro Actualizado Satisfactoriamente",
                type: "success"
              });
              this.editar = false;
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