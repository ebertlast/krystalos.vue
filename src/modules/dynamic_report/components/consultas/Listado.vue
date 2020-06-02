<template>
  <div>
    <!-- <v-layout justify-center align-center> -->
      <!-- <v-card class="elevation-1"> -->
        <v-card-title>
        <v-progress-linear slot="progress" color="amber" indeterminate v-show="cargando"></v-progress-linear>
          Reportes
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Buscar"
            single-line
            hide-details
            
          ></v-text-field>
        </v-card-title>

        <v-data-table
          class=""
          :headers="headers"
          :items="reportes"
          :search="search"
          :rows-per-page-text="rows_per_page_text"
          no-data-text="La consulta no ha generado resultados"
          :rows-per-page-items=rows_per_page_items
        >
          <template slot="items" slot-scope="props">
            <td @click="cargarReporte(props.item)" style="cursor:pointer">{{ props.item.Id }}</td>
            <td class="text-xs-left" @click="cargarReporte(props.item)" style="cursor:pointer">{{ props.item.Nombre }}</td>
            <td class="text-xs-center">{{ props.item.Usuario }}</td>
            <!-- <td class="text-xs-right">{{ props.item.carbs }}</td> -->
            <!-- <td class="text-xs-right">{{ props.item.protein }}</td> -->
            <!-- <td class="text-xs-right">{{ props.item.iron }}</td> -->
            <td class="justify-center layout px-0">
              <!-- <v-icon
                small
                class="mr-2"
                @click="cargarReporte(props.item)"
              >
                view_list
              </v-icon> -->
                <!-- v-if="(ususu.GRUPO === 'PPAL')" -->
              <!-- <v-icon
                v-if="(ususu.GRUPO === 'PPAL')"
                class="mr-2"
                @click="configurarReporte(props.item)"
              >
                settings
              </v-icon> -->
              <v-btn v-if="(ususu.GRUPO === 'PPAL')" @click="configurarReporte(props.item)">Corregir</v-btn>
            </td>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Su búsqueda para "{{ search }}" no encontró resultados.
          </v-alert>
          <template slot="pageText" slot-scope="props">
            Líneas {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
          </template>
        </v-data-table>
      <!-- </v-card> -->
    <!-- </v-layout> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({
    cargando: false,
    // reportes: [],
    search: "",
    rows_per_page_text: "Filas por Página:",
    rows_per_page_items: [5, 10, 25, 50, 100, { text: "Todo", value: -1 }],
    headers: [
      {
        text: "Identificador",
        align: "left",
        sortable: true,
        value: "Id"
      },
      { text: "Nombre", value: "Nombre", sortable: true },
      { text: "Desarrollado Por", value: "Usuario", sortable: true },
      { text: "", sortable: false }
      // { text: "Carbs (g)", value: "carbs" },
      // { text: "Protein (g)", value: "protein" },
      // { text: "Iron (%)", value: "iron" }
    ],
    regitros: []
  }),
  mounted() {
    if (!this.reportes || this.reportes.length <= 0) {
      this.consultar_reportes();
    }
  },
  methods: {
    ...mapMutations("dynamic_report", ["setReporte", "setReportes"]),
    consultar_reportes() {
      this.cargando = true;
      this.$http
        .get(`evo_exportacion/${this.ususu.USUARIO}/`)
        .then(res => {
          this.setReportes(res.result.recordset);
        }).then(()=>{
          this.cargando = false;
        })
        .catch(err => {
          this.cargando = false;
          console.log(err);
        })
    },
    customFilter(items, search, filter) {
      search = search.toString().toLowerCase();
      // for (var key in filter) {
      //   console.log("Ebert: ", key);
      // }
      // return items.filter(function(item) {
      //   for (var key in filter) {
      //     console.log(key);
      //     if (item[key] === undefined || item[key] != filter[key]) return false;
      //   }
      //   return true;
      // });
      return items.filter(row => filter(row["Nombre"], search));
    },
    cargarReporte(reporte) {
      this.setReporte(reporte);
      this.$router.push({ name: "reporte" });
      // console.log(reporte);
    },
    configurarReporte(reporte) {
      this.setReporte(reporte);
      this.$router.push({ name: "configuracion" });
      // console.log(reporte);
    }
  },
  computed: {
    // ...mapGetters(["kseg/ususu", "dynamic_report/reportes"])
    ...mapGetters("kseg", ["ususu"]),
    ...mapGetters("dynamic_report", ["reportes"])
  }
};
</script>

<style>
</style>
