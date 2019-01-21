<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-text-field
          name="IDCUENIIF"
          label="IDCUENIIF"
          id="IDCUENIIF"
          ref="IDCUENIIF"
          v-model="model.IDCUENIIF"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="CUENTA" label="CUENTA" id="CUENTA" ref="CUENTA" v-model="model.CUENTA"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="NOMCUENTA"
          label="NOMCUENTA"
          id="NOMCUENTA"
          ref="NOMCUENTA"
          v-model="model.NOMCUENTA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="TIPO" label="TIPO" id="TIPO" ref="TIPO" v-model="model.TIPO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="NEMONICO"
          label="NEMONICO"
          id="NEMONICO"
          ref="NEMONICO"
          v-model="model.NEMONICO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="CENTRO" label="CENTRO" id="CENTRO" ref="CENTRO" v-model="model.CENTRO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PRODUCTO"
          label="PRODUCTO"
          id="PRODUCTO"
          ref="PRODUCTO"
          v-model="model.PRODUCTO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="REFERENCIA"
          label="REFERENCIA"
          id="REFERENCIA"
          ref="REFERENCIA"
          v-model="model.REFERENCIA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="TERCERO"
          label="TERCERO"
          id="TERCERO"
          ref="TERCERO"
          v-model="model.TERCERO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IMPUESTO"
          label="IMPUESTO"
          id="IMPUESTO"
          ref="IMPUESTO"
          v-model="model.IMPUESTO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="ESTADO" label="ESTADO" id="ESTADO" ref="ESTADO" v-model="model.ESTADO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="NIVEL" label="NIVEL" id="NIVEL" ref="NIVEL" v-model="model.NIVEL"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CUENTA_SUMA"
          label="CUENTA_SUMA"
          id="CUENTA_SUMA"
          ref="CUENTA_SUMA"
          v-model="model.CUENTA_SUMA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="CLASE" label="CLASE" id="CLASE" ref="CLASE" v-model="model.CLASE"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CORRIENTE"
          label="CORRIENTE"
          id="CORRIENTE"
          ref="CORRIENTE"
          v-model="model.CORRIENTE"
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
      IDCUENIIF: undefined,
      CUENTA: undefined,
      NOMCUENTA: undefined,
      TIPO: undefined,
      NEMONICO: undefined,
      CENTRO: undefined,
      PRODUCTO: undefined,
      REFERENCIA: undefined,
      TERCERO: undefined,
      IMPUESTO: undefined,
      ESTADO: undefined,
      NIVEL: undefined,
      CUENTA_SUMA: undefined,
      CLASE: undefined,
      CORRIENTE: undefined
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
    