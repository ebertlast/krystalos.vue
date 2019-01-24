<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs10>
        <v-tooltip top>
          <div class="text-xs-center" slot="activator">
            <v-combobox
              v-model="palabras"
              :items="items_palabras"
              label="Escribe aquí las palabras a coincidir en los artículos a consultar"
              chips
              clearable
              prepend-icon="filter_list"
              solo
              multiple
              v-on:keyup.ctrl.enter="recargarFilas"
            >
              <template slot="selection" slot-scope="data">
                <v-chip :selected="data.selected" close @input="remove(data.item)">
                  <strong>{{ data.item }}</strong>&nbsp;
                  <span v-if="false">(interest)</span>
                </v-chip>
              </template>
            </v-combobox>
          </div>
          <span>Ctrl+Enter para consultar</span>
        </v-tooltip>
      </v-flex>
      <v-flex xs2>
        <v-btn @click="recargarFilas">Consultar</v-btn>
      </v-flex>
      <v-flex xs12>
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
    fila: {},
    filas: [],
    columnas: [],
    cargando_tabla: false,
    palabras: [],
    items_palabras: [],
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
    // this.recargarFilas();
  },
  methods: {
    ...mapActions(["notificacion"]),
    recargarFilas() {
      var _palabras = "";
      this.palabras.forEach(palabra => {
        _palabras += palabra + ",";
      });
      _palabras = _palabras.substring(0, _palabras.length - 1);
      this.cargando_tabla = true;
      this.filas = [];
      this.columnas = [];
      var model = {
        PRINCIPAL: 1
      };
      if (_palabras) {
        model = {
          PRINCIPAL: 1,
          PALABRAS: _palabras
        };
      } else {
        // this.$http
        //   .get(`iart`)
        //   .then(res => {
        //     this.filas = res.result.recordset;
        //     this.columnas = [];
        //     Object.keys(this.filas[0]).forEach(col => {
        //       this.columnas.push({ text: col.replace("_", " "), value: col });
        //     });
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   })
        //   .then(() => {
        //     this.cargando_tabla = false;
        //   });
      }
      const json = "json=" + JSON.stringify({ model: model });
      this.$http
        .post(`iart/get`, json)
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
      _model.ESTRANSFORMABLE = _model.ESTRANSFORMABLE ? "1" : "0";
      _model.ALTO_COSTO = _model.ALTO_COSTO ? "1" : "0";
      _model.ESACTIVO = _model.ESACTIVO ? "1" : "0";
      _model.CONT_ESPECIAL = _model.CONT_ESPECIAL ? "1" : "0";
      _model.ENTREGA_TURNO = _model.ENTREGA_TURNO ? "1" : "0";
      _model.REGULADO = _model.REGULADO ? "1" : "0";
      // _model.INSTITUCIONAL = _model.INSTITUCIONAL ? "1" : "0";
      _model.NOPOS = _model.NOPOS ? "1" : "0";
      const json = "json=" + JSON.stringify({ model: _model });
      this.cargando = true;
      if (!this.editar) {
        this.$refs.tabla.cerrarDialog();
        this.$http
          .post(`iart`, json)
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
          .put(`iart`, json)
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
    },
    remove(item) {
      this.palabras.splice(this.palabras.indexOf(item), 1);
      this.palabras = [...this.palabras];
    }
  }
};
</script>