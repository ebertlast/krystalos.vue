<template>
  <div>
    <v-progress-linear slot="progress" color="amber" indeterminate v-show="cargando"></v-progress-linear>
    <v-card>
      <v-card-title>
        {{reporte.Nombre}}
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
        :headers="headers"
        :items="rows"
        :search="search"
        no-data-text="La consulta no ha generado resultados"
        rows-per-page-text="Filas por página:"
        :rows-per-page-items=rows_per_page_items

      >
        <template slot="items" slot-scope="props">
          <!-- <td v-for="(item, index) in items" :key="index">{{ index }}</td> -->
          <!-- <td class="text-xs-right" v-for="(item, index) in props" :key="index">
            {{ item[Object.keys(item)[0]] }}
          </td> -->
          
          <td class="text-xs-left" v-for="(item, index) in props.item" :key="index" v-fecha>
            <!-- {{ item[Object.keys(item)[0]] }} -->
            {{item}}
          </td>
          <!-- <td class="text-xs-right">{{ props.item.carbs }}</td> -->
          <!-- <td class="text-xs-right">{{ props.item.protein }}</td> -->
          <!-- <td class="text-xs-right">{{ props.item.iron }}</td> -->
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Su búsqueda de "{{ search }}" no encontró resultados.
        </v-alert>
        <template slot="pageText" slot-scope="props">
          Líneas {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
        </template>
      </v-data-table>
  </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    cargando: false,
    search: "",
    headers: [],
    rows: [],
    rows_per_page_items: [5, 10, 25, 50, 100, { text: "Todo", value: -1 }]
  }),
  computed: {
    ...mapGetters("dynamic_report", ["reporte", "paramReport"])
  },
  mounted() {
    // console.log("Reporte: ", this.reporte);
    this.cargando = true;
    var parametros = [];
    this.paramReport.forEach(parametro => {
      parametros.push({
        ID: parametro.ID,
        PARAMETRO_NOMBRE: parametro.PARAMETRO_NOMBRE,
        PARAMETRO_TIPO: parametro.PARAMETRO_TIPO,
        VALOR: parametro.VALOR,
        UTILIZAQUERY: parametro.UTILIZAQUERY,
        QUERYSELECCION: parametro.QUERYSELECCION
      });
    });
    // console.log("Parámetros: ", parametros);

    const json = "json=" + JSON.stringify({ parametros: parametros });
    // console.log("json: ", json);

    this.$http
      .post(`evo_exportacion/parametros`, json)
      .then(response => {
        // console.log(res);
      }).then(()=>{
        this.$http
          .get(`/evo_exportacion/ejecutar/${this.reporte.Id}`)
          .then(res => {
            // console.log("Res: ", res);
            this.headers = [];
            if (res.result.recordset.length > 0) {
            }
            Object.keys(res.result.recordset[0]).forEach(col => {
              this.headers.push({ text: col, value: col });
            });
            // res.result.recordset.forEach(row => {
            //   this.rows.push(row);
            // });
            this.rows = res.result.recordset;

            this.setDataReport(this.rows);
            this.cargando = false;
          })
          .catch(err => {
            this.cargando = false;
            console.log(err);
          });
      
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    ...mapActions("dynamic_report", ["setDataReport"])
  }
};
</script>

<style>
</style>
