<template>
  <v-form ref="form" v-model="valid" lazy-validation>
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
            :loading="consultando_documento"
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
            :rules="TIPO_DOCRules"
            required
            :loading="consultando_documento"
          ></v-autocomplete>
        </v-flex>

        <v-flex xs2>
          <v-text-field
            label="Documento de Identidad"
            name="DOCIDAFILIADO"
            id="DOCIDAFILIADO"
            ref="DOCIDAFILIADO"
            v-model="model.DOCIDAFILIADO"
            :rules="DOCIDAFILIADORules"
            required
            :loading="consultando_documento"
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
            :rules="PNOMBRERules"
            required
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
            :rules="PNOMBRERules"
            required
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
  </v-form>
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
    },
    PNOMBRERules: [
      v => !!v || "El primer nombre es Obligatorio",
      v =>
        (v && v.length <= 30) || "El nombre debe tener menos de 30 caracteres"
    ],
    PAPELLIDORules: [
      v => !!v || "El primer apellido es Obligatorio",
      v =>
        (v && v.length <= 30) || "El apellido debe tener menos de 30 caracteres"
    ],
    TIPO_DOCRules: [v => !!v || "El Tipo de Documento es Obligatorio"],
    DOCIDAFILIADORules: [
      v => !!v || "Documento de Identificación es Obligatorio",
      v =>
        (v && v.length <= 30) ||
        "El documento de identidad debe tener menos de 20 caracteres",
      v =>
        (v && v.length > 4) || "El documento de identidad al menos 4 caracteres"
    ],
    valid: true,
    time_out: undefined,
    consultando_documento: false
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
      if (this.$refs.form.validate()) {
        this.confirmarGuardado();
      }
    },
    confirmarGuardado() {
      this.$emit("guardar", this.model);
      this.model = this.model_limpio;
    },
    validar_existencia_registro() {
      if (!this.editar) {
        if (
          this.model.TIPO_DOC &&
          this.model.TIPO_DOC !== "" &&
          this.model.DOCIDAFILIADO &&
          this.model.DOCIDAFILIADO !== ""
        ) {
          clearTimeout(this.time_out);
          this.time_out = setTimeout(() => {
            this.consultando_documento = true;
            this.$http
              .get(`afi/${this.model.TIPO_DOC}/${this.model.DOCIDAFILIADO}`)
              .then(res => {
                console.log(res);
                if (res.result.recordset.length > 0) {
                  var DOCIDAFILIADO = this.model.DOCIDAFILIADO;
                  this.DOCIDAFILIADORules = [
                    v => !!v || "Documento de Identificación es Obligatorio",
                    v =>
                      (v && v.length <= 30) ||
                      "El documento de identidad debe tener menos de 20 caracteres",
                    v =>
                      (v && v.length > 4) ||
                      "El documento de identidad al menos 4 caracteres",
                    v => v !== DOCIDAFILIADO || "Documento de Identidad existe"
                  ];
                } else {
                  this.DOCIDAFILIADORules = [
                    v => !!v || "Documento de Identificación es Obligatorio",
                    v =>
                      (v && v.length <= 30) ||
                      "El documento de identidad debe tener menos de 20 caracteres",
                    v =>
                      (v && v.length > 4) ||
                      "El documento de identidad al menos 4 caracteres"
                  ];
                }
              })
              .catch(err => {
                console.log(err);
              })
              .then(() => {
                this.consultando_documento = false;
              });
          }, 1000);
        }
      }
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
  },
  watch: {
    "model.TIPO_DOC"() {
      this.validar_existencia_registro();
    },
    "model.DOCIDAFILIADO"() {
      this.validar_existencia_registro();
    }
  }
};
</script>
    