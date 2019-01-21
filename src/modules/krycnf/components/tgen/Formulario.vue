<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-text-field name="TABLA" label="TABLA" id="TABLA" ref="TABLA" v-model="model.TABLA"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="CAMPO" label="CAMPO" id="CAMPO" ref="CAMPO" v-model="model.CAMPO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="CODIGO" label="CODIGO" id="CODIGO" ref="CODIGO" v-model="model.CODIGO"></v-text-field>
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

      <v-flex xs3>
        <v-text-field name="VALOR1" label="VALOR1" id="VALOR1" ref="VALOR1" v-model="model.VALOR1"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="DATO1" label="DATO1" id="DATO1" ref="DATO1" v-model="model.DATO1"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="DFECHA" label="DFECHA" id="DFECHA" ref="DFECHA" v-model="model.DFECHA"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="OPCIONESLIBRES"
          label="OPCIONESLIBRES"
          id="OPCIONESLIBRES"
          ref="OPCIONESLIBRES"
          v-model="model.OPCIONESLIBRES"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="VALORINI"
          label="VALORINI"
          id="VALORINI"
          ref="VALORINI"
          v-model="model.VALORINI"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="VALORFIN"
          label="VALORFIN"
          id="VALORFIN"
          ref="VALORFIN"
          v-model="model.VALORFIN"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="VALOR2" label="VALOR2" id="VALOR2" ref="VALOR2" v-model="model.VALOR2"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="DATO2" label="DATO2" id="DATO2" ref="DATO2" v-model="model.DATO2"></v-text-field>
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
    }
  }),
  mounted() {
    if (this.fila) {
      this.model = this.fila;
    }
  },
  methods: {
    guardar() {
      this.$emit("guardar", this.model);
    }
  }
};
</script>
    