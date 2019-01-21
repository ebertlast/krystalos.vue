<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-text-field
          name="IDTERCERO"
          label="IDTERCERO"
          id="IDTERCERO"
          ref="IDTERCERO"
          v-model="model.IDTERCERO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="RAZONSOCIAL"
          label="RAZONSOCIAL"
          id="RAZONSOCIAL"
          ref="RAZONSOCIAL"
          v-model="model.RAZONSOCIAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="NIT" label="NIT" id="NIT" ref="NIT" v-model="model.NIT"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="DV" label="DV" id="DV" ref="DV" v-model="model.DV"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="TIPO_ID"
          label="TIPO_ID"
          id="TIPO_ID"
          ref="TIPO_ID"
          v-model="model.TIPO_ID"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IDALTERNA1"
          label="IDALTERNA1"
          id="IDALTERNA1"
          ref="IDALTERNA1"
          v-model="model.IDALTERNA1"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IDALTERNA2"
          label="IDALTERNA2"
          id="IDALTERNA2"
          ref="IDALTERNA2"
          v-model="model.IDALTERNA2"
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
          name="NATJURIDICA"
          label="NATJURIDICA"
          id="NATJURIDICA"
          ref="NATJURIDICA"
          v-model="model.NATJURIDICA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="CIUDAD" label="CIUDAD" id="CIUDAD" ref="CIUDAD" v-model="model.CIUDAD"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="TELEFONOS"
          label="TELEFONOS"
          id="TELEFONOS"
          ref="TELEFONOS"
          v-model="model.TELEFONOS"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="FAX" label="FAX" id="FAX" ref="FAX" v-model="model.FAX"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="APA" label="APA" id="APA" ref="APA" v-model="model.APA"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="F_INSCRIPTO"
          label="F_INSCRIPTO"
          id="F_INSCRIPTO"
          ref="F_INSCRIPTO"
          v-model="model.F_INSCRIPTO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="F_RENOVACION"
          label="F_RENOVACION"
          id="F_RENOVACION"
          ref="F_RENOVACION"
          v-model="model.F_RENOVACION"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="F_VENCIMIENT"
          label="F_VENCIMIENT"
          id="F_VENCIMIENT"
          ref="F_VENCIMIENT"
          v-model="model.F_VENCIMIENT"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="R_LEGAL"
          label="R_LEGAL"
          id="R_LEGAL"
          ref="R_LEGAL"
          v-model="model.R_LEGAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="TIPO_ID_R"
          label="TIPO_ID_R"
          id="TIPO_ID_R"
          ref="TIPO_ID_R"
          v-model="model.TIPO_ID_R"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="NIT_R" label="NIT_R" id="NIT_R" ref="NIT_R" v-model="model.NIT_R"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="ESTADO" label="ESTADO" id="ESTADO" ref="ESTADO" v-model="model.ESTADO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="REQAUTORIZA"
          label="REQAUTORIZA"
          id="REQAUTORIZA"
          ref="REQAUTORIZA"
          v-model="model.REQAUTORIZA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="CUENTA" label="CUENTA" id="CUENTA" ref="CUENTA" v-model="model.CUENTA"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="ZONA" label="ZONA" id="ZONA" ref="ZONA" v-model="model.ZONA"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="CIA" label="CIA" id="CIA" ref="CIA" v-model="model.CIA"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="ACT_ECONOMICA"
          label="ACT_ECONOMICA"
          id="ACT_ECONOMICA"
          ref="ACT_ECONOMICA"
          v-model="model.ACT_ECONOMICA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="ENVIODICAJA"
          label="ENVIODICAJA"
          id="ENVIODICAJA"
          ref="ENVIODICAJA"
          v-model="model.ENVIODICAJA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="MODOCOPAGO"
          label="MODOCOPAGO"
          id="MODOCOPAGO"
          ref="MODOCOPAGO"
          v-model="model.MODOCOPAGO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="EMPIDMODELOPC"
          label="EMPIDMODELOPC"
          id="EMPIDMODELOPC"
          ref="EMPIDMODELOPC"
          v-model="model.EMPIDMODELOPC"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="DIASVTO"
          label="DIASVTO"
          id="DIASVTO"
          ref="DIASVTO"
          v-model="model.DIASVTO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="ESEXTRANJERO"
          label="ESEXTRANJERO"
          id="ESEXTRANJERO"
          ref="ESEXTRANJERO"
          v-model="model.ESEXTRANJERO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CLASIFICADOR"
          label="CLASIFICADOR"
          id="CLASIFICADOR"
          ref="CLASIFICADOR"
          v-model="model.CLASIFICADOR"
        ></v-text-field>
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
          name="AUTORETENEDOR"
          label="AUTORETENEDOR"
          id="AUTORETENEDOR"
          ref="AUTORETENEDOR"
          v-model="model.AUTORETENEDOR"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="GRANCONTRIBUYENTE"
          label="GRANCONTRIBUYENTE"
          id="GRANCONTRIBUYENTE"
          ref="GRANCONTRIBUYENTE"
          v-model="model.GRANCONTRIBUYENTE"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="EMAIL" label="EMAIL" id="EMAIL" ref="EMAIL" v-model="model.EMAIL"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="URL" label="URL" id="URL" ref="URL" v-model="model.URL"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="NOMBRES_R_LEGAL"
          label="NOMBRES_R_LEGAL"
          id="NOMBRES_R_LEGAL"
          ref="NOMBRES_R_LEGAL"
          v-model="model.NOMBRES_R_LEGAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="P_APELLIDO_R_LEGAL"
          label="P_APELLIDO_R_LEGAL"
          id="P_APELLIDO_R_LEGAL"
          ref="P_APELLIDO_R_LEGAL"
          v-model="model.P_APELLIDO_R_LEGAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="S_APELLIDO_R_LEGAL"
          label="S_APELLIDO_R_LEGAL"
          id="S_APELLIDO_R_LEGAL"
          ref="S_APELLIDO_R_LEGAL"
          v-model="model.S_APELLIDO_R_LEGAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="DE_NIT_R_LEGAL"
          label="DE_NIT_R_LEGAL"
          id="DE_NIT_R_LEGAL"
          ref="DE_NIT_R_LEGAL"
          v-model="model.DE_NIT_R_LEGAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IDACTIVIDAD"
          label="IDACTIVIDAD"
          id="IDACTIVIDAD"
          ref="IDACTIVIDAD"
          v-model="model.IDACTIVIDAD"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="TIPOREGIMEN"
          label="TIPOREGIMEN"
          id="TIPOREGIMEN"
          ref="TIPOREGIMEN"
          v-model="model.TIPOREGIMEN"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="MSUCURSALES"
          label="MSUCURSALES"
          id="MSUCURSALES"
          ref="MSUCURSALES"
          v-model="model.MSUCURSALES"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="FORMAPRE"
          label="FORMAPRE"
          id="FORMAPRE"
          ref="FORMAPRE"
          v-model="model.FORMAPRE"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CODIGO_ARP"
          label="CODIGO_ARP"
          id="CODIGO_ARP"
          ref="CODIGO_ARP"
          v-model="model.CODIGO_ARP"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="NORAD" label="NORAD" id="NORAD" ref="NORAD" v-model="model.NORAD"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="TIPOAPORTANTE"
          label="TIPOAPORTANTE"
          id="TIPOAPORTANTE"
          ref="TIPOAPORTANTE"
          v-model="model.TIPOAPORTANTE"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CODOPERADOR"
          label="CODOPERADOR"
          id="CODOPERADOR"
          ref="CODOPERADOR"
          v-model="model.CODOPERADOR"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CODIGO_AFP"
          label="CODIGO_AFP"
          id="CODIGO_AFP"
          ref="CODIGO_AFP"
          v-model="model.CODIGO_AFP"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CODIGO_CCF"
          label="CODIGO_CCF"
          id="CODIGO_CCF"
          ref="CODIGO_CCF"
          v-model="model.CODIGO_CCF"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="ASESOR_AFI"
          label="ASESOR_AFI"
          id="ASESOR_AFI"
          ref="ASESOR_AFI"
          v-model="model.ASESOR_AFI"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="ASESOR_MTO"
          label="ASESOR_MTO"
          id="ASESOR_MTO"
          ref="ASESOR_MTO"
          v-model="model.ASESOR_MTO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="FNAC_RLEGAL"
          label="FNAC_RLEGAL"
          id="FNAC_RLEGAL"
          ref="FNAC_RLEGAL"
          v-model="model.FNAC_RLEGAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="HOBBIE_RL"
          label="HOBBIE_RL"
          id="HOBBIE_RL"
          ref="HOBBIE_RL"
          v-model="model.HOBBIE_RL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PROF_RL"
          label="PROF_RL"
          id="PROF_RL"
          ref="PROF_RL"
          v-model="model.PROF_RL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="EMAIL_RL"
          label="EMAIL_RL"
          id="EMAIL_RL"
          ref="EMAIL_RL"
          v-model="model.EMAIL_RL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="TIPOID_TH"
          label="TIPOID_TH"
          id="TIPOID_TH"
          ref="TIPOID_TH"
          v-model="model.TIPOID_TH"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="NID_TH" label="NID_TH" id="NID_TH" ref="NID_TH" v-model="model.NID_TH"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="DE_NIT_TH"
          label="DE_NIT_TH"
          id="DE_NIT_TH"
          ref="DE_NIT_TH"
          v-model="model.DE_NIT_TH"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="NOMBRES_TH"
          label="NOMBRES_TH"
          id="NOMBRES_TH"
          ref="NOMBRES_TH"
          v-model="model.NOMBRES_TH"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="P_APELLIDO_TH"
          label="P_APELLIDO_TH"
          id="P_APELLIDO_TH"
          ref="P_APELLIDO_TH"
          v-model="model.P_APELLIDO_TH"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="S_APELLIDO_TH"
          label="S_APELLIDO_TH"
          id="S_APELLIDO_TH"
          ref="S_APELLIDO_TH"
          v-model="model.S_APELLIDO_TH"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="FNAC_TH"
          label="FNAC_TH"
          id="FNAC_TH"
          ref="FNAC_TH"
          v-model="model.FNAC_TH"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="HOBBIE_TH"
          label="HOBBIE_TH"
          id="HOBBIE_TH"
          ref="HOBBIE_TH"
          v-model="model.HOBBIE_TH"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PROF_TH"
          label="PROF_TH"
          id="PROF_TH"
          ref="PROF_TH"
          v-model="model.PROF_TH"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="EMAIL_TH"
          label="EMAIL_TH"
          id="EMAIL_TH"
          ref="EMAIL_TH"
          v-model="model.EMAIL_TH"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="ITFC" label="ITFC" id="ITFC" ref="ITFC" v-model="model.ITFC"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CNSITFC"
          label="CNSITFC"
          id="CNSITFC"
          ref="CNSITFC"
          v-model="model.CNSITFC"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="HOMOLOGO"
          label="HOMOLOGO"
          id="HOMOLOGO"
          ref="HOMOLOGO"
          v-model="model.HOMOLOGO"
        ></v-text-field>
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
          name="CUE_BANCARIA"
          label="CUE_BANCARIA"
          id="CUE_BANCARIA"
          ref="CUE_BANCARIA"
          v-model="model.CUE_BANCARIA"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="TIPO_CUE"
          label="TIPO_CUE"
          id="TIPO_CUE"
          ref="TIPO_CUE"
          v-model="model.TIPO_CUE"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field name="BANCO" label="BANCO" id="BANCO" ref="BANCO" v-model="model.BANCO"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="SUCURSAL"
          label="SUCURSAL"
          id="SUCURSAL"
          ref="SUCURSAL"
          v-model="model.SUCURSAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="NIIF_VTAEQUIEFECTIVOS"
          label="NIIF_VTAEQUIEFECTIVOS"
          id="NIIF_VTAEQUIEFECTIVOS"
          ref="NIIF_VTAEQUIEFECTIVOS"
          v-model="model.NIIF_VTAEQUIEFECTIVOS"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="MANFACT"
          label="MANFACT"
          id="MANFACT"
          ref="MANFACT"
          v-model="model.MANFACT"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="CTAVIGENCIAANTE"
          label="CTAVIGENCIAANTE"
          id="CTAVIGENCIAANTE"
          ref="CTAVIGENCIAANTE"
          v-model="model.CTAVIGENCIAANTE"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="EMAILRECIBOFE"
          label="EMAILRECIBOFE"
          id="EMAILRECIBOFE"
          ref="EMAILRECIBOFE"
          v-model="model.EMAILRECIBOFE"
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
      IDTERCERO: undefined,
      RAZONSOCIAL: undefined,
      NIT: undefined,
      DV: undefined,
      TIPO_ID: undefined,
      IDALTERNA1: undefined,
      IDALTERNA2: undefined,
      DIRECCION: undefined,
      NATJURIDICA: undefined,
      CIUDAD: undefined,
      TELEFONOS: undefined,
      FAX: undefined,
      APA: undefined,
      F_INSCRIPTO: undefined,
      F_RENOVACION: undefined,
      F_VENCIMIENT: undefined,
      R_LEGAL: undefined,
      TIPO_ID_R: undefined,
      NIT_R: undefined,
      ESTADO: undefined,
      REQAUTORIZA: undefined,
      CUENTA: undefined,
      ZONA: undefined,
      CIA: undefined,
      ACT_ECONOMICA: undefined,
      ENVIODICAJA: undefined,
      MODOCOPAGO: undefined,
      EMPIDMODELOPC: undefined,
      DIASVTO: undefined,
      ESEXTRANJERO: undefined,
      CLASIFICADOR: undefined,
      IDGRUPOIMP: undefined,
      AUTORETENEDOR: undefined,
      GRANCONTRIBUYENTE: undefined,
      EMAIL: undefined,
      URL: undefined,
      NOMBRES_R_LEGAL: undefined,
      P_APELLIDO_R_LEGAL: undefined,
      S_APELLIDO_R_LEGAL: undefined,
      DE_NIT_R_LEGAL: undefined,
      IDACTIVIDAD: undefined,
      TIPOREGIMEN: undefined,
      MSUCURSALES: undefined,
      FORMAPRE: undefined,
      CODIGO_ARP: undefined,
      NORAD: undefined,
      TIPOAPORTANTE: undefined,
      CODOPERADOR: undefined,
      CODIGO_AFP: undefined,
      CODIGO_CCF: undefined,
      ASESOR_AFI: undefined,
      ASESOR_MTO: undefined,
      FNAC_RLEGAL: undefined,
      HOBBIE_RL: undefined,
      PROF_RL: undefined,
      EMAIL_RL: undefined,
      TIPOID_TH: undefined,
      NID_TH: undefined,
      DE_NIT_TH: undefined,
      NOMBRES_TH: undefined,
      P_APELLIDO_TH: undefined,
      S_APELLIDO_TH: undefined,
      FNAC_TH: undefined,
      HOBBIE_TH: undefined,
      PROF_TH: undefined,
      EMAIL_TH: undefined,
      ITFC: undefined,
      CNSITFC: undefined,
      HOMOLOGO: undefined,
      PNOMBRE: undefined,
      SNOMBRE: undefined,
      PAPELLIDO: undefined,
      SAPELLIDO: undefined,
      CUE_BANCARIA: undefined,
      TIPO_CUE: undefined,
      BANCO: undefined,
      SUCURSAL: undefined,
      NIIF_VTAEQUIEFECTIVOS: undefined,
      MANFACT: undefined,
      CTAVIGENCIAANTE: undefined,
      EMAILRECIBOFE: undefined
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
    