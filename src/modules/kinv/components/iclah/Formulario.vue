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
        <v-text-field
          name="IDSUBCLASE"
          label="IDSUBCLASE"
          id="IDSUBCLASE"
          ref="IDSUBCLASE"
          v-model="model.IDSUBCLASE"
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
      IDCLASE: undefined,
      IDSUBCLASE: undefined,
      DESCRIPCION: undefined
    }
  }),
  mounted() {
    if (this.fila) {
      this.model = this.fila;
    }
    if (this.iclas.length <= 0) {
      this.refrescarIclas();
    }
  },
  methods: {
    ...mapActions("kinv", [
      "refrescarIclas",
    ]),
    guardar() {
      this.$emit("guardar", this.model);
    }
  },
  computed: {
    ...mapGetters("kinv", [
      "iclas",
    ]),
  },
};
</script>