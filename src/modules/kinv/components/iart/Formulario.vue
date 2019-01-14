<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-text-field
          name="IDARTICULO"
          label="CODIGO"
          id="IDARTICULO"
          ref="IDARTICULO"
          v-model="model.IDARTICULO"
          :disabled="editar"
        ></v-text-field>
      </v-flex>

      <v-flex xs9>
        <v-text-field
          name="DESCRIPCION"
          label="DESCRIPCION"
          id="DESCRIPCION"
          ref="DESCRIPCION"
          v-model="model.DESCRIPCION"
        ></v-text-field>
      </v-flex>

      <v-flex xs1>
        <v-autocomplete
          label="IDCLASE"
          :items="iclas"
          v-model="model.IDCLASE"
          item-value="IDCLASE"
          item-text="IDCLASE"
          no-data-text="Registro no encontrado"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs5>
        <v-autocomplete
          label="CLASE"
          :items="iclas"
          v-model="model.IDCLASE"
          item-value="IDCLASE"
          item-text="DESCRIPCION"
          ref="IDCLASE"
          no-data-text="Registro no encontrado"
        ></v-autocomplete>
      </v-flex>

      <v-flex xs1>
        <v-autocomplete
          label="IDSUBCLASE"
          :items="iclahFiltradas"
          v-model="model.IDSUBCLASE"
          item-value="IDSUBCLASE"
          item-text="IDSUBCLASE"
          no-data-text="Registro no encontrado"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs5>
        <v-autocomplete
          label="SUBCLASE"
          :items="iclahFiltradas"
          v-model="model.IDSUBCLASE"
          item-value="IDSUBCLASE"
          item-text="DESCRIPCION"
          ref="IDSUBCLASE"
          no-data-text="Registro no encontrado"
        ></v-autocomplete>
      </v-flex>

      <v-flex xs1>
        <v-autocomplete
          label="IDGRUPO"
          :items="igrusFiltrados"
          v-model="model.IDGRUPO"
          item-value="IDGRUPO"
          item-text="IDGRUPO"
          no-data-text="Registro no encontrado"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs5>
        <v-autocomplete
          label="GRUPO"
          :items="igrusFiltrados"
          v-model="model.IDGRUPO"
          item-value="IDGRUPO"
          item-text="DESCRIPCION"
          ref="IDGRUPO"
          no-data-text="Registro no encontrado"
        ></v-autocomplete>
      </v-flex>

      <v-flex xs1>
        <v-autocomplete
          label="IDFORFARM"
          :items="iffas"
          v-model="model.IDFORFARM"
          item-value="IDFORFARM"
          item-text="IDFORFARM"
          no-data-text="Registro no encontrado"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs5>
        <v-autocomplete
          label="IDFORFARM"
          :items="iffas"
          v-model="model.IDFORFARM"
          item-value="IDFORFARM"
          item-text="DESCRIPCION"
          ref="IDFORFARM"
          no-data-text="Registro no encontrado"
        ></v-autocomplete>
      </v-flex>

      <v-flex xs2>
        <v-autocomplete
          label="PRINCIPIO ACTIVO"
          :items="ipacs"
          v-model="model.IDPRINACTIVO"
          item-value="IDPRINACTIVO"
          item-text="IDPRINACTIVO"
          no-data-text="Registro no encontrado"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs10>
        <v-autocomplete
          label="PRINCIPIO ACTIVO"
          :items="ipacs"
          v-model="model.IDPRINACTIVO"
          item-value="IDPRINACTIVO"
          item-text="DESCRIPCION"
          ref="IDPRINACTIVO"
          no-data-text="Registro no encontrado"
        ></v-autocomplete>
      </v-flex>

      

      <v-flex xs3>
        <v-text-field
          name="IDCONCENTRA"
          label="IDCONCENTRA"
          id="IDCONCENTRA"
          ref="IDCONCENTRA"
          v-model="model.IDCONCENTRA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IDUNIDAD"
          label="IDUNIDAD"
          id="IDUNIDAD"
          ref="IDUNIDAD"
          v-model="model.IDUNIDAD"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="PCOSTO" label="PCOSTO" id="PCOSTO" ref="PCOSTO" v-model="model.PCOSTO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="EXISTOTAL"
          label="EXISTOTAL"
          id="EXISTOTAL"
          ref="EXISTOTAL"
          v-model="model.EXISTOTAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="STOCKMINIMO"
          label="STOCKMINIMO"
          id="STOCKMINIMO"
          ref="STOCKMINIMO"
          v-model="model.STOCKMINIMO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="STOCKMAXIMO"
          label="STOCKMAXIMO"
          id="STOCKMAXIMO"
          ref="STOCKMAXIMO"
          v-model="model.STOCKMAXIMO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PUNTOREORDEN"
          label="PUNTOREORDEN"
          id="PUNTOREORDEN"
          ref="PUNTOREORDEN"
          v-model="model.PUNTOREORDEN"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="IDITAR" label="IDITAR" id="IDITAR" ref="IDITAR" v-model="model.IDITAR"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="ESTRANSFORMABLE"
          label="ESTRANSFORMABLE"
          id="ESTRANSFORMABLE"
          ref="ESTRANSFORMABLE"
          v-model="model.ESTRANSFORMABLE"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="ESTADO" label="ESTADO" id="ESTADO" ref="ESTADO" v-model="model.ESTADO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IDGENERICO"
          label="IDGENERICO"
          id="IDGENERICO"
          ref="IDGENERICO"
          v-model="model.IDGENERICO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="CUENTA" label="CUENTA" id="CUENTA" ref="CUENTA" v-model="model.CUENTA"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IDFABRICANTE"
          label="IDFABRICANTE"
          id="IDFABRICANTE"
          ref="IDFABRICANTE"
          v-model="model.IDFABRICANTE"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="ESACTIVO"
          label="ESACTIVO"
          id="ESACTIVO"
          ref="ESACTIVO"
          v-model="model.ESACTIVO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IDTIPOACTIVO"
          label="IDTIPOACTIVO"
          id="IDTIPOACTIVO"
          ref="IDTIPOACTIVO"
          v-model="model.IDTIPOACTIVO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IDALTERNA"
          label="IDALTERNA"
          id="IDALTERNA"
          ref="IDALTERNA"
          v-model="model.IDALTERNA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="REGINVIMA"
          label="REGINVIMA"
          id="REGINVIMA"
          ref="REGINVIMA"
          v-model="model.REGINVIMA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="ALTO_COSTO"
          label="ALTO_COSTO"
          id="ALTO_COSTO"
          ref="ALTO_COSTO"
          v-model="model.ALTO_COSTO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CONT_ESPECIAL"
          label="CONT_ESPECIAL"
          id="CONT_ESPECIAL"
          ref="CONT_ESPECIAL"
          v-model="model.CONT_ESPECIAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="ENTREGA_TURNO"
          label="ENTREGA_TURNO"
          id="ENTREGA_TURNO"
          ref="ENTREGA_TURNO"
          v-model="model.ENTREGA_TURNO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="UTILIDAD"
          label="UTILIDAD"
          id="UTILIDAD"
          ref="UTILIDAD"
          v-model="model.UTILIDAD"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="DOSIFICADO"
          label="DOSIFICADO"
          id="DOSIFICADO"
          ref="DOSIFICADO"
          v-model="model.DOSIFICADO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="NDOSIS" label="NDOSIS" id="NDOSIS" ref="NDOSIS" v-model="model.NDOSIS"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="CODCUM" label="CODCUM" id="CODCUM" ref="CODCUM" v-model="model.CODCUM"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="ESCALA_RIESGO"
          label="ESCALA_RIESGO"
          id="ESCALA_RIESGO"
          ref="ESCALA_RIESGO"
          v-model="model.ESCALA_RIESGO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IDSERVICIO"
          label="IDSERVICIO"
          id="IDSERVICIO"
          ref="IDSERVICIO"
          v-model="model.IDSERVICIO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PRINCIPAL"
          label="PRINCIPAL"
          id="PRINCIPAL"
          ref="PRINCIPAL"
          v-model="model.PRINCIPAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CLASERIESGO"
          label="CLASERIESGO"
          id="CLASERIESGO"
          ref="CLASERIESGO"
          v-model="model.CLASERIESGO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="TESTABILIDAD"
          label="TESTABILIDAD"
          id="TESTABILIDAD"
          ref="TESTABILIDAD"
          v-model="model.TESTABILIDAD"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="CLASE" label="CLASE" id="CLASE" ref="CLASE" v-model="model.CLASE"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="MLOTEO" label="MLOTEO" id="MLOTEO" ref="MLOTEO" v-model="model.MLOTEO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IDSERVICIOBASE"
          label="IDSERVICIOBASE"
          id="IDSERVICIOBASE"
          ref="IDSERVICIOBASE"
          v-model="model.IDSERVICIOBASE"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CANTIDADBASE"
          label="CANTIDADBASE"
          id="CANTIDADBASE"
          ref="CANTIDADBASE"
          v-model="model.CANTIDADBASE"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IDSERVICIOMEZCLA"
          label="IDSERVICIOMEZCLA"
          id="IDSERVICIOMEZCLA"
          ref="IDSERVICIOMEZCLA"
          v-model="model.IDSERVICIOMEZCLA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CANTIDADMEZCLA"
          label="CANTIDADMEZCLA"
          id="CANTIDADMEZCLA"
          ref="CANTIDADMEZCLA"
          v-model="model.CANTIDADMEZCLA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CODIBASE"
          label="CODIBASE"
          id="CODIBASE"
          ref="CODIBASE"
          v-model="model.CODIBASE"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CENTRAL"
          label="CENTRAL"
          id="CENTRAL"
          ref="CENTRAL"
          v-model="model.CENTRAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IDSERVICIOCOBRO"
          label="IDSERVICIOCOBRO"
          id="IDSERVICIOCOBRO"
          ref="IDSERVICIOCOBRO"
          v-model="model.IDSERVICIOCOBRO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="CTV" label="CTV" id="CTV" ref="CTV" v-model="model.CTV"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="F_VIGENCIAINV"
          label="F_VIGENCIAINV"
          id="F_VIGENCIAINV"
          ref="F_VIGENCIAINV"
          v-model="model.F_VIGENCIAINV"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="REGULADO"
          label="REGULADO"
          id="REGULADO"
          ref="REGULADO"
          v-model="model.REGULADO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PRECOMERCIAL"
          label="PRECOMERCIAL"
          id="PRECOMERCIAL"
          ref="PRECOMERCIAL"
          v-model="model.PRECOMERCIAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="NOPOS" label="NOPOS" id="NOPOS" ref="NOPOS" v-model="model.NOPOS"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CONTADOR"
          label="CONTADOR"
          id="CONTADOR"
          ref="CONTADOR"
          v-model="model.CONTADOR"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="GRUPO" label="GRUPO" id="GRUPO" ref="GRUPO" v-model="model.GRUPO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="LABILIDAD"
          label="LABILIDAD"
          id="LABILIDAD"
          ref="LABILIDAD"
          v-model="model.LABILIDAD"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="INSTITUCIONAL"
          label="INSTITUCIONAL"
          id="INSTITUCIONAL"
          ref="INSTITUCIONAL"
          v-model="model.INSTITUCIONAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="HEMOCLASIFICACION"
          label="HEMOCLASIFICACION"
          id="HEMOCLASIFICACION"
          ref="HEMOCLASIFICACION"
          v-model="model.HEMOCLASIFICACION"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="JUSTIFICACION"
          label="JUSTIFICACION"
          id="JUSTIFICACION"
          ref="JUSTIFICACION"
          v-model="model.JUSTIFICACION"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CODBARRA"
          label="CODBARRA"
          id="CODBARRA"
          ref="CODBARRA"
          v-model="model.CODBARRA"
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <v-btn color="success" @click="guardar">Guardar</v-btn>
        <v-btn @click="$emit('cancelar')">Cancelar</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["fila", "editar"],
  data: () => ({
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
    }
  }),
  mounted() {
    if (this.fila) {
      this.model = this.fila;
    }
    if (this.iclas.length <= 0) {
      this.refrescarIclas();
    }
    if (this.iclahs.length <= 0) {
      this.refrescarIclahs();
    }
    if (this.igrus.length <= 0) {
      this.refrescarIgrus();
    }
    if (this.ipacs.length <= 0) {
      this.refrescarIpacs();
    }
    if (this.iffas.length <= 0) {
      this.refrescarIffas();
    }
  },
  methods: {
    ...mapActions("kinv", ["refrescarIclas", "refrescarIclahs", "refrescarIgrus", "refrescarIpacs", "refrescarIffas"]),
    guardar() {
      this.$emit("guardar", this.model);
    }
  },
  computed: {
    ...mapGetters("kinv", ["iclas", "iclahs", "igrus", "ipacs", "iffas"]),
    iclahFiltradas() {
      var _idclase = this.model.IDCLASE;
      return this.iclahs.filter(function(el) {
        return el.IDCLASE == _idclase;
      });
    },
    igrusFiltrados() {
      var _idsubclase = this.model.IDSUBCLASE;
      return this.igrus.filter(function(el) {
        return el.IDSUBCLASE == _idsubclase;
      });
    }
  },
  watch: {
    "model.IDCLASE"() {
      this.$refs.IDSUBCLASE.focus();
    },
    // "model.IDSUBCLASE"(){
    //   this.$refs.IDGRUPO.focus();
    // }
  }
};
</script>
    