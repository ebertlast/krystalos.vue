<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-autocomplete
          label="Tipo de Identificación"
          :items="tipoDocumentos"
          v-model="model.TIPO_ID"
          item-value="CODIGO"
          item-text="DESCRIPCION"
          :disabled="editar"
          ref="TIPO_ID"
          no-data-text="Registro no encontrado"
        ></v-autocomplete>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IDMEDICO"
          label="IDMEDICO"
          id="IDMEDICO"
          ref="IDMEDICO"
          :disabled="editar"
          v-model="model.IDMEDICO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-autocomplete
          label="ESPECIALIDAD MÉDICA"
          :items="mes"
          v-model="model.IDEMEDICA"
          item-value="IDEMEDICA"
          item-text="DESCRIPCION"
          no-data-text="Registro no encontrado"
        ></v-autocomplete>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="ESTADO" label="ESTADO" id="ESTADO" ref="ESTADO" v-model="model.ESTADO"></v-text-field>
      </v-flex>


      <v-flex xs3>
        <v-text-field
          name="PNOMBRE"
          label="PNOMBRE"
          id="PNOMBRE"
          ref="PNOMBRE"
          v-model="model.PNOMBRE"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="SNOMBRE"
          label="SNOMBRE"
          id="SNOMBRE"
          ref="SNOMBRE"
          v-model="model.SNOMBRE"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PAPELLIDO"
          label="PAPELLIDO"
          id="PAPELLIDO"
          ref="PAPELLIDO"
          v-model="model.PAPELLIDO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="SAPELLIDO"
          label="SAPELLIDO"
          id="SAPELLIDO"
          ref="SAPELLIDO"
          v-model="model.SAPELLIDO"
        ></v-text-field>
      </v-flex>
      
      <v-flex xs3>
        <v-text-field
          name="CELULAR"
          label="CELULAR"
          id="CELULAR"
          ref="CELULAR"
          v-model="model.CELULAR"
          mask="phone"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="TELEFONO"
          label="TELEFONO"
          id="TELEFONO"
          ref="TELEFONO"
          v-model="model.TELEFONO"
          mask="phone"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="EMAIL"
          label="EMAIL"
          id="EMAIL"
          ref="EMAIL"
          v-model="model.EMAIL"
          type="email"
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
      IDMEDICO: undefined,
      TIPO_USUARIO: "Medico",
      TIPOVINCULACION: "Tercero",
      NOMBRE: undefined,
      IDEMEDICA: undefined,
      NO_REGISTRO: undefined,
      IDMODELO: undefined,
      DIRECCION: undefined,
      TELEFONOS: undefined,
      BEEPER: undefined,
      CELULAR: undefined,
      CIUDAD: undefined,
      AUTORIZACION: undefined,
      SEL_PROVEED: undefined,
      MANEJAMSEDES: undefined,
      NO_CONSULTAS: undefined,
      IDTERCERO: undefined,
      EMPLEADO: undefined,
      TOPEPACIENTES: undefined,
      PACIENTESASIG: undefined,
      ESTADO: "Activo",
      IDMODELOPRE: undefined,
      LUGARATENCION: undefined,
      IDSEDEATENCION: undefined,
      DIR_OTRA: undefined,
      TEL_OTRA: undefined,
      CIU_OTRA: undefined,
      TIPO_ID: undefined,
      PNOMBRE: undefined,
      SNOMBRE: undefined,
      PAPELLIDO: undefined,
      SAPELLIDO: undefined,
      IDFIRMA: undefined,
      CLASIFICACION: undefined,
      NUMACCIONES: undefined,
      NUMMSDS: undefined,
      CODCOLEGIO: undefined,
      TELEFONO: undefined,
      EMAIL: undefined,
      ACCIONES: undefined,
      MINUTOSCAMBIO: 60
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
    ...mapGetters("krycnf", ["mes", "tipoDocumentos"]),
    model_limpio() {
      return {
        IDMEDICO: undefined,
        TIPO_USUARIO: "Medico",
        TIPOVINCULACION: "Tercero",
        NOMBRE: undefined,
        IDEMEDICA: undefined,
        NO_REGISTRO: undefined,
        IDMODELO: undefined,
        DIRECCION: undefined,
        TELEFONOS: undefined,
        BEEPER: undefined,
        CELULAR: undefined,
        CIUDAD: undefined,
        AUTORIZACION: undefined,
        SEL_PROVEED: undefined,
        MANEJAMSEDES: undefined,
        NO_CONSULTAS: undefined,
        IDTERCERO: undefined,
        EMPLEADO: undefined,
        TOPEPACIENTES: undefined,
        PACIENTESASIG: undefined,
        ESTADO: "Activo",
        IDMODELOPRE: undefined,
        LUGARATENCION: undefined,
        IDSEDEATENCION: undefined,
        DIR_OTRA: undefined,
        TEL_OTRA: undefined,
        CIU_OTRA: undefined,
        TIPO_ID: undefined,
        PNOMBRE: undefined,
        SNOMBRE: undefined,
        PAPELLIDO: undefined,
        SAPELLIDO: undefined,
        IDFIRMA: undefined,
        CLASIFICACION: undefined,
        NUMACCIONES: undefined,
        NUMMSDS: undefined,
        CODCOLEGIO: undefined,
        TELEFONO: undefined,
        EMAIL: undefined,
        ACCIONES: undefined,
        MINUTOSCAMBIO: 60
      };
    }
  }
};
</script>
    