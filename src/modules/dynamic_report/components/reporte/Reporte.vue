<template>
  <!-- <v-layout justify-center align-center> -->
    <div>
      <v-layout justify-center align-center>
        <h1>{{reporte.Id}}.- {{reporte.Nombre}}</h1>
      </v-layout>
      <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1" color="amber">
          Filtros
          <small>Elija los filtros de su indicador, si su indicador no posee filtros omita éste paso</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-layout row wrap>
              <v-flex xs12 sm6 md4 v-for="(par, index) in parametros" :key="index">
                <alfanumerico v-if="par.UTILIZAQUERY===0 && (par.PARAMETRO_TIPO.trim()==='Alfanumerico' || par.PARAMETRO_TIPO.trim()==='Numerico' )" :parametro="par"></alfanumerico>
                <!-- <numerico v-if="par.PARAMETRO_TIPO.trim()==='Numerico'"></numerico> -->
                <fecha :parametro="par" v-if="par.PARAMETRO_TIPO.trim()==='Fecha'"></fecha>
                <seleccion v-if="par.UTILIZAQUERY===1" :parametro="par"></seleccion>
              </v-flex>
              <v-spacer></v-spacer>
          </v-layout>

          <v-btn color="amber" @click="e6 = 2;">Siguiente</v-btn>
          <v-btn flat v-on:click.prevent="$router.go(-1)">Cancelar</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2"  color="amber">Resultados del Indicador</v-stepper-step>

        <v-stepper-content step="2">
          
          <resultados v-if="e6===2"></resultados>

          <v-btn color="amber" @click="e6 = 3">Siguiente</v-btn>
          <v-btn flat v-on:click.prevent="e6=1">Regresar</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 3" step="3" color="amber">Exportar Resultados</v-stepper-step>

        <v-stepper-content step="3">
          <!-- <v-card color="grey lighten-1" class="mb-5 elevation-1" height="80px"> -->
            <v-btn color="success" @click="exportarExcel">Descargar Excel</v-btn>

          <!-- </v-card> -->
          <v-btn color="amber" @click="e6 = 1">Volver a Inicio</v-btn>
          <v-btn flat v-on:click.prevent="e6=2">Regresar</v-btn>
        </v-stepper-content>

        <v-stepper-step step="4" v-show="false">View setup instructions</v-stepper-step>
          <v-stepper-content step="4" v-show="false">
            <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
            <v-btn color="amber" @click="e6 = 1">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
          </v-stepper-content>
        </v-stepper>
    </div>

  <!-- </v-layout> -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { default as components } from "../";
export default {
  data: () => ({
    e6: 1,
    parametros: [],
    monthNames: [
      "Enerto",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ],
    dayOfWeekNames: [
      "Domingo",
      "Lunes",
      "Marte",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado"
    ]
  }),
  beforeMount() {
    // console.log("Reporte: ", this.reporte);
    if (!this.reporte.Id) {
      this.$router.push({ name: "consultas" });
    }
  },
  mounted() {
    // console.log(this.reporte);
    this.cargarParametros();
  },
  computed: {
    ...mapGetters("dynamic_report", ["reporte", "dataReport"]),
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },
  watch: {
    e6() {},
    parametros() {
      // console.log("Parámetros: ", this.parametros);
    }
  },
  components: {
    Alfanumerico: components.Alfanumerico,
    Numerico: components.Numerico,
    Fecha: components.Fecha,
    Seleccion: components.Seleccion,
    Resultados: components.Resultados
  },
  methods: {
    ...mapActions("dynamic_report", ["setParamReport"]),
    cargarParametros() {
      if (!this.reporte.Id) return;
      this.$http
        .get(`evo_exportacion/parametros/${this.reporte.Id}`)
        .then(res => {
          this.parametros = res.result.recordset;
          this.parametros.forEach(parametro => {
            if (parametro.PARAMETRO_TIPO.trim() === "Fecha") {
              parametro.menu = false;
            }
          });
          this.setParamReport(this.parametros);
          // console.log("Parámetros: ", this.parametros);
        })
        .catch(err => {
          console.log(err);
        })
    },
    exportarExcel() {
      String.prototype.replaceLatinChar = function() {
        var output = undefined;
        return (output = this.replace(/á|é|í|ó|ú|ñ|ä|ë|ï|ö|ü/gi, function(
          str,
          offset,
          s
        ) {
          var str =
            str == "á"
              ? "&aacute;"
              : str == "é"
                ? "&eacute;"
                : str == "í"
                  ? "&iacute;"
                  : str == "ó"
                    ? "&oacute;"
                    : str == "ú"
                      ? "&uacute;"
                      : str == "ñ"
                        ? "&ntilde;"
                        : str;
          str =
            str == "Á"
              ? "&Aacute;"
              : str == "É"
                ? "&Eacute;"
                : str == "Í"
                  ? "&Iacute;"
                  : str == "Ó"
                    ? "&Oacute;"
                    : str == "Ú"
                      ? "&Uacute;"
                      : str == "Ñ"
                        ? "&Ntilde;"
                        : str;
          str =
            str == "Á"
              ? "&Aacute;"
              : str == "É"
                ? "&Eacute;"
                : str == "Í"
                  ? "&Iacute;"
                  : str == "Ó"
                    ? "&Oacute;"
                    : str == "Ú"
                      ? "&Uacute;"
                      : str == "Ñ"
                        ? "&Ntilde;"
                        : str;
          str =
            str == "ä"
              ? "&auml;"
              : str == "ë"
                ? "&euml;"
                : str == "ï"
                  ? "&iuml;"
                  : str == "ö"
                    ? "&ouml;"
                    : str == "ü"
                      ? "&uuml;"
                      : str;
          str =
            str == "Ä"
              ? "&Auml;"
              : str == "Ë"
                ? "&Euml;"
                : str == "Ï"
                  ? "&Iuml;"
                  : str == "Ö"
                    ? "&Ouml;"
                    : str == "Ü"
                      ? "&Uuml;"
                      : str;
          return str;
        }));
      };
      const columnas = Object.keys(this.dataReport[0]);
      var j = 0;
      var tab_text = "<table border='2px'>";
      tab_text = tab_text + "<tr bgcolor='#FFC107'>";
      columnas.forEach(titulo => {
        tab_text = tab_text + "<th>" + titulo + "</th>";
      });
      tab_text = tab_text + "</tr>";
      // #endregion
      for (var i = 0; i < this.dataReport.length; i++) {
        tab_text = tab_text + "<tr>";
        columnas.forEach(columna => {
          tab_text = tab_text + "<td>";
          var campo = this.dataReport[i][columna];

          if (isNaN(campo) && !isNaN(Date.parse(campo))) {
            campo = this.formatDate(new Date(campo), "yyyy-MM-dd HH:mm:ss");
          } else {
            if (!campo) {
              campo = "";
            } else {
              campo = campo.toString().replaceLatinChar();
            }
          }
          tab_text = tab_text + campo;
          tab_text = tab_text + "</td>";
        });
        tab_text = tab_text + "</tr>";
      }
      tab_text = tab_text + "</table>";
      if (true) {
        var element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:application/vnd.ms-excel, " + encodeURIComponent(tab_text)
        );
        element.setAttribute("download", this.reporte.Nombre);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      } else {
        var uri = "data:application/vnd.ms-excel;base64,",
          template =
            '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
          base64 = function(s) {
            return window.btoa(unescape(encodeURIComponent(s)));
          },
          format = function(s, c) {
            return s.replace(/{(\w+)}/g, function(m, p) {
              return c[p];
            });
          };
        return function(table, name) {
          if (!table.nodeType) table = document.getElementById(table);
          var ctx = { worksheet: name || "Worksheet", table: table.innerHTML };
          window.location.href = uri + base64(format(template, ctx));
        };
      }
    },

    formatDate(date, patternStr) {
      if (!patternStr) {
        patternStr = "dd/mm/yyyy";
      }
      var day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
        miliseconds = date.getMilliseconds(),
        h = hour % 12,
        hh = this.twoDigitPad(h),
        HH = this.twoDigitPad(hour),
        mm = this.twoDigitPad(minute),
        ss = this.twoDigitPad(second),
        aaa = hour < 12 ? "AM" : "PM",
        EEEE = this.dayOfWeekNames[date.getDay()],
        EEE = EEEE.substr(0, 3),
        dd = this.twoDigitPad(day),
        M = month + 1,
        MM = this.twoDigitPad(M),
        MMMM = this.monthNames[month],
        MMM = MMMM.substr(0, 3),
        yyyy = year + "",
        yy = yyyy.substr(2, 2);
      return patternStr
        .replace("hh", hh)
        .replace("h", h)
        .replace("HH", HH)
        .replace("H", hour)
        .replace("mm", mm)
        .replace("m", minute)
        .replace("ss", ss)
        .replace("s", second)
        .replace("S", miliseconds)
        .replace("dd", dd)
        .replace("d", day)
        .replace("MMMM", MMMM)
        .replace("MMM", MMM)
        .replace("MM", MM)
        .replace("M", M)
        .replace("EEEE", EEEE)
        .replace("EEE", EEE)
        .replace("yyyy", yyyy)
        .replace("yy", yy)
        .replace("aaa", aaa);
    },
    twoDigitPad(num) {
      return num < 10 ? "0" + num : num;
    }
  }
};
</script>

<style>
</style>
