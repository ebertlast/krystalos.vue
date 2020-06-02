<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-text-field name="CIUDAD" label="CIUDAD" id="CIUDAD" ref="CIUDAD" v-model="model.CIUDAD"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="DPTO" label="DPTO" id="DPTO" ref="DPTO" v-model="model.DPTO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="NOMBRE" label="NOMBRE" id="NOMBRE" ref="NOMBRE" v-model="model.NOMBRE"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="DESCENTRAL"
          label="DESCENTRAL"
          id="DESCENTRAL"
          ref="DESCENTRAL"
          v-model="model.DESCENTRAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="RETICA" label="RETICA" id="RETICA" ref="RETICA" v-model="model.RETICA"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="FACTORICA"
          label="FACTORICA"
          id="FACTORICA"
          ref="FACTORICA"
          v-model="model.FACTORICA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="VLRGESTION"
          label="VLRGESTION"
          id="VLRGESTION"
          ref="VLRGESTION"
          v-model="model.VLRGESTION"
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
      CIUDAD: undefined,
      DPTO: undefined,
      NOMBRE: undefined,
      DESCENTRAL: undefined,
      RETICA: undefined,
      FACTORICA: undefined,
      VLRGESTION: undefined
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
    