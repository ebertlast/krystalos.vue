<template>
  <tabla
    :columnas="columnas"
    :filas="filas"
    :loading="cargando_tabla"
    @fila="fila=$event;"
    titulo="Autorizaciones"
    ref="tabla"
    @agregar="$router.push({name:'autorizacion_add'})"
  >
    <template slot="detalles">
      <template>
        <v-progress-linear :indeterminate="true" v-if="cargando"></v-progress-linear>
      </template>
      <template>
        <v-scroll-y-transition mode="out-in" v-if="afi && afi.PNOMBRE && afi.PNOMBRE!==''">
          <v-container elevation-1>
            <!-- <h1>{{aut.NOAUT}}</h1> -->
            <v-layout row wrap>
              <v-flex xs12>
                <v-expansion-panel popout>
                  <v-expansion-panel-content>
                    <div slot="header">
                      <div class="title text-xs-left">
                        <v-layout row wrap>
                          <v-flex xs3>
                            <!-- <v-chip :color="color_aut"> -->
                            <v-avatar tile>
                              <!-- <img :src="avatar_aut" :alt="aut.NOAUT"> -->
                              <v-progress-circular
                                :rotate="360"
                                :size="40"
                                :width="5"
                                :value="progreso"
                                :color="color_progreso"
                              >
                                <font class="caption">{{ progreso }}%</font>
                              </v-progress-circular>
                            </v-avatar>
                            {{aut.ESTADO}}
                            <!-- </v-chip> -->
                          </v-flex>
                          <v-flex xs7>
                            <v-card-text class="font-italic font-weight-thin indigo--text">
                              <!-- {{ciub.NOMBRE}} - {{ciu.NOMBRE}} - {{dep.NOMBRE}} -->
                              {{ciu.NOMBRE}} - {{dep.NOMBRE}} - {{aut.DIRECCION}}
                            </v-card-text>
                          </v-flex>
                          <v-flex xs2 class="text-xs-right">
                            <v-card-text>{{aut.NOAUT}}</v-card-text>
                          </v-flex>
                        </v-layout>
                      </div>
                    </div>
                    <v-card>
                      <template>
                        <v-container grid-list-md text-xs-center>
                          <v-layout row wrap>
                            <v-flex xs12>
                              <v-card dark :color="color_progreso">
                                <!-- <v-card-text class="px-0"> -->
                                Artículos
                                <!-- </v-card-text> -->
                              </v-card>
                            </v-flex>
                            <v-flex xs12>
                              <v-card>
                                <v-list>
                                  <v-list-tile v-for="item in autd" :key="item.NO_ITEM" @click>
                                    <v-list-tile-action>{{item.CANTIDAD}}</v-list-tile-action>

                                    <v-list-tile-content>
                                      <v-list-tile-title v-text="item.DESCSERVICIO"></v-list-tile-title>
                                      <v-list-tile-sub-title v-html="item.COMENTARIOS" class="red--text font-italic"></v-list-tile-sub-title>
                                    </v-list-tile-content>

                                    <!-- <v-list-tile-avatar>
                                      <img :src="item.avatar">
                                    </v-list-tile-avatar>-->
                                  </v-list-tile>
                                </v-list>
                              </v-card>
                            </v-flex>
                            <v-flex xs12>
                              <v-card dark :color="color_progreso">Registros de Eventualidades</v-card>
                            </v-flex>
                            <v-flex
                              xs3
                              class="text-xs-right"
                            >{{aut.FECHAREALIZACION | moment("dddd, DD MMMM YYYY, HH:mm")}}</v-flex>
                            <v-flex xs1>-</v-flex>
                            <v-flex xs8 class="text-xs-left">ATENCION DEL PACIENTE EN LA IPS</v-flex>
                            <v-flex
                              xs3
                              class="text-xs-right"
                            >{{aut.FECHAGEN | moment("dddd, DD MMMM YYYY, HH:mm")}}</v-flex>
                            <v-flex xs1>-</v-flex>
                            <v-flex
                              xs8
                              class="text-xs-left"
                            >AUTORIZACIÓN GENERADA Y ENTREGADA AL PACIENTE</v-flex>
                            <v-flex
                              xs3
                              class="text-xs-right"
                            >{{aut.FECHA | moment("dddd, DD MMMM YYYY, HH:mm")}}</v-flex>
                            <v-flex xs1>-</v-flex>
                            <v-flex
                              xs8
                              class="text-xs-left"
                            >FECHA DE TRANSCRIPCIÓN DE LA SOLICITUD EN EL SISTEMA</v-flex>
                            <v-flex xs12>
                              <v-card dark :color="color_progreso">Archivos</v-card>
                            </v-flex>
                            <v-flex xs12>
                              <v-card>
                                <v-list avatar>
                                  <v-list-tile
                                    v-for="(item, index) in auta"
                                    :key="index"
                                    @click="descargar_archivo(item)"
                                  >
                                    <v-list-tile-avatar>
                                      <v-icon>attach_file</v-icon>
                                    </v-list-tile-avatar>

                                    <!-- <v-list-tile-action>
                                      {{item.NOMBRE}}
                                    </v-list-tile-action>-->
                                    <v-list-tile-content>
                                      <v-list-tile-title>{{item.NOMBRE}} ({{tipo_documento(item.TIPODOC)}})</v-list-tile-title>
                                    </v-list-tile-content>
                                  </v-list-tile>
                                </v-list>
                              </v-card>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </template>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
              <v-flex xs12>
                <v-expansion-panel popout>
                  <v-expansion-panel-content>
                    <div slot="header">
                      <div class="text-xs-left">
                        <!-- <v-chip color="blue lighten-1"> -->
                        <v-avatar v-if="avatar_afi">
                          <img :src="avatar_afi" :alt="afi.PNOMBRE">
                        </v-avatar>
                        {{afi.PNOMBRE}} {{afi.SNOMBRE}} {{afi.PAPELLIDO}} {{afi.SAPELLIDO}} {{edad_afi>=0?"("+edad_afi+")":""}}
                        <!-- </v-chip> -->
                      </div>
                    </div>
                    <v-card>
                      <template>
                        <v-container grid-list-md text-xs-center>
                          <v-layout row wrap>
                            <v-flex xs2 class="primary--text">Documento de Identidad:</v-flex>
                            <v-flex
                              xs2
                              class="text-xs-center"
                              elevation-1
                            >{{afi.TIPO_DOC+afi.DOCIDAFILIADO}}</v-flex>
                            <v-flex xs1 class="primary--text">Contactos:</v-flex>
                            <v-flex
                              xs7
                              class="text-xs-left"
                              elevation-1
                            >{{afi.EMAIL||""}} {{afi.CELULAR || ""}} {{afi.TELEFONORES || ""}}</v-flex>
                            <v-flex xs12></v-flex>
                            <v-flex xs1 class="primary--text">Domicilio:</v-flex>
                            <v-flex xs11 class="text-xs-left" elevation-1>
                              <!-- {{afi.DIRECCION}} - {{ciub.NOMBRE}} - {{ciu.NOMBRE}} - {{dep.NOMBRE}} -->
                              {{ciu.NOMBRE}} - {{dep.NOMBRE}}
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </template>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
            </v-layout>

            <!-- <h1>{{inprocess}} - {{aut.ESTADO}}</h1> -->
            <v-stepper alt-labels>
              <v-stepper-header>
                <v-stepper-step step="1" complete>Solicitada</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="2" :complete="(inprocess>1)" :rules="[()=>!(inprocess===2)]">
                  <div v-if="inprocess<=2">Por Verificar</div>
                  <div v-if="inprocess>2">Verificada</div>
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                  step="3"
                  :complete="(inprocess>3)"
                  :rules="[() => !(inprocess===3)]"
                >
                  <div v-if="inprocess===3">En Alistamiento</div>
                  <div v-else-if="inprocess>3">Alistado</div>
                  <div v-else>Por Alistar</div>
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                  step="4"
                  :complete="(inprocess>4)"
                  :rules="[() => !(inprocess===4)]"
                >
                  <div v-if="inprocess===4">En Despacho</div>
                  <div v-else-if="inprocess>4">Despachado</div>
                  <div v-else>Por Despachar</div>
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                  step="5"
                  :complete="(inprocess>5)"
                  :rules="[() => !(inprocess===5)]"
                >
                  <div v-if="inprocess===5">En Tránsito</div>
                  <div v-else-if="inprocess>5">Entregado</div>
                  <div v-else>Por Entregar</div>
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                  step="6"
                  :complete="(inprocess>6)"
                  :rules="[() => !(inprocess===6)]"
                >
                  <div v-if="inprocess===6">Por Recibir</div>
                  <div v-else-if="inprocess>6">Recibido</div>
                  <div v-else>Por Entregar</div>
                </v-stepper-step>
              </v-stepper-header>
            </v-stepper>

            <div>
              <v-btn color="primary">Aprobar</v-btn>
              <!-- <v-btn>Cancelar</v-btn> -->
            </div>
          </v-container>
        </v-scroll-y-transition>
      </template>

      <v-scroll-y-transition mode="out-in">
        <v-container grid-list-md text-xs-center v-if="!editar">
          <v-layout row wrap>
            <v-tooltip top>
              <v-btn slot="activator" @click="cancelar" fab small>
                <v-icon>undo</v-icon>
              </v-btn>
              <span>Regresar</span>
            </v-tooltip>
          </v-layout>
        </v-container>
      </v-scroll-y-transition>

      <v-scroll-y-transition mode="out-in">
        <v-container grid-list-md text-xs-center v-if="editar">
          <v-layout row wrap>
            <v-tooltip top>
              <v-btn slot="activator" @click="cancelar" fab small>
                <v-icon>undo</v-icon>
              </v-btn>
              <span>Cancelar</span>
            </v-tooltip>
          </v-layout>
        </v-container>
      </v-scroll-y-transition>
    </template>
  </tabla>
</template>
	<!-- <div>
		<v-btn color="success" :to="{name:'autorizacion_add'}">Nueva Autorización</v-btn>
	</div> -->

<script>
import { default as global_components } from "../../../../../../src/common/components/";
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    fila: {},
    filas: [],
    columnas: [],
    cargando_tabla: false,
    cargando: false,
    model: {
      IDAUT: undefined,
      NOAUT: undefined,
      FECHA: undefined,
      FECHAVENCE: undefined,
      FECHASOL: undefined,
      IDAFILIADO: undefined,
      NUMCARNET: undefined,
      IDPLAN: undefined,
      PREFIJO: undefined,
      IDSEDE: undefined,
      IDSEDEORIGEN: undefined,
      TIPOAUTORIZACION: undefined,
      ALTOCOSTO: undefined,
      ATENCION: undefined,
      URGENCIA: undefined,
      IMPUTABLE_A: undefined,
      IDSOLICITANTE: undefined,
      IDPROVEEDOR: undefined,
      ESTADO: undefined,
      CONSANULADO: undefined,
      IDOPERADORANULA: undefined,
      FECHAANULA: undefined,
      CAUSALANULA: undefined,
      NO_ITEMES: undefined,
      VALORTOTAL: undefined,
      VALORCOPAGO: undefined,
      VALORBENEFICIO: undefined,
      VALOREXEDENTE: undefined,
      VALORTOTALCOSTO: undefined,
      VALORCOPAGOCOSTO: undefined,
      IMPRESO: undefined,
      CXPGEN: undefined,
      CXCGEN: undefined,
      AUTORIZADOPOR: undefined,
      NUMAUTORIZA: undefined,
      FECHAAUTORIZA: undefined,
      AUTORIZADO: undefined,
      IDPESPECIAL: undefined,
      IDESTADOE: undefined,
      USUARIO: undefined,
      RECOBRARA: undefined,
      FUENTE: undefined,
      IDCAUSAEXT: undefined,
      AMBITO: undefined,
      FINALIDAD: undefined,
      PERSONAL_AT: undefined,
      DXPPAL: undefined,
      DXRELACIONADO: undefined,
      COMPLICACION: undefined,
      FORMAQX: undefined,
      TIPOURGENCIA: undefined,
      SPD: undefined,
      NORECIBOCAJA: undefined,
      CLASEORDEN: undefined,
      GENEROCAJA: undefined,
      IDCONTRATANTE: undefined,
      TIPOCOPAGO: undefined,
      PEDIDOINV: undefined,
      ENVIO: undefined,
      OBS: undefined,
      ESCONTINUACION: undefined,
      NOAUTORIGEN: undefined,
      SEMANASCOT: undefined,
      LIQUIDAPC: undefined,
      OBSDX: undefined,
      COMITE: undefined,
      CERTIFICACION: undefined,
      IDCLASEAUT: undefined,
      CLASECONT: undefined,
      ESDEINV: undefined,
      NOGENERACIONOPS: undefined,
      FECHAGEN: undefined,
      CNSAFIAA: undefined,
      PROCEDENCIA: undefined,
      IDAREAH: undefined,
      IDAREA: undefined,
      CCOSTO: undefined,
      SUBCCOSTO: undefined,
      NIVELATENCION: undefined,
      FACTURADA: undefined,
      N_FACTURA: undefined,
      CNSFCT: undefined,
      VFACTURAS: undefined,
      FACTURABLE: undefined,
      DESCUENTO: undefined,
      TIPODTO: undefined,
      MARCAFAC: undefined,
      IDIPS: undefined,
      CLASECONTRATO: undefined,
      ENPAQUETE: undefined,
      IDCIRUGIA: undefined,
      SOAT: undefined,
      NOADMISION: undefined,
      IDCONTRATO: undefined,
      RUBRO: undefined,
      CLASERUBRO: undefined,
      PERIODICIDAD: undefined,
      CNSFACT: undefined,
      CONTINUACION: undefined,
      VLRUTOTRA: undefined,
      TIPOCONT: undefined,
      DXRELACIONADO2: undefined,
      FECHACOMITE: undefined,
      IDALTERNA: undefined,
      MARCAENV: undefined,
      COPAGOPROPIO: undefined,
      CNSHACTRAN: undefined,
      ESDELAB: undefined,
      ENLAB: undefined,
      COBRARA: undefined,
      IDTERCEROCA: undefined,
      CONSECUTIVOHCA: undefined,
      RAZONANULACION: undefined,
      PIDECCOSTO: undefined,
      FECHAREALIZACION: undefined,
      CODCAJA: undefined,
      TIPOCAJA: undefined,
      IDGRUPOSER: undefined,
      PEXTERNA: undefined,
      AQUIENCOBRO: undefined,
      CODUNG: undefined,
      CODPRG: undefined,
      ITFC: undefined,
      CNSITFC: undefined,
      SYS_COMPUTERNAME: undefined,
      CNSLABCOR: undefined,
      TIPOUSUARIO: undefined,
      NOADMISIONCE: undefined,
      INDLABCORE: undefined,
      CERRADA: undefined,
      CONTABILIZADA: undefined,
      NROCOMPROBANTE: undefined,
      MARCACONT: undefined,
      SINCRONIZADO: undefined,
      IDPLAN_AFI: undefined,
      IDTERCERO_AFI: undefined,
      USUARIONOFACTURABLE: undefined,
      FECHA_NOFAC: undefined,
      RIESGO: undefined,
      IDSUCURSAL: undefined,
      CIUDAD: undefined,
      FUNCIONARIO_AUT: undefined
    },
    editar: false,
    registro: {},
    // -----------------------------------------------------------------
    aut: {},
    autd: [],
    auta: [],
    ips: {},
    eps: {},
    afi: {},
    pln: {},
    ciu: {},
    dep: {},
    ciub: {},
    confirmar: false
  }),
  mounted() {
    this.actualizarListado();
  },
  methods: {
    ...mapActions("kasis", ["setAfi"]),
    actualizarListado() {
      this.cargando_tabla = true;
      this.filas = [];
      this.columnas = [];
      this.$http
        .get("aut")
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
    cancelar() {
      this.$refs.tabla.cerrarDialog();
    },
    tipo_documento(tipodoc) {
      // console.log(this.docXTpo);
      return this.docXTpo.filter(function(el) {
        return el.CODIGO == tipodoc;
      })[0].DESCRIPCION;
    },
    descargar_archivo(archivo) {
      var url =
        this.ususu.URL_API.substr(0, this.ususu.URL_API.length) + archivo.URL;
      // url = url
      //   .replace("/", "\\")
      //   .replace("/", "\\")
      // url=`${this.ususu.URL_API}public/JOGERAV2/ComprobantePSE20180731065515.pdf`

      console.log(url);
      window.open(url);
      return;
      alert("");
      this.cargando = true;
      this.$http
        .get(`auta/descargar/${archivo.IDAUTA}`)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          this.cargando = false;
        });
    }
  },
  components: {
    Tabla: global_components.DataTabla
  },
  watch: {
    fila() {
      // console.log(this.fila);
      this.cargando = true;
      this.afi.PNOMBRE = "";
      this.$http
        .get(`aut/completa/${this.fila.IDAUT}`)
        .then(res => {
          var aut = res.result;
          console.log(aut);
          this.aut = aut.AUT;
          this.auta = aut.AUTA;
          this.autd = aut.AUTD;
          this.ips = aut.IPS;
          this.eps = aut.EPS;
          this.ciu = aut.CIU;
          this.dep = aut.DEP;
          this.afi = aut.AFI;
          this.ciub = aut.CIUB;
          this.setAfi(this.afi);
        })
        .catch(err => {
          this.error = true;
          console.log(err);
        })
        .then(() => {
          this.cargando = false;
        });
    }
  },
  computed: {
    ...mapGetters("kasis", ["edad_afi", "avatar_afi"]),
    ...mapGetters("krycnf", ["docXTpo"]),
    ...mapGetters("kseg", ["ususu"]),
    avatar_aut() {
      var avatar =
        "../../../../../../src/assets/images/medical/Medical Invoice 3D Warning .ico";
      return avatar;
    },
    color_aut() {
      var color = "amber lighten-2";
      return color;
    },
    progreso() {
      var progreso = 20;
      progreso = this.inprocess * 10 + 10;
      if (this.inprocess > 6) progreso = 100;
      return progreso;
    },
    color_progreso() {
      var color = "red lighten-1";
      // if (this.progreso > 20 && this.progreso <= 30) color = "blue-grey lighten-3";
      if (this.progreso > 20 && this.progreso <= 30) color = "deep-orange";
      if (this.progreso > 30 && this.progreso <= 40) color = "amber lighten-1";
      if (this.progreso > 40 && this.progreso <= 50) color = "lime";
      if (this.progreso > 50 && this.progreso <= 60)
        color = "light-green lighten-2";
      if (this.progreso > 60 && this.progreso <= 70) color = "green accent-4";
      if (this.progreso > 70) color = "green darken-4";
      return color;
    },
    inprocess() {
      var inprocess = 0;
      switch (this.aut.ESTADO.toUpperCase()) {
        case "SOLICITADA": {
          inprocess = 2;
          break;
        }
        case "AUTORIZADA": {
          inprocess = 3;
          break;
        }
        case "ALISTADA": {
          inprocess = 4;
          break;
        }
        case "DESPACHADA": {
          inprocess = 5;
          break;
        }
        case "ENTREGADA": {
          inprocess = 6;
          break;
        }
        case "RECIBIDO": {
          inprocess = 7; // Por Devolver
          break;
        }
        default: {
          inprocess = 1;
        }
      }
      return inprocess;
    }
  }
};
</script>

<style>
</style>
