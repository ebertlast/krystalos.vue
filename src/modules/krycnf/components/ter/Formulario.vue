<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs1>
        <v-autocomplete
          v-model="model.TIPO_ID"
          :items="tipoDocumentos"
          label="Tipo de Documento"
          persistent-hint
          prepend-icon="mdi-city"
          item-value="CODIGO"
          item-text="CODIGO"
          ref="TIPO_ID"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs3>
        <v-autocomplete
          v-model="model.TIPO_ID"
          :items="tipoDocumentos"
          label="Tipo de Documento"
          persistent-hint
          prepend-icon="mdi-city"
          item-value="CODIGO"
          item-text="DESCRIPCION"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs2>
        <v-text-field
          name="IDTERCERO"
          label="IDTERCERO"
          id="IDTERCERO"
          ref="IDTERCERO"
          v-model="model.IDTERCERO"
          hint="Escribe solo números sin guiones ni espacios"
        ></v-text-field>
      </v-flex>

      <v-flex xs6>
        <v-text-field
          name="RAZONSOCIAL"
          label="RAZON SOCIAL"
          id="RAZONSOCIAL"
          ref="RAZONSOCIAL"
          v-model="model.RAZONSOCIAL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-autocomplete
          v-model="model.NATJURIDICA"
          :items="['Juridica','Natural','Publica','Privada','Mixta','Cooperativa','EAT','Otra','PNR','PNNR','PJD','PJND']"
          label="NATURALEZA JURIDICA"
          persistent-hint
          prepend-icon="mdi-city"
          ref="NATJURIDICA"
          id="NATJURIDICA"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs2>
        <v-text-field
          name="NIT"
          label="NIT"
          id="NIT"
          ref="NIT"
          v-model="model.NIT"
          hint="Escribe solo números sin guiones ni espacios"
        ></v-text-field>
      </v-flex>

      <v-flex xs2>
        <v-autocomplete
          v-model="model.DV"
          :items="['0','1','2','3','4','5','6','7','8','9']"
          label="Digito de Verificación"
          persistent-hint
          prepend-icon="mdi-city"
          ref="DV"
        ></v-autocomplete>
      </v-flex>

      <v-flex xs2>
        <v-autocomplete
          name="ESTADO"
          v-model="model.ESTADO"
          :items="['Activo','Inactivo']"
          label="ESTADO"
          persistent-hint
          prepend-icon="mdi-city"
          ref="ESTADO"
        ></v-autocomplete>
      </v-flex>

      <v-flex xs3>
        <v-autocomplete
          :items="cius"
          v-model="model.CIUDAD"
          label="CIUDAD"
          item-value="CIUDAD"
          item-text="NOMBRE"
          id="CIUDAD"
          ref="CIUDAD"
          no-data-text="Registro no encontrado"
          :hint="dep.NOMBRE"
          persistent-hint
        ></v-autocomplete>
      </v-flex>

      <v-flex xs12>
        <v-scroll-y-transition mode="out-in" v-if="model.DIRECCION && model.DIRECCION!==''">
          <v-toolbar dark color="success lighten-3">
            <v-toolbar-title class="black--text">Dirección: {{model.DIRECCION}}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon @click="editarDireccion">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-toolbar>
        </v-scroll-y-transition>
        <v-scroll-y-transition mode="in-out">
          <direccionador
            @direccion="model.DIRECCION=$event"
            v-show="!model.DIRECCION || model.DIRECCION===''"
            ref="direccionador"
          ></direccionador>
        </v-scroll-y-transition>
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

      <v-flex xs6>
        <v-text-field
          type="email"
          name="EMAIL"
          label="EMAIL"
          id="EMAIL"
          ref="EMAIL"
          v-model="model.EMAIL"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-autocomplete
          v-model="model.TIPOREGIMEN"
          :items="tipo_regimen"
          name="TIPOREGIMEN"
          label="Tipo de Regimen"
          persistent-hint
          prepend-icon="mdi-city"
          item-value="CODIGO"
          item-text="DESCRIPCION"
          ref="TIPOREGIMEN"
          id="TIPOREGIMEN"
        ></v-autocomplete>
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

      <v-flex xs12>
        <v-btn color="success" @click="guardar">Guardar</v-btn>
        <v-btn @click="$emit('cancelar')">Cancelar</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { default as globals_components } from "../../../../../src/common/components";

export default {
  props: ["fila", "editar"],
  data: () => ({
    tipo_regimen: [
      {
        CODIGO: "C",
        DESCRIPCION: "Regimen Comun"
      },
      {
        CODIGO: "S",
        DESCRIPCION: "Regimen Simplificado"
      },
      {
        CODIGO: "E",
        DESCRIPCION: "Empresa Estatal"
      },
      {
        CODIGO: "P",
        DESCRIPCION: "Regimen Especial"
      }
    ],
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
      ESTADO: "Activo",
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
      FORMAPRE: "U",
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
    },
    editarDireccion() {
      this.model.DIRECCION = "";
      this.$refs.direccionador.show = true;
    }
  },
  computed: {
    ...mapGetters("krycnf", ["deps", "cius", "ciubs", "tipoDocumentos"]),
    dep() {
      var dep = { DPTO: "", NOMBRE: "", PAIS: "" };
      var self = this;
      if (!self.model || !self.model.CIUDAD) return dep;
      var ciu = self.cius.filter(function(el) {
        return el.CIUDAD == self.model.CIUDAD;
      })[0];
      dep = self.deps.filter(function(el) {
        return el.DPTO == ciu.DPTO;
      })[0];
      return dep;
    }
  },
  components: {
    Direccionador: globals_components.Direccionador
  }
};
</script>
    