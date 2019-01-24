<template>
  <tabla
    :columnas="columnas"
    :filas="filas"
    :loading="cargando_tabla"
    @fila="fila=$event;"
    titulo="Afiliados"
    ref="tabla"
  >
    <template slot="detalles">
      <v-scroll-y-transition mode="out-in">
        <detalles
          @cancelar="cancelar"
          :fila="fila"
          v-if="!editar"
          @editar="editarFila($event)"
          @seleccionar="seleccionar($event)"
        ></detalles>
      </v-scroll-y-transition>
      <v-scroll-y-transition mode="out-in">
        <v-container grid-list-md text-xs-center v-if="editar">
          <formulario
            @cancelar="editar=false"
            @guardar="guardar($event)"
            :fila="model"
            ref="formulario_edicion"
            :editar="true"
          ></formulario>
        </v-container>
      </v-scroll-y-transition>
    </template>
    <template slot="formulario">
      <formulario
        @cancelar="cancelar"
        @guardar="guardar($event)"
        ref="formulario_nuevo"
        :editar="false"
      ></formulario>
    </template>
  </tabla>
</template>

<script>
import { default as global_components } from "../../../../common/components/";
import { default as components } from "../";
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    cargando: false,
    fila: {},
    filas: [],
    columnas: [],
    cargando_tabla: false,
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
    editar: false
  }),
  components: {
    Tabla: global_components.DataTabla,
    EnConstruccion: global_components.EnConstruccion,
    Detalles: components.AFIDetalles,
    Formulario: components.AFIFormulario
  },
  mounted() {
    this.recargarFilas();
  },
  methods: {
    ...mapActions(["notificacion"]),
    recargarFilas() {
      this.cargando_tabla = true;
      this.filas = [];
      this.columnas = [];
      this.$http
        .get(`afi`)
        .then(res => {
          this.filas = res.result.recordset;
          this.columnas = [];
          Object.keys(this.filas[0]).forEach(col => {
            this.columnas.push({ text: col.replace("_", " "), value: col });
          });
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          this.cargando_tabla = false;
        });
    },
    seleccionar(model) {
      this.model = model;
      this.$emit("model", this.model);
      this.$refs.tabla.cerrarDialog();
    },
    editarFila(_model) {
      this.model = _model;
      this.editar = true;
    },
    guardar(_model) {
      this.model = _model;
      const json = "json=" + JSON.stringify({ model: _model });
      this.cargando = true;
      if (!this.editar) {
        this.$refs.tabla.cerrarDialog();
        this.$http
          .post(`afi`, json)
          .then(res => {
            this.cargando = false;
            if (res.success) {
              this.recargarFilas();
              this.notificacion({
                message:
                  "Registro Agregado a la Base de Datos Satisfactoriamente",
                type: "success"
              });
              this.model = this.model_limpio;
            } else {
              this.notificacion({
                message:
                  "Problemas al Intentar Realizar el Registro en la Base de Datos",
                type: "error"
              });
            }
          })
          .catch(err => {
            console.log(err);
          })
          .then(() => {
            this.cargando = false;
          });
      } else {
        this.editar = false;
        this.$http
          .put(`afi`, json)
          .then(res => {
            this.cargando = false;
            if (res.success) {
              this.recargarFilas();
              this.notificacion({
                message: "Registro Actualizado Satisfactoriamente",
                type: "success"
              });
            } else {
              this.notificacion({
                message:
                  "Problemas al Intentar Actualizar el Registro en la Base de Datos",
                type: "error"
              });
            }
          })
          .catch(err => {
            console.log(err);
          })
          .then(() => {
            this.cargando = false;
          });
      }
    },
    cancelar() {
      this.$refs.tabla.cerrarDialog();
    }
  }
};
</script>