<template>
  <v-form v-model="valid">
    
    <v-text-field
      v-model="Evo_Exportacion.Nombre"
      :rules="nombre_rol"
      :counter="49"
      label="Nombre"
      required
      color="amber"
    ></v-text-field>
    <p style="color: gray">Query</p>
    <hr>
    <codemirror v-model="Evo_Exportacion.Query" :options="cmOption" ></codemirror>
    <hr>
     <v-list two-line>
          <template v-for="(item, index) in parametros">
            <v-subheader
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-if="item.divider"
              :inset="item.inset"
              :key="index"
            ></v-divider>

            <v-list-tile
              v-else
              :key="item.title"
              avatar
            >
              <!-- <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar> -->

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
  </v-form>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/sql/sql.js";
import "codemirror/theme/solarized.css";

export default {
  data: () => ({
    valid: false,
    nombre_rol: [
      v => !!v || "Nombre es requerido",
      v =>
        (v && v.length <= 49) ||
        "La capacidad máxima del nombre es de 49 carateres"
    ],
    Evo_Exportacion: {
      Id: "",
      Usuario: "",
      Nombre: "",
      Archivo_Sql: "",
      Nombre_Archivo_exportar: "",
      Query: "",
      TipoFormatoCol: "",
      grupo: "",
      IMAGEN: "",
      TITULO1: "",
      TITULO2: "",
      procedimiento: "",
      QUERY1: ""
    },
    cmOption: {
      tabSize: 4,
      styleActiveLine: true,
      lineNumbers: true,
      line: true,
      mode: "text/x-mysql",
      theme: "solarized light"
    },
    parametros: [],
    items: [
      { header: "Parámetros" },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Brunch this weekend?",
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Oui oui",
        subtitle:
          "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
      }
    ]
  }),
  mounted() {
    console.log("Reporte: ", this.reporte);
    this.Evo_Exportacion = this.reporte;
    this.cargarParametros();
  },
  computed: {
    ...mapGetters("dynamic_report", ["reporte"])
  },
  components: {
    codemirror
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
          console.log("Parámetros: ", this.parametros);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
