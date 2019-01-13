<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-scroll-y-transition mode="out-in">
        <v-flex xs12 v-if="cargando">
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-flex>
      </v-scroll-y-transition>
      <v-flex xs12>
        <h1>Ficha Técnica</h1>
      </v-flex>
      <v-flex xs12>
        <v-card
          dark
          :color="(model.ESTADO==='Activo')?'success':'error'"
          v-if="model.DESCRIPCION && model.DESCRIPCION !== ''"
        >
          <v-card-text class="px-0">{{model.DESCRIPCION}}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">IDARTICULO</span>
              <div>{{model.IDARTICULO}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">IDSERVICIO</span>
              <div>{{model.IDSERVICIO}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">IDALTERNA</span>
              <div v-if="model.IDALTERNA">{{model.IDALTERNA}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">ESTADO</span>
              <div>{{model.ESTADO}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs12>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">GENÉRICO</span>
              <br>
              {{model.IDGENERICO}} - {{model.GENERICO}}
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs12>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">UNIDAD</span>
              <br>
              {{model.IDUNIDAD}} - {{model.UNIDADMEDIDA}}
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs12>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">CLASE</span>
              <br>
              {{model.IDCLASE}} - {{model.CLASE}}
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs12>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">SUBCLASE</span>
              <br>
              {{model.IDSUBCLASE}} - {{model.SUBCLASE}}
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs12>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">GRUPO</span>
              <br>
              {{model.IDGRUPO}} - {{model.GRUPO}}
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs12 style="cursor:pointer">
        <v-card dark color="secondary" @click="$emit('cancelar')">
          <v-card-text class="px-0">Cancelar</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["fila"],
  data: () => ({
    cargando: false,
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
    igen: {
      IDGENERICO: undefined,
      DESCRIPCION: undefined,
      IDCLASE: undefined,
      IDSUBCLASE: undefined,
      IDGRUPO: undefined,
      IDPRINACTIVO: undefined,
      IDTGENERICO: undefined
    }
  }),
  mounted() {
    if (
      this.fila.IDARTICULO !== "" &&
      (!this.model.DESCRIPCION || this.model.DESCRIPCION == "")
    ) {
      this.refrescarDatos();
    }
  },
  methods: {
    refrescarDatos() {
      if (this.fila.IDARTICULO && this.fila.IDARTICULO !== "") {
        this.cargando = true;
        this.model = {};
        this.$http
          .get(`iart/${this.fila.IDARTICULO}`)
          .then(res => {
            this.model = res.result.recordset[0];
          })
          .then(() => {
            this.cargando = false;
          })
          .catch(err => {
            this.cargando = false;
          });
      }
    }
  },
  watch: {
    fila() {
      this.refrescarDatos();
    }
  }
};
</script>

<style>
</style>
