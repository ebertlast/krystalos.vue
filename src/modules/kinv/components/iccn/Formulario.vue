<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-text-field
          name="IDCONCENTRA"
          label="IDCONCENTRA"
          id="IDCONCENTRA"
          ref="IDCONCENTRA"
          v-model="model.IDCONCENTRA"
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


      <v-flex xs3>
        <v-autocomplete
          label="IDITAR"
          :items="itars"
          v-model="model.IDITAR"
          item-value="IDITAR"
          item-text="IDITAR"
          ref="IDITAR"
          no-data-text="Registro no encontrado"
        ></v-autocomplete>
      </v-flex>

      <v-flex xs3>
        <v-autocomplete
          label="IDITAR"
          :items="itars"
          v-model="model.IDITAR"
          item-value="IDITAR"
          item-text="DESCRIPCION"
          ref="IDITAR"
          no-data-text="Registro no encontrado"
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
  props: ["fila", "editar"],
  data: () => ({
    model: {
      IDCONCENTRA: undefined,
      DESCRIPCION: undefined,
      IDITAR: undefined
    },
    itars: [],
    cargando: false
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
  },
  watch: {
    model() {
      if (this.model && this.model.IDITAR && this.model.IDITAR !== "") {
        this.cargando = true;
        this.$http
          .get(`itar/`)
          .then(res => {
            this.itars = res.result.recordset;
          })
          .catch(err => {
            console.log(err);
          })
          .then(() => {
            this.cargando = false;
          });
      }
    }
  }
};
</script>
    