<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs1>
        <v-autocomplete
          v-model="model.TIPO_DOC"
          :items="tipoDocumentos"
          label="Tipo de Documento de Identidad"
          persistent-hint
          prepend-icon="mdi-city"
          item-value="CODIGO"
          item-text="CODIGO"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs3>
        <v-autocomplete
          v-model="model.TIPO_DOC"
          :items="tipoDocumentos"
          label="Tipo de Documento de Identidad"
          persistent-hint
          prepend-icon="mdi-city"
          item-value="CODIGO"
          item-text="DESCRIPCION"
        ></v-autocomplete>
      </v-flex>

      <v-flex xs2>
        <v-text-field
          label="Documento de Identidad"
          name="DOCIDAFILIADO"
          id="DOCIDAFILIADO"
          ref="DOCIDAFILIADO"
          v-model="model.DOCIDAFILIADO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-radio-group v-model="model.SEXO" row ref="SEXO">
          <v-radio value="Femenino">
            <div slot="label">
              <strong class="pink--text">Femenino</strong>
            </div>
          </v-radio>
          <v-radio value="Masculino">
            <div slot="label">
              <strong class="primary--text">Masculino</strong>
            </div>
          </v-radio>
        </v-radio-group>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="IDAFILIADO"
          label="Carnet"
          id="IDAFILIADO"
          ref="IDAFILIADO"
          v-model="model.IDAFILIADO"
          readonly
          :disabled="!editar"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PNOMBRE"
          label="Primer Nombre"
          id="PNOMBRE"
          ref="PNOMBRE"
          v-model="model.PNOMBRE"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="SNOMBRE"
          label="Segundo Nombre"
          id="SNOMBRE"
          ref="SNOMBRE"
          v-model="model.SNOMBRE"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="PAPELLIDO"
          label="Primer Apellido"
          id="PAPELLIDO"
          ref="PAPELLIDO"
          v-model="model.PAPELLIDO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="SAPELLIDO"
          label="Segundo Apellido"
          id="SAPELLIDO"
          ref="SAPELLIDO"
          v-model="model.SAPELLIDO"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field v-model="model.CELULAR" ref="CELULAR" label="Teléfono Celular" mask="phone"></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="TELEFONORES"
          label="Teléfono Domicilio"
          id="TELEFONORES"
          ref="TELEFONORES"
          v-model="model.TELEFONORES"
          mask="phone"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          name="EMAIL"
          label="Email"
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
      IDAFILIADO: undefined,
      PAPELLIDO: undefined,
      SAPELLIDO: undefined,
      PNOMBRE: undefined,
      SNOMBRE: undefined,
      TIPO_DOC: undefined,
      DOCIDAFILIADO: undefined,
      IDALTERNA: undefined,
      IDAFILIADOPPAL: undefined,
      GRUPO_SANG: undefined,
      ESTADO_CIVIL: undefined,
      GRUPOETNICO: undefined,
      SEXO: undefined,
      IDPARENTESCO: undefined,
      LOCALIDAD: undefined,
      DIRECCION: undefined,
      TELEFONORES: undefined,
      CIUDAD: undefined,
      ZONA: undefined,
      CODENTIDADANTERIOR: undefined,
      ESTADO: undefined,
      FECHAULTESTADO: undefined,
      IDSEDE: undefined,
      IDPROVEEDOR: undefined,
      FNACIMIENTO: undefined,
      FECHAAFILSGSSS: undefined,
      ACT_ECONO: undefined,
      IDESCOLARIDAD: undefined,
      INDCOTIZANTE: undefined,
      ULTIMOANOAPROBADO: undefined,
      INCAPACIDADLABORAL: undefined,
      TIPODISCAPACIDAD: undefined,
      TIPOAFILIADO: undefined,
      GRUPOATESPECIAL: undefined,
      CABEZADEFAMILIA: undefined,
      ASOCIADO: undefined,
      TIENEOBS: undefined,
      CAMPOUSUARIO1: undefined,
      FECHAUVISITA: undefined,
      CONSANGUINIDAD: undefined,
      IDADMINISTRADORA: undefined,
      IDCAUSAL: undefined,
      FECHACAUSAL: undefined,
      CLASIFPC: undefined,
      NIVELSOCIOEC: undefined,
      IDPLAN: undefined,
      FECHAAFILIACION: undefined,
      NUMCARNET: undefined,
      CIUDADDOC: undefined,
      IDEMPLEADOR: undefined,
      SEMANASCOT: undefined,
      CARNETIZADO: undefined,
      FECHACARNET: undefined,
      CONSCERTIFICADO: undefined,
      CIUDADNAC: undefined,
      IDOCUPACION: undefined,
      NACIONALIDAD: undefined,
      CELULAR: undefined,
      DIRECCIONLAB: undefined,
      TELEFONOLAB: undefined,
      CNSAFIAA: undefined,
      SISBENNUMFICHA: undefined,
      SISBENFECHAFICHA: undefined,
      SISBENPUNTAJE: undefined,
      SISBENNUCLEOFAM: undefined,
      SISBENGRUPOB: undefined,
      IDCONTRATO: undefined,
      IDBARRIO: undefined,
      CLASEAFILIACIONARS: undefined,
      FORMULARIO: undefined,
      EMAIL: undefined,
      NORADICACION: undefined,
      FECHARADICACION: undefined,
      IDTIPOAFILIACION: undefined,
      IDCLASEAFILIACION: undefined,
      V_FORMULARIO: undefined,
      SISBENNIVEL: undefined,
      CNSXCPA: undefined,
      FESTADO: undefined,
      OKBD: undefined,
      USUARIOBD: undefined,
      NACIMIENTO: undefined,
      ITFC: undefined,
      CNSITFC: undefined,
      TIPOSUBSIDIO: undefined,
      COBERTURA_SALUD: undefined,
      TIPOAFILIADO2: undefined,
      IDAFI_TITULAR: undefined,
      ES_NN: undefined,
      IDESPECIAL: undefined,
      MTRIAGE: undefined,
      FTRIAGE: undefined,
      GRUPOPOB: undefined,
      IDSEDETRIAGE: undefined,
      F_ACTUALIZA: undefined,
      PRIORIDAD: undefined,
      URG_NOMBRE: undefined,
      URG_TELE: undefined,
      URG_DIR: undefined,
      URG_VINCULO: undefined,
      RAIPOSITIVO: undefined,
      RAIFECHA: undefined,
      RAIUSU: undefined,
      USUARIOATIENDE: undefined,
      OBSERVACION: undefined
    }
  }),
  mounted() {
    if (this.fila) {
      this.model = this.fila;
    } else {
      this.model.SEXO = "Masculino";
    }
  },
  methods: {
    guardar() {
      this.$emit("guardar", this.model);
      this.model = this.model_limpio;
    }
  },
  computed: {
    ...mapGetters("krycnf", ["tipoDocumentos"]),
    model_limpio() {
      var model = {
        IDAFILIADO: undefined,
        PAPELLIDO: undefined,
        SAPELLIDO: undefined,
        PNOMBRE: undefined,
        SNOMBRE: undefined,
        TIPO_DOC: undefined,
        DOCIDAFILIADO: undefined,
        IDALTERNA: undefined,
        IDAFILIADOPPAL: undefined,
        GRUPO_SANG: undefined,
        ESTADO_CIVIL: undefined,
        GRUPOETNICO: undefined,
        SEXO: undefined,
        IDPARENTESCO: undefined,
        LOCALIDAD: undefined,
        DIRECCION: undefined,
        TELEFONORES: undefined,
        CIUDAD: undefined,
        ZONA: undefined,
        CODENTIDADANTERIOR: undefined,
        ESTADO: undefined,
        FECHAULTESTADO: undefined,
        IDSEDE: undefined,
        IDPROVEEDOR: undefined,
        FNACIMIENTO: undefined,
        FECHAAFILSGSSS: undefined,
        ACT_ECONO: undefined,
        IDESCOLARIDAD: undefined,
        INDCOTIZANTE: undefined,
        ULTIMOANOAPROBADO: undefined,
        INCAPACIDADLABORAL: undefined,
        TIPODISCAPACIDAD: undefined,
        TIPOAFILIADO: undefined,
        GRUPOATESPECIAL: undefined,
        CABEZADEFAMILIA: undefined,
        ASOCIADO: undefined,
        TIENEOBS: undefined,
        CAMPOUSUARIO1: undefined,
        FECHAUVISITA: undefined,
        CONSANGUINIDAD: undefined,
        IDADMINISTRADORA: undefined,
        IDCAUSAL: undefined,
        FECHACAUSAL: undefined,
        CLASIFPC: undefined,
        NIVELSOCIOEC: undefined,
        IDPLAN: undefined,
        FECHAAFILIACION: undefined,
        NUMCARNET: undefined,
        CIUDADDOC: undefined,
        IDEMPLEADOR: undefined,
        SEMANASCOT: undefined,
        CARNETIZADO: undefined,
        FECHACARNET: undefined,
        CONSCERTIFICADO: undefined,
        CIUDADNAC: undefined,
        IDOCUPACION: undefined,
        NACIONALIDAD: undefined,
        CELULAR: undefined,
        DIRECCIONLAB: undefined,
        TELEFONOLAB: undefined,
        CNSAFIAA: undefined,
        SISBENNUMFICHA: undefined,
        SISBENFECHAFICHA: undefined,
        SISBENPUNTAJE: undefined,
        SISBENNUCLEOFAM: undefined,
        SISBENGRUPOB: undefined,
        IDCONTRATO: undefined,
        IDBARRIO: undefined,
        CLASEAFILIACIONARS: undefined,
        FORMULARIO: undefined,
        EMAIL: undefined,
        NORADICACION: undefined,
        FECHARADICACION: undefined,
        IDTIPOAFILIACION: undefined,
        IDCLASEAFILIACION: undefined,
        V_FORMULARIO: undefined,
        SISBENNIVEL: undefined,
        CNSXCPA: undefined,
        FESTADO: undefined,
        OKBD: undefined,
        USUARIOBD: undefined,
        NACIMIENTO: undefined,
        ITFC: undefined,
        CNSITFC: undefined,
        TIPOSUBSIDIO: undefined,
        COBERTURA_SALUD: undefined,
        TIPOAFILIADO2: undefined,
        IDAFI_TITULAR: undefined,
        ES_NN: undefined,
        IDESPECIAL: undefined,
        MTRIAGE: undefined,
        FTRIAGE: undefined,
        GRUPOPOB: undefined,
        IDSEDETRIAGE: undefined,
        F_ACTUALIZA: undefined,
        PRIORIDAD: undefined,
        URG_NOMBRE: undefined,
        URG_TELE: undefined,
        URG_DIR: undefined,
        URG_VINCULO: undefined,
        RAIPOSITIVO: undefined,
        RAIFECHA: undefined,
        RAIUSU: undefined,
        USUARIOATIENDE: undefined,
        OBSERVACION: undefined
      };
      return model;
    }
  }
};
</script>
    