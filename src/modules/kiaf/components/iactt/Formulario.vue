<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs2>
        <v-text-field
          name="IDTIPOACTIVO"
          label="IDTIPOACTIVO"
          id="IDTIPOACTIVO"
          ref="IDTIPOACTIVO"
          v-model="model.IDTIPOACTIVO"
        ></v-text-field>
      </v-flex>

      <v-flex xs4>
        <v-text-field
          name="DESCRIPCION"
          label="DESCRIPCION"
          id="DESCRIPCION"
          ref="DESCRIPCION"
          v-model="model.DESCRIPCION"
        ></v-text-field>
      </v-flex>

      <v-flex xs2>
        <v-checkbox
          name="ESTADO"
          id="ESTADO"
          ref="ESTADO"
          :label="`${(model.ESTADO) ? 'ACTIVO': 'INACTIVO'}`"
          v-model="model.ESTADO"
        ></v-checkbox>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="CUENTA" label="CUENTA" id="CUENTA" ref="CUENTA" v-model="model.CUENTA"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PIDEMODELO"
          label="PIDEMODELO"
          id="PIDEMODELO"
          ref="PIDEMODELO"
          v-model="model.PIDEMODELO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PIDEMARCA"
          label="PIDEMARCA"
          id="PIDEMARCA"
          ref="PIDEMARCA"
          v-model="model.PIDEMARCA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PIDESERIAL"
          label="PIDESERIAL"
          id="PIDESERIAL"
          ref="PIDESERIAL"
          v-model="model.PIDESERIAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PIDEREFERENCIA"
          label="PIDEREFERENCIA"
          id="PIDEREFERENCIA"
          ref="PIDEREFERENCIA"
          v-model="model.PIDEREFERENCIA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PIDENOESCRITURA"
          label="PIDENOESCRITURA"
          id="PIDENOESCRITURA"
          ref="PIDENOESCRITURA"
          v-model="model.PIDENOESCRITURA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PIDELINDEROS"
          label="PIDELINDEROS"
          id="PIDELINDEROS"
          ref="PIDELINDEROS"
          v-model="model.PIDELINDEROS"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PIDENOPARTES"
          label="PIDENOPARTES"
          id="PIDENOPARTES"
          ref="PIDENOPARTES"
          v-model="model.PIDENOPARTES"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PIDEMATRICULA"
          label="PIDEMATRICULA"
          id="PIDEMATRICULA"
          ref="PIDEMATRICULA"
          v-model="model.PIDEMATRICULA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CODIGOGASTODEP"
          label="CODIGOGASTODEP"
          id="CODIGOGASTODEP"
          ref="CODIGOGASTODEP"
          v-model="model.CODIGOGASTODEP"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="DEPRECIACION"
          label="DEPRECIACION"
          id="DEPRECIACION"
          ref="DEPRECIACION"
          v-model="model.DEPRECIACION"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CUENTAAJINFLACION"
          label="CUENTAAJINFLACION"
          id="CUENTAAJINFLACION"
          ref="CUENTAAJINFLACION"
          v-model="model.CUENTAAJINFLACION"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="VIDAUTIL"
          label="VIDAUTIL"
          id="VIDAUTIL"
          ref="VIDAUTIL"
          v-model="model.VIDAUTIL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="BASEDEPRECIABLE"
          label="BASEDEPRECIABLE"
          id="BASEDEPRECIABLE"
          ref="BASEDEPRECIABLE"
          v-model="model.BASEDEPRECIABLE"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="TIPOSALV"
          label="TIPOSALV"
          id="TIPOSALV"
          ref="TIPOSALV"
          v-model="model.TIPOSALV"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="TIPOVIDA"
          label="TIPOVIDA"
          id="TIPOVIDA"
          ref="TIPOVIDA"
          v-model="model.TIPOVIDA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="CLASE" label="CLASE" id="CLASE" ref="CLASE" v-model="model.CLASE"></v-text-field>
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
      IDTIPOACTIVO: undefined,
      DESCRIPCION: undefined,
      ESTADO: undefined,
      CUENTA: undefined,
      PIDEMODELO: undefined,
      PIDEMARCA: undefined,
      PIDESERIAL: undefined,
      PIDEREFERENCIA: undefined,
      PIDENOESCRITURA: undefined,
      PIDELINDEROS: undefined,
      PIDENOPARTES: undefined,
      PIDEMATRICULA: undefined,
      CODIGOGASTODEP: undefined,
      DEPRECIACION: undefined,
      CUENTAAJINFLACION: undefined,
      VIDAUTIL: undefined,
      BASEDEPRECIABLE: undefined,
      TIPOSALV: undefined,
      TIPOVIDA: undefined,
      CLASE: undefined
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
    