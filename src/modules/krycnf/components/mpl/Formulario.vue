<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-text-field
          label="CLASEPLANTILLA"
          name="CLASEPLANTILLA"
          id="CLASEPLANTILLA"
          ref="CLASEPLANTILLA"
          v-model="model.CLASEPLANTILLA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="DESCPLANTILLA"
          name="DESCPLANTILLA"
          id="DESCPLANTILLA"
          ref="DESCPLANTILLA"
          v-model="model.DESCPLANTILLA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="COMPANIAALTERNA"
          name="COMPANIAALTERNA"
          id="COMPANIAALTERNA"
          ref="COMPANIAALTERNA"
          v-model="model.COMPANIAALTERNA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="NIVELFUNCIONARIO"
          name="NIVELFUNCIONARIO"
          id="NIVELFUNCIONARIO"
          ref="NIVELFUNCIONARIO"
          v-model="model.NIVELFUNCIONARIO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field label="UNICA" name="UNICA" id="UNICA" ref="UNICA" v-model="model.UNICA"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field label="ESTADO" name="ESTADO" id="ESTADO" ref="ESTADO" v-model="model.ESTADO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field label="PIDEDX" name="PIDEDX" id="PIDEDX" ref="PIDEDX" v-model="model.PIDEDX"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field label="PIDESV" name="PIDESV" id="PIDESV" ref="PIDESV" v-model="model.PIDESV"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field label="DAALTA" name="DAALTA" id="DAALTA" ref="DAALTA" v-model="model.DAALTA"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="IMPDATOSEGRESO"
          name="IMPDATOSEGRESO"
          id="IMPDATOSEGRESO"
          ref="IMPDATOSEGRESO"
          v-model="model.IMPDATOSEGRESO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field label="SEXO" name="SEXO" id="SEXO" ref="SEXO" v-model="model.SEXO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field label="MEDAD" name="MEDAD" id="MEDAD" ref="MEDAD" v-model="model.MEDAD"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="EDADINI"
          name="EDADINI"
          id="EDADINI"
          ref="EDADINI"
          v-model="model.EDADINI"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="EDADFIN"
          name="EDADFIN"
          id="EDADFIN"
          ref="EDADFIN"
          v-model="model.EDADFIN"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field label="CLASE" name="CLASE" id="CLASE" ref="CLASE" v-model="model.CLASE"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field label="AMBITO" name="AMBITO" id="AMBITO" ref="AMBITO" v-model="model.AMBITO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="PIDEDXR"
          name="PIDEDXR"
          id="PIDEDXR"
          ref="PIDEDXR"
          v-model="model.PIDEDXR"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="TEXCLUYENTES"
          name="TEXCLUYENTES"
          id="TEXCLUYENTES"
          ref="TEXCLUYENTES"
          v-model="model.TEXCLUYENTES"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="GRAFICA"
          name="GRAFICA"
          id="GRAFICA"
          ref="GRAFICA"
          v-model="model.GRAFICA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="TITULOX"
          name="TITULOX"
          id="TITULOX"
          ref="TITULOX"
          v-model="model.TITULOX"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="TITULOY"
          name="TITULOY"
          id="TITULOY"
          ref="TITULOY"
          v-model="model.TITULOY"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="ENEPICRISIS"
          name="ENEPICRISIS"
          id="ENEPICRISIS"
          ref="ENEPICRISIS"
          v-model="model.ENEPICRISIS"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="OM_ENEPICRISIS"
          name="OM_ENEPICRISIS"
          id="OM_ENEPICRISIS"
          ref="OM_ENEPICRISIS"
          v-model="model.OM_ENEPICRISIS"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="TIENEOM"
          name="TIENEOM"
          id="TIENEOM"
          ref="TIENEOM"
          v-model="model.TIENEOM"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="TRAESERVICIOS"
          name="TRAESERVICIOS"
          id="TRAESERVICIOS"
          ref="TRAESERVICIOS"
          v-model="model.TRAESERVICIOS"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field label="TIPOSV" name="TIPOSV" id="TIPOSV" ref="TIPOSV" v-model="model.TIPOSV"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="PROGRESIVA"
          name="PROGRESIVA"
          id="PROGRESIVA"
          ref="PROGRESIVA"
          v-model="model.PROGRESIVA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field label="INGUCI" name="INGUCI" id="INGUCI" ref="INGUCI" v-model="model.INGUCI"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field label="UCI" name="UCI" id="UCI" ref="UCI" v-model="model.UCI"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="RESTRINGEVISTA"
          name="RESTRINGEVISTA"
          id="RESTRINGEVISTA"
          ref="RESTRINGEVISTA"
          v-model="model.RESTRINGEVISTA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="IDEMEDICA"
          name="IDEMEDICA"
          id="IDEMEDICA"
          ref="IDEMEDICA"
          v-model="model.IDEMEDICA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="TIPOESP"
          name="TIPOESP"
          id="TIPOESP"
          ref="TIPOESP"
          v-model="model.TIPOESP"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field label="M4505" name="M4505" id="M4505" ref="M4505" v-model="model.M4505"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="NOCOPIAOM"
          name="NOCOPIAOM"
          id="NOCOPIAOM"
          ref="NOCOPIAOM"
          v-model="model.NOCOPIAOM"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="DIASREST"
          name="DIASREST"
          id="DIASREST"
          ref="DIASREST"
          v-model="model.DIASREST"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field label="MAREA" name="MAREA" id="MAREA" ref="MAREA" v-model="model.MAREA"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="IMPRIMEOM"
          name="IMPRIMEOM"
          id="IMPRIMEOM"
          ref="IMPRIMEOM"
          v-model="model.IMPRIMEOM"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field label="HURG" name="HURG" id="HURG" ref="HURG" v-model="model.HURG"></v-text-field>
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
      CLASEPLANTILLA: undefined,
      DESCPLANTILLA: undefined,
      COMPANIAALTERNA: undefined,
      NIVELFUNCIONARIO: undefined,
      UNICA: undefined,
      ESTADO: undefined,
      PIDEDX: undefined,
      PIDESV: undefined,
      DAALTA: undefined,
      IMPDATOSEGRESO: undefined,
      SEXO: undefined,
      MEDAD: undefined,
      EDADINI: undefined,
      EDADFIN: undefined,
      CLASE: undefined,
      AMBITO: undefined,
      PIDEDXR: undefined,
      TEXCLUYENTES: undefined,
      GRAFICA: undefined,
      TITULOX: undefined,
      TITULOY: undefined,
      ENEPICRISIS: undefined,
      OM_ENEPICRISIS: undefined,
      TIENEOM: undefined,
      TRAESERVICIOS: undefined,
      TIPOSV: undefined,
      PROGRESIVA: undefined,
      INGUCI: undefined,
      UCI: undefined,
      RESTRINGEVISTA: undefined,
      IDEMEDICA: undefined,
      TIPOESP: undefined,
      M4505: undefined,
      NOCOPIAOM: undefined,
      DIASREST: undefined,
      MAREA: undefined,
      IMPRIMEOM: undefined,
      HURG: undefined
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
        CLASEPLANTILLA: undefined,
        DESCPLANTILLA: undefined,
        COMPANIAALTERNA: undefined,
        NIVELFUNCIONARIO: undefined,
        UNICA: undefined,
        ESTADO: undefined,
        PIDEDX: undefined,
        PIDESV: undefined,
        DAALTA: undefined,
        IMPDATOSEGRESO: undefined,
        SEXO: undefined,
        MEDAD: undefined,
        EDADINI: undefined,
        EDADFIN: undefined,
        CLASE: undefined,
        AMBITO: undefined,
        PIDEDXR: undefined,
        TEXCLUYENTES: undefined,
        GRAFICA: undefined,
        TITULOX: undefined,
        TITULOY: undefined,
        ENEPICRISIS: undefined,
        OM_ENEPICRISIS: undefined,
        TIENEOM: undefined,
        TRAESERVICIOS: undefined,
        TIPOSV: undefined,
        PROGRESIVA: undefined,
        INGUCI: undefined,
        UCI: undefined,
        RESTRINGEVISTA: undefined,
        IDEMEDICA: undefined,
        TIPOESP: undefined,
        M4505: undefined,
        NOCOPIAOM: undefined,
        DIASREST: undefined,
        MAREA: undefined,
        IMPRIMEOM: undefined,
        HURG: undefined
      };
      return model;
    }
  }
};
</script>
    