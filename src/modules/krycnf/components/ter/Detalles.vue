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
              <span class="grey--text">IDTERCERO</span>
              <div>{{(model && model.IDTERCERO) ? model.IDTERCERO : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">RAZONSOCIAL</span>
              <div>{{(model && model.RAZONSOCIAL) ? model.RAZONSOCIAL : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">TIPO IDENTIFICACION</span>
              <div>{{(model && model.TIPO_ID) ? model.TIPO_ID : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">IDENTIFICACION</span>
              <div>{{(model && model.NIT) ? model.NIT : ""}}{{(model && model.DV) ? "-"+model.DV : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs9>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">DIRECCION</span>
              <div>{{(model && model.DIRECCION) ? model.DIRECCION : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">CIUDAD</span>
              <div>{{(model && model.NOMBRE_CIUDAD) ? model.NOMBRE_CIUDAD : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">DEPARTAMENTO</span>
              <div>{{(model && model.DEPARTAMENTO) ? model.DEPARTAMENTO : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">TELEFONOS</span>
              <div>{{(model && model.TELEFONOS) ? model.TELEFONOS : ""}}</div>
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
              <span class="grey--text">EMAIL</span>
              <div>{{(model && model.EMAIL) ? model.EMAIL : "Sin Información"}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">PNOMBRE</span>
              <div>{{(model && model.PNOMBRE) ? model.PNOMBRE : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">SNOMBRE</span>
              <div>{{(model && model.SNOMBRE) ? model.SNOMBRE : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">PAPELLIDO</span>
              <div>{{(model && model.PAPELLIDO) ? model.PAPELLIDO : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">SAPELLIDO</span>
              <div>{{(model && model.SAPELLIDO) ? model.SAPELLIDO : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs12>
        <hr>
        <h2>Categorizaciones</h2>
      </v-flex>
      <v-flex xs2>
        <v-autocomplete
          v-model="idcategoria"
          :items="categoriasFiltradas"
          label="ID Categoria"
          persistent-hint
          prepend-icon="mdi-city"
          item-value="IDCATEGORIA"
          item-text="IDCATEGORIA"
          ref="categoria"
          class="uppercase"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs8>
        <v-autocomplete
          v-model="idcategoria"
          :items="categoriasFiltradas"
          label="Categoría"
          persistent-hint
          prepend-icon="mdi-city"
          item-value="IDCATEGORIA"
          item-text="DESCRIPCION"
          ref="categoria"
          class="uppercase"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs2>
        <v-btn color="success" @click="guardarCategoria">Agregar</v-btn>
      </v-flex>
      <v-flex xs12>
        <v-chip close @input="eliminarCategoria(item)" v-for="(item, index) in texca" :key="index">
          <strong class="text-uppercase">{{ item.DESCRIPCION }}</strong>
        </v-chip>
      </v-flex>
      <v-flex xs12>
        <hr>
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
      IDTERCERO: undefined,
      RAZONSOCIAL: undefined,
      NIT: undefined,
      DV: undefined,
      TIPO_ID: undefined,
      IDALTERNA1: undefined,
      IDALTERNA2: undefined,
      DIRECCION: undefined,
      NATJURIDICA: undefined,
      CIUDAD: undefined,
      TELEFONOS: undefined,
      FAX: undefined,
      APA: undefined,
      F_INSCRIPTO: undefined,
      F_RENOVACION: undefined,
      F_VENCIMIENT: undefined,
      R_LEGAL: undefined,
      TIPO_ID_R: undefined,
      NIT_R: undefined,
      ESTADO: undefined,
      REQAUTORIZA: undefined,
      CUENTA: undefined,
      ZONA: undefined,
      CIA: undefined,
      ACT_ECONOMICA: undefined,
      ENVIODICAJA: undefined,
      MODOCOPAGO: undefined,
      EMPIDMODELOPC: undefined,
      DIASVTO: undefined,
      ESEXTRANJERO: undefined,
      CLASIFICADOR: undefined,
      IDGRUPOIMP: undefined,
      AUTORETENEDOR: undefined,
      GRANCONTRIBUYENTE: undefined,
      EMAIL: undefined,
      URL: undefined,
      NOMBRES_R_LEGAL: undefined,
      P_APELLIDO_R_LEGAL: undefined,
      S_APELLIDO_R_LEGAL: undefined,
      DE_NIT_R_LEGAL: undefined,
      IDACTIVIDAD: undefined,
      TIPOREGIMEN: undefined,
      MSUCURSALES: undefined,
      FORMAPRE: undefined,
      CODIGO_ARP: undefined,
      NORAD: undefined,
      TIPOAPORTANTE: undefined,
      CODOPERADOR: undefined,
      CODIGO_AFP: undefined,
      CODIGO_CCF: undefined,
      ASESOR_AFI: undefined,
      ASESOR_MTO: undefined,
      FNAC_RLEGAL: undefined,
      HOBBIE_RL: undefined,
      PROF_RL: undefined,
      EMAIL_RL: undefined,
      TIPOID_TH: undefined,
      NID_TH: undefined,
      DE_NIT_TH: undefined,
      NOMBRES_TH: undefined,
      P_APELLIDO_TH: undefined,
      S_APELLIDO_TH: undefined,
      FNAC_TH: undefined,
      HOBBIE_TH: undefined,
      PROF_TH: undefined,
      EMAIL_TH: undefined,
      ITFC: undefined,
      CNSITFC: undefined,
      HOMOLOGO: undefined,
      PNOMBRE: undefined,
      SNOMBRE: undefined,
      PAPELLIDO: undefined,
      SAPELLIDO: undefined,
      CUE_BANCARIA: undefined,
      TIPO_CUE: undefined,
      BANCO: undefined,
      SUCURSAL: undefined,
      NIIF_VTAEQUIEFECTIVOS: undefined,
      MANFACT: undefined,
      CTAVIGENCIAANTE: undefined,
      EMAILRECIBOFE: undefined
    },
    categorias: [],
    texca: [],
    idcategoria: undefined,
    cargandoCategorias: false
  }),
  mounted() {
    this.refrescarDatos();
    this.$http
      .get("cat/")
      .then(res => {
        this.categorias = res.result.recordset;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    ...mapActions(["notificacion"]),
    refrescarDatos() {
      if (!this.fila || !this.fila.IDTERCERO) return;
      this.cargando = true;
      this.model = {};
      this.$http
        .get(`ter/${this.fila.IDTERCERO}`)
        .then(res => {
          this.model = res.result.recordset[0];
        })
        .then(() => {
          this.refrescarTexca();
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
    },
    guardarCategoria() {
      var _model = {
        IDCATEGORIA: this.idcategoria,
        IDTERCERO: this.model.IDTERCERO
      };
      const json = "json=" + JSON.stringify({ model: _model });
      this.cargandoCategorias = true;
      this.$http
        .post(`texca`, json)
        .then(res => {
          if (res.success) {
            this.notificacion({
              message: "Registro Actualizado Satisfactoriamente",
              type: "success"
            });
            this.refrescarTexca();
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
          this.cargandoCategorias = false;
        });
    },
    eliminarCategoria(texca) {
      for (let index = 0; index < this.texca.length; index++) {
        const el = this.texca[index];
        if (el.IDCATEGORIA == texca.IDCATEGORIA) {
          this.cargandoCategorias = true;

          this.$http
            .delete(`texca/${this.model.IDTERCERO}/${el.IDCATEGORIA}`)
            .then(res => {
              if (res.success) {
                this.notificacion({
                  message: "Registro Actualizado Satisfactoriamente",
                  type: "success"
                });
                this.texca.splice(index, 1);
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
              this.cargandoCategorias = false;
            });
        }
      }
    },
    refrescarTexca() {
      if (this.model && this.model.IDTERCERO) {
        this.$http.get(`texca/${this.model.IDTERCERO}/`).then(res => {
          this.texca = [];
          res.result.recordset.forEach(el => {
            this.texca.push({
              IDCATEGORIA: el.IDCATEGORIA,
              DESCRIPCION: el.CATEGORIA
            });
          });
        });
      }
    }
  },
  watch: {
    fila() {
      this.refrescarDatos();
    }
  },
  computed: {
    categoriasFiltradas() {
      var cats = [];
      this.categorias.forEach(el => {
        var agregar = true;
        this.texca.forEach(element => {
          if (agregar) {
            if (el.IDCATEGORIA == element.IDCATEGORIA) {
              agregar = false;
            }
          }
        });
        if (agregar) {
          cats.push(el);
        }
      });
      return cats;
    }
  }
};
</script>
    