<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 v-if="false">
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
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs12 v-show="cargando">
                    <template>
                      <v-progress-linear :indeterminate="true" height="2"></v-progress-linear>
                    </template>
                  </v-flex>
                  <v-flex xs12 v-if="aut_completa">
                    <timeline :autorizacion="aut_completa"></timeline>
                  </v-flex>
                  <v-flex xs12>
                    <v-btn
                      dark
                      large
                      color="red"
                      v-if="aut && aut.ESTADO==='Solicitada'"
                      @click="dialogNoProcesar=true"
                    >
                      <!-- <v-icon dark>edit</v-icon> -->
                      No Procesar
                    </v-btn>
                    <!-- fab -->
                    <v-btn
                      dark
                      large
                      color="cyan"
                      v-if="aut && aut.ESTADO==='Solicitada'"
                      @click="editarSolicitud"
                    >
                      EDITAR
                      <!-- <v-icon dark>edit</v-icon> -->
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </template>
          </template>
        </tabla>
      </v-flex>
      <v-flex xs12>
        <TableServerSide :columnas="columnas"
          :filas="filas"
          :loading="cargando_tabla"
          @fila="fila=$event;"
          titulo="Autorizaciones"
          ref="tabla"
          @agregar="$router.push({name:'autorizacion_add'})">
            <template slot="detalles">
            <template>
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs12 v-show="cargando">
                    <template>
                      <v-progress-linear :indeterminate="true" height="2"></v-progress-linear>
                    </template>
                  </v-flex>
                  <v-flex xs12 v-if="aut_completa">
                    <timeline :autorizacion="aut_completa"></timeline>
                  </v-flex>
                  <v-flex xs12>
                    <v-btn
                      dark
                      large
                      color="red"
                      v-if="aut && aut.ESTADO==='Solicitada'"
                      @click="dialogNoProcesar=true"
                    >
                      <!-- <v-icon dark>edit</v-icon> -->
                      No Procesar
                    </v-btn>
                    <!-- fab -->
                    <v-btn
                      dark
                      large
                      color="cyan"
                      v-if="aut && aut.ESTADO==='Solicitada'"
                      @click="editarSolicitud"
                    >
                      EDITAR
                      <!-- <v-icon dark>edit</v-icon> -->
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </template>
          </template>
          </TableServerSide>
      </v-flex>
    </v-layout>
    <template>
      <v-layout row justify-center>
        <v-dialog v-model="dialogNoProcesar" persistent max-width="500">
          <v-card>
            <v-card-title class="headline">¿Confirma que desea anular ésta autorización?</v-card-title>
            <v-card-text>Se actualizará el estado de ésta autorización a Negada.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="dialogNoProcesar = false">Cancelar</v-btn>
              <v-btn color="green darken-1" flat @click="noProcesar">Aceptar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
    <template>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs2>
            <v-card color="red lighten-4">
              <v-card-text class="px-0 title">Solicitada</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card color="lime lighten-3">
              <v-card-text class="px-0 title">Autorizada</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card color="light-green lighten-3">
              <v-card-text class="px-0 title">Alistada</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card color="blue-grey lighten-5">
              <v-card-text class="px-0 title">Despachada</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card color="green lighten-5">
              <v-card-text class="px-0 title">Entregada</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card color="">
              <v-card-text class="px-0 title">Anulada</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
  </v-container>
</template>

<script>
import { default as global_components } from "../../../../../../src/common/components/";
import { default as local_components } from "../../";

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
    aut_completa: undefined,
    autd: [],
    auta: [],
    ips: {},
    eps: {},
    afi: {},
    pln: {},
    ciu: {},
    dep: {},
    ciub: {},
    confirmar: false,
    dialogNoProcesar: false,
    // -----------------------------------------------------------------
  }),
  mounted() {
    this.actualizarListado();
  },
  methods: {
    ...mapActions(["setAlert", "notificacion", "setAutEditar"]),
    ...mapActions("kasis", ["setAfi"]),
    // ...mapActions("klog", ["setAutEditar"]),
    actualizarListado() {
      return;
      this.cargando_tabla = true;
      this.filas = [];
      this.columnas = [];
      this.$http
        .get("aut")
        .then(res => {
          this.filas = res.result.recordset;
          this.filas.forEach(fila => {
            var _class = "";
            switch (fila.ESTADO.toLowerCase()) {
              case "solicitada":
                _class = "red lighten-4";
                break;
              case "autorizada":
                _class = "lime lighten-3";
                break;
              case "alistada": {
                _class = "light-green lighten-3";
                break;
              }
              case "despachada": {
                _class = "blue-grey lighten-5";
                break;
              }
              case "entregado": {
                _class = "green lighten-5";
                break;
              }
              case "recibido": {
                _class = "";
                break;
              }
              default:
                _class = "";
            }
            fila.class = `text-xs-left ${_class}`;
          });
          this.columnas = [];
          Object.keys(this.filas[0]).forEach(col => {
            if (col !== "class")
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

      // console.log(url);
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
    },
    imprimir(idDiv) {
      var prtContent = document.getElementById(idDiv);
      var WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
      );
      WinPrint.document.write(prtContent.innerHTML);
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    },
    confirmar_autorizacion() {
      this.cargando = true;
      this.$http
        .get(`aut/confirmar/${this.aut.IDAUT}`)
        .then(res => {
          if (res.success) {
            this.aut.ESTADO = "Autorizada";
            this.notificacion({
              message: "Autorización autorizada para ser Despachada",
              type: "success"
            });
          } else {
            this.notificacion({
              message: "Problemas al confirmar la autorización",
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
    },
    editarSolicitud() {
      this.$refs.tabla.cerrarDialog();
      this.setAutEditar(this.aut_completa);
      this.$router.push({ name: "autorizacion_add" });
    },
    noProcesar() {
      this.dialogNoProcesar = false;
      this.cargando = true;
      this.$http
        .post(`aut/no_procesar/${this.aut.IDAUT}`)
        .then(res => {
          if (res.success) {
            // console.log(res);
            this.actualizarListado();
            this.$refs.tabla.cerrarDialog();
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
  components: {
    Tabla: global_components.DataTabla,
    Timeline: local_components.Timeline,
    TableServerSide: global_components.TableServerSide
  },
  watch: {
    fila() {
      // console.log(this.fila);
      this.cargando = true;
      if (this.afi) {
        this.afi.PNOMBRE = "";
      }
      this.aut = undefined;
      this.aut_completa = undefined;
      this.auta = undefined;
      this.autd = undefined;
      this.ips = undefined;
      this.eps = undefined;
      this.ciu = undefined;
      this.dep = undefined;
      this.afi = undefined;
      this.ciub = undefined;
      this.setAutEditar(undefined);
      this.$http
        .get(`aut/completa/${this.fila.IDAUT}`)
        .then(res => {
          var aut = res.result;
          // console.log(aut);
          // this.$refs.tabla.cerrarDialog();
          // return;
          this.aut_completa = aut;
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
          console.log(this.aut_completa);
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
          inprocess = 7; // Por definir estado RECIBIDO por el Paciente
          break;
        }
        case "RECIBIDO": {
          inprocess = 7; // Por Devolver
          break;
        }
        case "NOPROCESADA": {
          inprocess = 0; // Por Devolver
          break;
        }
        default: {
          inprocess = 1;
        }
      }
      return inprocess;
    },
    archivos_adjuntos() {
      var nombres = "";
      this.auta.forEach(el => {
        nombres += el.DESCRIPCION + ", ";
      });
      nombres = nombres.substring(0, nombres.length - 2);
      return nombres;
    }
  }
};
</script>

<style>
</style>
