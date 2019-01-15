<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-text-field
          name="IDARCHIVO"
          label="IDARCHIVO"
          id="IDARCHIVO"
          ref="IDARCHIVO"
          v-model="model.IDARCHIVO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="EMAIL" label="EMAIL" id="EMAIL" ref="EMAIL" v-model="model.EMAIL"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="ARCHIVO"
          label="ARCHIVO"
          id="ARCHIVO"
          ref="ARCHIVO"
          v-model="model.ARCHIVO"
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
      IDARCHIVO: undefined,
      EMAIL: undefined,
      ARCHIVO: undefined
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
    