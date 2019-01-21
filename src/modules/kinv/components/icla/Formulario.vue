<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-text-field
          name="IDCLASE"
          label="IDCLASE"
          id="IDCLASE"
          ref="IDCLASE"
          v-model="model.IDCLASE"
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
  props: ["fila"],
  data: () => ({
    model: {
      IDCLASE: undefined,
      DESCRIPCION: undefined,
      IDITAR: undefined
    }
  }),
  mounted() {
    if (this.fila) {
      this.model = this.fila;
    }
    if (this.itars.length <= 0) {
      this.refrescarItars();
    }
  },
  methods: {
    ...mapActions("kinv", [
      "refrescarItars"
    ]),
    guardar() {
      this.$emit("guardar", this.model);
    }
  },
  computed: {
    ...mapGetters("kinv", [
      "itars"
    ]),
  },
};
</script>
    