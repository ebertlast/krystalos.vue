<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-text-field
          name="IDGENERICO"
          label="IDGENERICO"
          id="IDGENERICO"
          ref="IDGENERICO"
          v-model="model.IDGENERICO"
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
        <v-text-field
          name="IDCLASE"
          label="IDCLASE"
          id="IDCLASE"
          ref="IDCLASE"
          v-model="model.IDCLASE"
        ></v-text-field>
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

      <v-flex xs3>
        <v-text-field
          name="IDGRUPO"
          label="IDGRUPO"
          id="IDGRUPO"
          ref="IDGRUPO"
          v-model="model.IDGRUPO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IDPRINACTIVO"
          label="IDPRINACTIVO"
          id="IDPRINACTIVO"
          ref="IDPRINACTIVO"
          v-model="model.IDPRINACTIVO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IDTGENERICO"
          label="IDTGENERICO"
          id="IDTGENERICO"
          ref="IDTGENERICO"
          v-model="model.IDTGENERICO"
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
      IDGENERICO: undefined,
      DESCRIPCION: undefined,
      IDCLASE: undefined,
      IDSUBCLASE: undefined,
      IDGRUPO: undefined,
      IDPRINACTIVO: undefined,
      IDTGENERICO: undefined
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
    