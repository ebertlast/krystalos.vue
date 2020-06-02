<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-autocomplete
          :items="iclas"
          item-value="IDCLASE"
          item-text="IDCLASE"
          label="Clase de Medicamento"
          ref="IDCLASE"
          v-model="model.IDCLASE"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs9>
        <v-autocomplete
          :items="iclas"
          item-value="IDCLASE"
          item-text="DESCRIPCION"
          label="Clase de Medicamento"
          v-model="model.IDCLASE"
        ></v-autocomplete>
      </v-flex>

      <v-flex xs3>
        <v-autocomplete
          :items="subclasesFiltradas"
          item-value="IDSUBCLASE"
          item-text="IDSUBCLASE"
          label="Subclase de Medicamento"
          ref="IDSUBCLASE"
          v-model="model.IDSUBCLASE"
        ></v-autocomplete>
      </v-flex>

      <v-flex xs9>
        <v-autocomplete
          :items="subclasesFiltradas"
          item-value="IDSUBCLASE"
          item-text="DESCRIPCION"
          label="Subclase de Medicamento"
          ref="IDSUBCLASE"
          v-model="model.IDSUBCLASE"
        ></v-autocomplete>
      </v-flex>

      <v-flex xs3>
        <v-autocomplete
          :items="gruposFiltrados"
          item-value="IDGRUPO"
          item-text="IDGRUPO"
          label="Subclase de Medicamento"
          ref="IDGRUPO"
          v-model="model.IDGRUPO"
        ></v-autocomplete>
      </v-flex>

      <v-flex xs9>
        <v-autocomplete
          :items="gruposFiltrados"
          item-value="IDGRUPO"
          item-text="DESCRIPCION"
          label="Subclase de Medicamento"
          ref="IDGRUPO"
          v-model="model.IDGRUPO"
        ></v-autocomplete>
      </v-flex>

      <v-flex xs3>
        <v-autocomplete
          :items="itars"
          item-value="IDITAR"
          item-text="IDITAR"
          label="Tipo de Artículo"
          ref="IDITAR"
          v-model="model.IDITAR"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs9>
        <v-autocomplete
          :items="itars"
          item-value="IDITAR"
          item-text="DESCRIPCION"
          label="Tipo de Artículo"
          v-model="model.IDITAR"
        ></v-autocomplete>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IDPRINACTIVO"
          label="IDPRINACTIVO"
          id="IDPRINACTIVO"
          ref="IDPRINACTIVO"
          v-model="model.IDPRINACTIVO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="DESCRIPCION"
          label="DESCRIPCION"
          id="DESCRIPCION"
          ref="DESCRIPCION"
          v-model="model.DESCRIPCION"
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
      IDPRINACTIVO: undefined,
      DESCRIPCION: undefined,
      IDITAR: undefined
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
    if (this.itars.length <= 0) {
      this.refrescarItars();
    }
  },
  methods: {
    ...mapActions("kinv", [
      "refrescarIclas",
      "refrescarIclahs",
      "refrescarIgrus",
      "refrescarItars"
    ]),
    guardar() {
      this.$emit("guardar", this.model);
    },
    construirCodigo() {
      this.model.IDPRINACTIVO =
        (this.model.IDCLASE ? this.model.IDCLASE : "") +
        (this.model.IDSUBCLASE ? this.model.IDSUBCLASE : "") +
        (this.model.IDGRUPO ? this.model.IDGRUPO : "");
    }
  },
  computed: {
    ...mapGetters("kinv", ["iclas", "iclahs", "igrus", "itars"]),
    subclasesFiltradas() {
      var self = this;
      return this.iclahs.filter(function(el) {
        return el.IDCLASE == self.model.IDCLASE;
      });
    },
    gruposFiltrados() {
      var self = this;
      return this.igrus.filter(function(el) {
        return el.IDCLASE == self.model.IDCLASE;
      });
    }
  },
  watch: {
    "model.IDCLASE"() {
      this.construirCodigo();
      // this.model.IDSUBCLASE = "";
      // this.model.IDGRUPO = "";
    },
    "model.IDSUBCLASE"() {
      this.construirCodigo();
      // this.model.IDGRUPO = "";
    },
    "model.IDGRUPO"() {
      this.construirCodigo();
    }
  }
};
</script>
    