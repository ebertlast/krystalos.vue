<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-text-field name="ZONA" label="ZONA" id="ZONA" ref="ZONA" v-model="model.ZONA"></v-text-field>
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
        <v-text-field name="CIUDAD" label="CIUDAD" id="CIUDAD" ref="CIUDAD" v-model="model.CIUDAD"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="TIPOZONA"
          label="TIPOZONA"
          id="TIPOZONA"
          ref="TIPOZONA"
          v-model="model.TIPOZONA"
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
      ZONA: undefined,
      DESCRIPCION: undefined,
      CIUDAD: undefined,
      TIPOZONA: undefined
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
    