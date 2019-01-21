<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      
      <v-flex xs3>
        <v-text-field
          name="ID"
          label="ID"
          id="ID"
          ref="ID"
          v-model="model.ID"
        ></v-text-field>
      </v-flex>
      
      <v-flex xs3>
        <v-text-field
          name="EMAIL"
          label="EMAIL"
          id="EMAIL"
          ref="EMAIL"
          v-model="model.EMAIL"
        ></v-text-field>
      </v-flex>
      
      <v-flex xs3>
        <v-text-field
          name="AUTORIZACION"
          label="AUTORIZACION"
          id="AUTORIZACION"
          ref="AUTORIZACION"
          v-model="model.AUTORIZACION"
        ></v-text-field>
      </v-flex>
      
      <v-flex xs3>
        <v-text-field
          name="ORDENMEDICA"
          label="ORDENMEDICA"
          id="ORDENMEDICA"
          ref="ORDENMEDICA"
          v-model="model.ORDENMEDICA"
        ></v-text-field>
      </v-flex>
      
      <v-flex xs3>
        <v-text-field
          name="NUMEROCONTACTO"
          label="NUMEROCONTACTO"
          id="NUMEROCONTACTO"
          ref="NUMEROCONTACTO"
          v-model="model.NUMEROCONTACTO"
        ></v-text-field>
      </v-flex>
      
      <v-flex xs3>
        <v-text-field
          name="DIRECCION"
          label="DIRECCION"
          id="DIRECCION"
          ref="DIRECCION"
          v-model="model.DIRECCION"
        ></v-text-field>
      </v-flex>
      
      <v-flex xs3>
        <v-text-field
          name="PROCESADO"
          label="PROCESADO"
          id="PROCESADO"
          ref="PROCESADO"
          v-model="model.PROCESADO"
        ></v-text-field>
      </v-flex>
      
      <v-flex xs3>
        <v-text-field
          name="ANULADO"
          label="ANULADO"
          id="ANULADO"
          ref="ANULADO"
          v-model="model.ANULADO"
        ></v-text-field>
      </v-flex>
      
      <v-flex xs3>
        <v-text-field
          name="OBSERVACION"
          label="OBSERVACION"
          id="OBSERVACION"
          ref="OBSERVACION"
          v-model="model.OBSERVACION"
        ></v-text-field>
      </v-flex>
      
      <v-flex xs3>
        <v-text-field
          name="FECHA"
          label="FECHA"
          id="FECHA"
          ref="FECHA"
          v-model="model.FECHA"
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
			ID: undefined,
			EMAIL: undefined,
			AUTORIZACION: undefined,
			ORDENMEDICA: undefined,
			NUMEROCONTACTO: undefined,
			DIRECCION: undefined,
			PROCESADO: undefined,
			ANULADO: undefined,
			OBSERVACION: undefined,
			FECHA: undefined
		}
  }),
  mounted(){
    if (this.fila) {
      this.model = this.fila;
    }
  },
  methods: {
    guardar() {
      this.$emit("guardar", this.model);
    }
  }
}
</script>
    