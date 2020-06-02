<template>
  <v-container style="max-width: 80%;">
    <v-timeline dense clipped>
      <!-- <v-timeline-item fill-dot class="white--text mb-5" color="orange" large>
        <template v-slot:icon>
          <span>JL</span>
        </template>
      </v-timeline-item>-->
      <v-slide-x-transition group>
        <v-timeline-item
          v-for="(e, i) in eventos"
          :key="i"
          class="mb-3"
          :color="e.color"
          small
          :hide-dot="(!e.linea)?false:true"
        >
          <v-layout justify-space-between v-if="!e.linea">
            <v-flex xs7>
              {{e.descripcion}}
              <v-btn
                flat
                icon
                :color="b.color"
                v-for="(b, index) in e.botones"
                :key="index"
                v-on:click="b.click"
              >
                <v-icon>{{b.icono}}</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs5 text-xs-right v-text="e.fecha"></v-flex>
          </v-layout>
          <span v-else>{{e.linea}}</span>
        </v-timeline-item>
      </v-slide-x-transition>
    </v-timeline>

    <div id="datos_impresion" v-show="false" v-if="aut && afi">
      <table border="0">
        <tr>
          <th colspan="20">
            <h1>Autorización {{aut.NOAUT}}</h1>
          </th>
        </tr>
        <tr>
          <th colspan="2" align="right">Consecutivo:</th>
          <td colspan="10">{{aut.IDAUT}}</td>
        </tr>
        <tr>
          <th colspan="2" align="right">Paciente:</th>
          <td
            colspan="10"
          >{{afi.TIPO_DOC+afi.DOCIDAFILIADO}} {{(afi)?afi.PNOMBRE:""}} {{afi.SNOMBRE}} {{afi.PAPELLIDO}} {{afi.SAPELLIDO}}</td>
        </tr>
        <tr>
          <th colspan="2" align="right">Contactos:</th>
          <td colspan="10">{{afi.EMAIL||""}} {{afi.CELULAR || ""}} {{afi.TELEFONORES || ""}}</td>
        </tr>
        <tr>
          <th colspan="2" align="right">Dirección de Envío:</th>
          <td colspan="10">{{ciu.NOMBRE}} - {{dep.NOMBRE}} - {{aut.DIRECCION}}</td>
        </tr>
        <tr>
          <th colspan="2" align="right">EPS:</th>
          <td colspan="10">{{aut.EPS || ""}}</td>
        </tr>
        <tr>
          <th colspan="2" align="right">IPS:</th>
          <td colspan="10">{{aut.IPS || ""}}</td>
        </tr>
        <tr>
          <th colspan="2" align="right">Contratante:</th>
          <td colspan="10">{{aut.CONTRATANTE || ""}}</td>
        </tr>
        <tr>
          <th colspan="20">
            <hr>
            <h2>Artículos</h2>
            <hr>
          </th>
        </tr>
        <tr>
          <th>Cantidad</th>
          <th colspan="10">Descripción</th>
        </tr>
        <template>
          <div v-for="item in autd" :key="item.NO_ITEM" border="1">
            <tr>
              <td style="text-align:center">{{item.CANTIDAD}}</td>
              <td colspan="10">
                <p>{{item.DESCSERVICIO}}</p>
                <p v-if="item.COMENTARIOS && item.COMENTARIOS!==''" style="font-style: italic;">
                  <b>{{item.COMENTARIOS}}</b>
                </p>
              </td>
            </tr>
            <tr>
              <th colspan="20">
                <hr>
              </th>
            </tr>
          </div>
        </template>
        <tr>
          <td colspan="20">
            <h2>Observaciones</h2>
            <p v-if="aut.OBS && aut.OBS!==''">{{aut.OBS}}</p>
            <p>Ésta autorización tiene como soporte {{auta.length}} archivo{{(auta.length>1)?"s":""}} correspondiente{{(auta.length>1)?"s":""}} a {{archivos_adjuntos}} respectivamente.</p>
            <hr>
          </td>
        </tr>
        <tr>
          <td colspan="20" alig="left"></td>
        </tr>
        <tr>
          <td
            colspan="20"
            align="right"
          >Impreso por ({{ususu.USUARIO}}) {{ususu.NOMBRE}} - {{new Date().toLocaleString()}}</td>
        </tr>
      </table>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  props: ["autorizacion"],
  data: () => ({
    events: [],
    input: null,
    nonce: 0
  }),

  computed: {
    ...mapGetters("kseg", ["ususu"]),
    timeline() {
      return this.events.slice().reverse();
    },
    afi() {
      if (!this.autorizacion || !this.autorizacion.AFI) {
        return undefined;
      }
      return this.autorizacion.AFI;
    },
    aut() {
      if (!this.autorizacion || !this.autorizacion.AUT) {
        return undefined;
      }
      return this.autorizacion.AUT;
    },
    ciu() {
      if (!this.autorizacion || !this.autorizacion.CIU) {
        return undefined;
      }
      return this.autorizacion.CIU;
    },
    dep() {
      if (!this.autorizacion || !this.autorizacion.DEP) {
        return undefined;
      }
      return this.autorizacion.DEP;
    },
    autd() {
      if (!this.autorizacion || !this.autorizacion.AUTD) {
        return undefined;
      }
      return this.autorizacion.AUTD;
    },
    auta() {
      if (!this.autorizacion || !this.autorizacion.AUTA) {
        return undefined;
      }
      return this.autorizacion.AUTA;
    },
    imov() {
      if (!this.autorizacion || !this.autorizacion.IMOV) {
        return undefined;
      }
      return this.autorizacion.IMOV;
    },
    imov() {
      if (!this.autorizacion || !this.autorizacion.IMOV) {
        return undefined;
      }
      return this.autorizacion.IMOV;
    },
    izsolnot() {
      if (!this.autorizacion || !this.autorizacion.IZSOLNOT) {
        return undefined;
      }
      return this.autorizacion.IZSOLNOT;
    },
    ips() {
      if (!this.autorizacion || !this.autorizacion.IPS) {
        return undefined;
      }
      return this.autorizacion.IPS;
    },
    archivos_adjuntos() {
      var nombres = "";
      this.auta.forEach(el => {
        nombres += el.DESCRIPCION + ", ";
      });
      nombres = nombres.substring(0, nombres.length - 2);
      return nombres;
    },
    eventos() {
      var eventos = [];
      var botones = [];

      eventos.push({ linea: "Comentarios" });
      for (let i = this.izsolnot.length - 1; i >= 0; i--) {
        const izsolnot = this.izsolnot[i];
        eventos.push({
          descripcion: `${izsolnot.NOMBRE}:  ${izsolnot.OBSERVACION}.`,
          fecha: moment(izsolnot.FECHA).format("DD MMMM YYYY"),
          fecha_sin_formato: izsolnot.FECHA
        });
      }
      eventos.push({ linea: "Eventualidades" });

      for (let i = this.imov.length - 1; i >= 0; i--) {
        const imov = this.imov[i];

        if (imov.ESTADO * 1 < 2) {
          /** 0: Pendiente, 1: Confirmado, 2: Anulado */

          if (imov.NROGUIA) {
            eventos.push({
              descripcion: `${imov.USUARIOENVIA} envía artículos por ${
                imov.CARRIER
              } con número de guía ${imov.NROGUIA} ($${imov.VLRENVIA}) a ${
                this.ciu.NOMBRE
              } - ${this.aut.DIRECCION}`,
              fecha: moment(imov.F_ENVIA).format("DD MMMM YYYY"),
              fecha_sin_formato: imov.F_ENVIA,
              color: "red"
            });
          }

          switch (imov.ESTADO * 1) {
            case 0:
              eventos.push({
                descripcion: `Artículos solicitados por ${
                  imov.SOLICITANTE
                } en alistamiento por ${imov.FUNCIONARIO}`,
                fecha: moment(imov.FECHAMOV).format("DD MMMM YYYY"),
                fecha_sin_formato: imov.FECHAMOV
              });
              break;
            default:
              eventos.push({
                descripcion: `Artículos solicitados por ${
                  imov.SOLICITANTE
                } alistados por ${
                  imov.FUNCIONARIO
                } y listos para ser enviados a ${this.ciu.NOMBRE} - ${
                  this.aut.DIRECCION
                }`,
                fecha: moment(imov.FECHAMOV).format("DD MMMM YYYY"),
                fecha_sin_formato: imov.FECHAMOV,
                color: "green"
              });
              break;
          }
        }
      }

      eventos.push({
        fecha_sin_formato: this.aut.FECHAGEN,
        descripcion: `Transcripción de la solicitud en el sistema por ${
          this.aut.TRANSCRIPTOR
        }.`,
        fecha: moment(this.aut.FECHAGEN).format("DD MMMM YYYY"),
        color: "green",
        botones: [
          {
            icono: "print",
            click: () => {
              this.imprimir("datos_impresion");
            }
          }
        ]
      });

      botones = [];
      for (let i = 0; i < this.auta.length; i++) {
        const archivo = this.auta[i];
        botones.push({
          icono: "attach_file",
          click: () => {
            this.descargar_archivo(archivo);
          }
        });
      }
      eventos.push({
        fecha_sin_formato: this.aut.FECHAGEN,
        descripcion: "Autorización recibida",
        fecha: moment(this.aut.FECHAGEN).format("DD MMMM YYYY, HH:mm"),
        color: "green",
        botones
      });

      eventos.push({
        fecha_sin_formato: this.aut.FECHAREALIZACION,
        descripcion: `Atención de ${this.afi.NOMBREAFI} de ${this.aut.EPS} en ${
          this.ips.RAZONSOCIAL
        }.`,
        fecha: moment(this.aut.FECHAREALIZACION).format("DD MMMM YYYY"),
        color: "green"
      });
      return eventos;
    }
  },
  mounted() {
    // console.log("Autorización: ", this.aut);
    // console.log("Afiliado: ", this.afi);
    // console.log("Usuario: ", this.ususu);
    // console.log("Ciudad: ", this.ciu);
    // console.log("Departamento: ", this.dep);
    // console.log("Archivos Adjuntos: ", this.auta);
  },
  methods: {
    comment() {
      const time = new Date().toTimeString();
      this.events.push({
        id: this.nonce++,
        text: this.input,
        time: time.replace(
          /:\d{2}\sGMT-\d{4}\s\((.*)\)/,
          (match, contents, offset) => {
            return ` ${contents
              .split(" ")
              .map(v => v.charAt(0))
              .join("")}`;
          }
        )
      });

      this.input = null;
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
    }
  }
};
</script>