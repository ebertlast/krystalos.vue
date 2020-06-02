<template>
  <tabla
    :columnas="columnas"
    :filas="filas"
    :loading="cargando_tabla"
    @fila="fila=$event;"
    titulo="Terceros"
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
    },
    editar: false
  }),
  components: {
    Tabla: global_components.DataTabla,
    EnConstruccion: global_components.EnConstruccion,
    Detalles: components.TERDetalles,
    Formulario: components.TERFormulario
  },
  mounted() {
    this.recargarFilas();
    // this.actualizarIPSs();
  },
  methods: {
    ...mapActions(["notificacion"]),
    recargarFilas() {
      this.cargando_tabla = true;
      this.filas = [];
      this.columnas = [];
      this.$http
        .get(`ter`)
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
      console.log(this.model);
      this.$emit("model", this.model);
      this.$refs.tabla.cerrarDialog();
    },
    editarFila(_model) {
      this.model = _model;
      this.editar = true;
    },
    guardar(_model) {
      const json = "json=" + JSON.stringify({ model: _model });
      this.cargando = true;
      if (!this.editar) {
        this.$refs.tabla.cerrarDialog();
        this.$http
          .post(`ter`, json)
          .then(res => {
            this.cargando = false;
            if (res.success) {
              this.recargarFilas();
              this.notificacion({
                message:
                  "Registro Agregado a la Base de Datos Satisfactoriamente",
                type: "success"
              });
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
          .put(`ter`, json)
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
    },
    actualizarIPSs() {
      this.cargando = true;
      this.$http
        .get(`usvgs/TERCATIPS`)
        .then(res => {
          return res.result.recordset[0];
        })
        .then(usvgs => {
          this.cargando = true;
          this.$http
            .get(`ter/categoria/${usvgs.DATO}`)
            .then(res => {
              this.ipss = res.result.recordset;
            })
            .catch(err => {
              console.log(err);
            })
            .then(() => {
              this.cargando = false;
            });
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          this.cargando = false;
        });
    }
  },
  computed: {
    model_limpio() {
      return {
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
      };
    }
  }
};
</script>
