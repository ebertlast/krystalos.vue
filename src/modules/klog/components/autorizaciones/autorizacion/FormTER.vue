  <template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <!-- <v-btn
        slot="activator"
        color="primary"
        dark
        :disabled="dialog"
        :loading="dialog"
        v-text="`Agregar ${idcategoria}`"
      ></v-btn>-->
      <v-btn
        slot="activator"
        :disabled="dialog||cargando"
        :loading="cargando"
        class="white--text"
        color="purple darken-2"
        @click="dialog = true"
        v-text="`Agregar ${idcategoria}`"
      ></v-btn>
      <v-card>
        <v-card-title>
          <span class="headline" v-text="`Creación de un tercero ${idcategoria}`"></span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs6>
                <v-text-field
                  label="NIT*"
                  v-model="model.IDTERCERO"
                  ref="IDTERCERO"
                  required
                  hint="No incluya letras"
                  v-on:keypress.enter="guardar"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Razón Social"
                  hint="Evite los acéntos y las virgulillas"
                  required
                  ref="RAZONSOCIAL"
                  v-on:keypress.enter="guardar"
                  v-model="model.RAZONSOCIAL"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*Indica que es un campo obligatorio y no puede estar en blanco</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false" :disabled="cargando">Cancelar</v-btn>
          <v-btn color="blue darken-1" flat @click="guardar" :disabled="cargando">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["idcategoria"],
  data: () => ({
    dialog: false,
    cargando: false,
    model: {
      IDTERCERO: undefined,
      RAZONSOCIAL: undefined,
      NIT: undefined,
      DV: undefined,
      TIPO_ID: "NIT",
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
  computed: {
    model_limpio() {
      return {
        IDTERCERO: undefined,
        RAZONSOCIAL: undefined,
        NIT: undefined,
        DV: undefined,
        TIPO_ID: "NIT",
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
      };
    }
  },
  methods: {
    ...mapActions(["setAlert", "notificacion"]),

    guardar() {
      if (!this.model.IDTERCERO || this.model.IDTERCERO === "") {
        return this.$refs.IDTERCERO.focus();
      }
      if (!this.model.RAZONSOCIAL || this.model.RAZONSOCIAL === "") {
        return this.$refs.RAZONSOCIAL.focus();
      }
      this.model.IDCATEGORIA = this.idcategoria;
      const json = "json=" + JSON.stringify({ model: this.model });
      this.cargando = true;
      this.$http
        .post(`ter`, json)
        .then(res => {
          if (res.success) {
            this.$emit("refrescar_registros");
            this.notificacion({
              message:
                "Registro Agregado a la Base de Datos Satisfactoriamente",
              type: "success"
            });
            this.model = this.model_limpio;
            this.dialog = false;
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
    }
  },
  watch: {
    dialog() {
      if (this.dialog) {
        var self = this;
        setTimeout(() => {
          self.$refs.IDTERCERO.focus();
        }, 500);
      }
    }
  }
};
</script>

<style>
</style>
