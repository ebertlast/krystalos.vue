<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-text-field name="IDITAR" label="IDITAR" id="IDITAR" ref="IDITAR" v-model="model.IDITAR"></v-text-field>
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
        <v-text-field name="MCLASE" label="MCLASE" id="MCLASE" ref="MCLASE" v-model="model.MCLASE"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="MPAC" label="MPAC" id="MPAC" ref="MPAC" v-model="model.MPAC"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="MFFA" label="MFFA" id="MFFA" ref="MFFA" v-model="model.MFFA"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="MCCN" label="MCCN" id="MCCN" ref="MCCN" v-model="model.MCCN"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="MUNI" label="MUNI" id="MUNI" ref="MUNI" v-model="model.MUNI"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IDGRUPOIMP"
          label="IDGRUPOIMP"
          id="IDGRUPOIMP"
          ref="IDGRUPOIMP"
          v-model="model.IDGRUPOIMP"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="MFECHAVENCIMIENTO"
          label="MFECHAVENCIMIENTO"
          id="MFECHAVENCIMIENTO"
          ref="MFECHAVENCIMIENTO"
          v-model="model.MFECHAVENCIMIENTO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="CUENTA" label="CUENTA" id="CUENTA" ref="CUENTA" v-model="model.CUENTA"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PINDIVIDUAL"
          label="PINDIVIDUAL"
          id="PINDIVIDUAL"
          ref="PINDIVIDUAL"
          v-model="model.PINDIVIDUAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="DECONSUMO"
          label="DECONSUMO"
          id="DECONSUMO"
          ref="DECONSUMO"
          v-model="model.DECONSUMO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PREFIJO"
          label="PREFIJO"
          id="PREFIJO"
          ref="PREFIJO"
          v-model="model.PREFIJO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="MLOTEO" label="MLOTEO" id="MLOTEO" ref="MLOTEO" v-model="model.MLOTEO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="ESACTIVO"
          label="ESACTIVO"
          id="ESACTIVO"
          ref="ESACTIVO"
          v-model="model.ESACTIVO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="MSTOCK" label="MSTOCK" id="MSTOCK" ref="MSTOCK" v-model="model.MSTOCK"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="MPRINCIPAL"
          label="MPRINCIPAL"
          id="MPRINCIPAL"
          ref="MPRINCIPAL"
          v-model="model.MPRINCIPAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="MCNS" label="MCNS" id="MCNS" ref="MCNS" v-model="model.MCNS"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="PRECNS" label="PRECNS" id="PRECNS" ref="PRECNS" v-model="model.PRECNS"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="MGRUPO" label="MGRUPO" id="MGRUPO" ref="MGRUPO" v-model="model.MGRUPO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="MLABILIDAD"
          label="MLABILIDAD"
          id="MLABILIDAD"
          ref="MLABILIDAD"
          v-model="model.MLABILIDAD"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="MRIESGO"
          label="MRIESGO"
          id="MRIESGO"
          ref="MRIESGO"
          v-model="model.MRIESGO"
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
      IDITAR: undefined,
      DESCRIPCION: undefined,
      MCLASE: undefined,
      MPAC: undefined,
      MFFA: undefined,
      MCCN: undefined,
      MUNI: undefined,
      IDGRUPOIMP: undefined,
      MFECHAVENCIMIENTO: undefined,
      CUENTA: undefined,
      PINDIVIDUAL: undefined,
      DECONSUMO: undefined,
      PREFIJO: undefined,
      MLOTEO: undefined,
      ESACTIVO: undefined,
      MSTOCK: undefined,
      MPRINCIPAL: undefined,
      MCNS: undefined,
      PRECNS: undefined,
      MGRUPO: undefined,
      MLABILIDAD: undefined,
      MRIESGO: undefined
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
    