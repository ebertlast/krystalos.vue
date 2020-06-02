<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-scroll-y-transition mode="out-in">
        <v-flex xs12 v-if="cargando">
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-flex>
      </v-scroll-y-transition>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">Documento de Identidad</span>
              <div>{{(model && model.DOCIDAFILIADO) ? model.TIPO_DOC+" "+model.DOCIDAFILIADO : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs9>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">Nombres y Apellidos</span>
              <div>
                {{(model && model.PNOMBRE) ? model.PNOMBRE : ""}}
                {{(model && model.SNOMBRE) ? model.SNOMBRE : ""}}
                {{(model && model.PAPELLIDO) ? model.PAPELLIDO : ""}}
                {{(model && model.SAPELLIDO) ? model.SAPELLIDO : ""}}
              </div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">Género</span>
              <div>{{(model && model.SEXO) ? model.SEXO : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">Teléfono Celular</span>
              <div>{{(model && model.CELULAR) ? model.CELULAR : "Sin Información"}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">Teléfono Domicilio</span>
              <div>{{(model && model.TELEFONORES) ? model.TELEFONORES : "Sin Información"}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>

      <v-scroll-y-transition mode="out-in" v-if="!cargando">
        <v-flex xs12>
          <v-tooltip top>
            <v-btn slot="activator" color="warning" @click="seleccionar" fab small dark>
              <v-icon>done_outline</v-icon>
            </v-btn>
            <span>Seleccionar</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn slot="activator" color="primary" @click="editarFila" fab small dark>
              <v-icon>edit</v-icon>
            </v-btn>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn slot="activator" color="error" @click="eliminar" fab small dark>
              <v-icon>delete</v-icon>
            </v-btn>
            <span>Eliminar</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn slot="activator" @click="cancelar" fab small>
              <v-icon>undo</v-icon>
            </v-btn>
            <span>Cancelar</span>
          </v-tooltip>
        </v-flex>
      </v-scroll-y-transition>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["fila"],
  data: () => ({
    cargando: false,
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
    this.refrescarDatos();
  },
  methods: {
    ...mapActions(["notificacion"]),
    refrescarDatos() {
      if (!this.fila || !this.fila.IDAFILIADO) return;
      this.cargando = true;
      this.model = {};
      this.$http
        .get(`afi/${this.fila.IDAFILIADO}`)
        .then(res => {
          this.model = res.result.recordset[0];
        })
        .then(() => {
          this.cargando = false;
        })
        .catch(err => {
          this.cargando = false;
        });
    },
    seleccionar() {
      this.$emit("seleccionar", this.model);
    },
    eliminar() {
      return this.notificacion({
        message:
          "No está permitido eliminar un registro de esta tabla, intente inactivarlo",
        type: "error"
      });
    },
    cancelar() {
      this.$emit("cancelar");
    },
    editarFila() {
      this.$emit("editar", this.model);
    }
  },
  watch: {
    fila() {
      this.refrescarDatos();
    }
  }
};
</script>
    