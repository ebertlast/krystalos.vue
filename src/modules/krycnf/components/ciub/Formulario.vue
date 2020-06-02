<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-text-field name="CIUDAD" label="CIUDAD" id="CIUDAD" ref="CIUDAD" v-model="model.CIUDAD"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IDBARRIO"
          label="IDBARRIO"
          id="IDBARRIO"
          ref="IDBARRIO"
          v-model="model.IDBARRIO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="NOMBRE" label="NOMBRE" id="NOMBRE" ref="NOMBRE" v-model="model.NOMBRE"></v-text-field>
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
      CIUDAD: undefined,
      IDBARRIO: undefined,
      NOMBRE: undefined
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
    