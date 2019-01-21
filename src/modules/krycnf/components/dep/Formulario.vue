<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-text-field name="DPTO" label="DPTO" id="DPTO" ref="DPTO" v-model="model.DPTO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="NOMBRE" label="NOMBRE" id="NOMBRE" ref="NOMBRE" v-model="model.NOMBRE"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="PAIS" label="PAIS" id="PAIS" ref="PAIS" v-model="model.PAIS"></v-text-field>
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
      DPTO: undefined,
      NOMBRE: undefined,
      PAIS: undefined
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
    