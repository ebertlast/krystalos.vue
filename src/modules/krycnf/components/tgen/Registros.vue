<template>
  <div>
    <v-expansion-panel v-model="panel" expand v-show="!(nombre_tabla&&nombre_campo)">
      <v-expansion-panel-content>
        <div slot="header">Filtros</div>
        <v-card>
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex xs4>
                <v-hover>
                  <v-card
                    slot-scope="{ hover }"
                    :class="`elevation-${hover ? 12 : 2}`"
                    class="mx-auto"
                  >
                    <v-card-text class="text-sm-left">
                      <!-- <span class="grey--text">Tabla</span> -->
                      <div>
                        <v-autocomplete
                          label="Tabla"
                          :items="tablas"
                          v-model="TABLA"
                          item-value="TABLA"
                          item-text="TABLA"
                          no-data-text="Registro no encontrado"
                        ></v-autocomplete>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-flex>
              <v-flex xs4 v-show="campos.length>0">
                <v-hover>
                  <v-card
                    slot-scope="{ hover }"
                    :class="`elevation-${hover ? 12 : 2}`"
                    class="mx-auto"
                  >
                    <v-card-text class="text-sm-left">
                      <v-autocomplete
                        label="Campo"
                        :items="campos"
                        v-model="CAMPO"
                        item-value="CAMPO"
                        item-text="CAMPO"
                        no-data-text="Registro no encontrado"
                      ></v-autocomplete>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-flex>
              <v-flex xs2>
                <v-btn color="info" @click="recargarFilas">Aplicar Filtros</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <tabla
      :columnas="columnas"
      :filas="filas"
      :loading="cargando_tabla"
      @fila="fila=$event;"
      :titulo="`Tabla Genérica ${TABLA} - ${CAMPO}`"
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
  </div>
</template>

<script>
import { default as global_components } from "../../../../common/components/";
import { default as components } from "../";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["nombre_tabla", "nombre_campo"],
  data: () => ({
    cargando: false,
    fila: {},
    filas: [],
    columnas: [],
    cargando_tabla: false,
    tablas: [],
    campos: [],
    TABLA: "",
    CAMPO: "",
    panel: [],
    model: {
      TABLA: undefined,
      CAMPO: undefined,
      CODIGO: undefined,
      DESCRIPCION: undefined,
      VALOR1: undefined,
      DATO1: undefined,
      DFECHA: undefined,
      OPCIONESLIBRES: undefined,
      VALORINI: undefined,
      VALORFIN: undefined,
      VALOR2: undefined,
      DATO2: undefined
    },
    editar: false
  }),
  components: {
    Tabla: global_components.DataTabla,
    EnConstruccion: global_components.EnConstruccion,
    Detalles: components.TGENDetalles,
    Formulario: components.TGENFormulario
  },
  mounted() {
    this.cargando = true;
    this.$http
      .get("tgen/tablas")
      .then(res => {
        this.tablas = res.result.recordset;
      })
      .then(() => {
        // this.recargarFilas();
        if (this.nombre_tabla) {
          this.TABLA = this.nombre_tabla;
        }
        if (this.nombre_campo) {
          this.CAMPO = this.nombre_campo;
        }

        if (this.TABLA !== "" && this.CAMPO !== "") {
          this.recargarFilas();
        }
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.cargando = false;
      });
  },
  methods: {
    ...mapActions(["notificacion"]),
    recargarFilas() {
      if (!TABLA || TABLA === "") {
        return;
      }
      this.panel = undefined;
      var url = `tgen/tabla/${this.TABLA}`;
      if (this.CAMPO && this.CAMPO !== "") {
        url = `tgen/${this.TABLA}/${this.CAMPO}/`;
      }
      this.cargando_tabla = true;
      this.filas = [];
      this.columnas = [];
      this.$http
        .get(url)
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
    recargarCampos() {
      if (!this.TABLA || this.TABLA === "") {
        return;
      }
      this.$http
        .get(`tgen/campos/${this.TABLA}`)
        .then(res => {
          this.campos = res.result.recordset;
        })
        .catch(err => {
          console.log(err);
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
          .put(`tgen`, json)
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
          .post(`tgen`, json)
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
  },
  watch: {
    TABLA() {
      this.CAMPO = "";
      this.campos = [];
      this.recargarCampos();
      // this.recargarFilas();
    },
    CAMPO() {
      // this.recargarFilas();
    }
  }
};
</script>