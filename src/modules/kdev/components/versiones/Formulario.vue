<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-text-field label="ID" name="ID" id="ID" ref="ID" v-model="model.ID"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="PRODUCTO"
          name="PRODUCTO"
          id="PRODUCTO"
          ref="PRODUCTO"
          v-model="model.PRODUCTO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field label="FECHA" name="FECHA" id="FECHA" ref="FECHA" v-model="model.FECHA"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field label="ESTADO" name="ESTADO" id="ESTADO" ref="ESTADO" v-model="model.ESTADO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field label="IDANT" name="IDANT" id="IDANT" ref="IDANT" v-model="model.IDANT"></v-text-field>
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
      ID: undefined,
      PRODUCTO: undefined,
      FECHA: undefined,
      ESTADO: undefined,
      IDANT: undefined
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
      this.model = this.model_limpio;
    }
  },
  computed: {
    model_limpio() {
      var model = {
        ID: undefined,
        PRODUCTO: undefined,
        FECHA: undefined,
        ESTADO: undefined,
        IDANT: undefined
      };
      return model;
    }
  }
};
</script>
    