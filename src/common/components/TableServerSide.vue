<template>
  <div id="app">
    <v-app id="inspire">
      <div class="px-2">
        <h2>
          Mostrando registros de la tabla
          <code>{{titulo}}</code>
        </h2>
        <v-text-field label="Buscar" v-model.lazy="textboxInput"></v-text-field>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :pagination.sync="pagination"
          :total-items="totalDesserts"
          :loading="loading"
          class="elevation-4"
          :rows-per-page-items="rows_per_page_items"
          no-data-text="La consulta no ha generado resultados"
          rows-per-page-text="Filas por página:"
        >
          <template
            slot="pageText"
            slot-scope="props"
          >Línea{{(props.itemsLength>1)?"s":""}} {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}</template>

          <template slot="items" slot-scope="props">
            <!-- <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.calories }}</td>
            <td class="text-xs-right">{{ props.item.fat }}</td>
            <td class="text-xs-right">{{ props.item.carbs }}</td>
            <td class="text-xs-right">{{ props.item.protein }}</td>
            <td class="text-xs-right">{{ props.item.iron }}</td>-->
            <td
              :class="(props.item && props.item.class) ? props.item.class:'text-xs-left'"
              v-for="(item, index) in props.item"
              :key="index"
              v-on:dblclick="detalles(props.item)"
              :style="{ cursor: 'pointer' }"
              v-show="index!=='class'"
              @click="($listeners.seleccionar)?seleccionar(props.item):detalles(props.item)"
            >{{item}}</td>
          </template>
          <template slot="footer">
            <td colspan="100%">
              <v-btn
                color="success"
                @click="dialogFormulario=true; $emit('agregar')"
              >Agregar Registro</v-btn>
            </td>
          </template>
        </v-data-table>
        <!-- <pre>{{ pagination }}</pre> -->
      </div>
    </v-app>
    <v-scroll-y-transition mode="out-in">
      <v-layout row justify-center>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
            <v-toolbar dark :color="(color)?color:'grey darken-2'">
              <v-btn icon dark @click.native="dialog = false; $emit('cancelar')">
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>{{titulo}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                  dark
                  flat
                  @click.native="dialog = false; $emit('cancelar')"
                  v-show="false"
                >Listo</v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <slot name="detalles">
              <slot name="formulario_edicion"></slot>
            </slot>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-scroll-y-transition>
    <v-scroll-y-transition mode="out-in">
      <v-layout row justify-center>
        <v-dialog
          v-model="dialogFormulario"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar dark :color="(color)?color:'grey darken-2'">
              <v-btn icon dark @click.native="dialogFormulario = false; $emit('cancelar')">
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>{{titulo}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                  dark
                  flat
                  @click.native="dialogFormulario = false; $emit('cancelar')"
                  v-show="false"
                >Listo</v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <slot name="formulario"></slot>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-scroll-y-transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["columnas", "filas", "titulo", "color"],
  data() {
    return {
      textboxInput: "",
      rows_per_page_items: [5, 10, 25, 50, 100], //, { text: "Todo", value: -1 }],
      timeout: null,
      search: "",
      totalDesserts: 0,
      desserts: [],
      loading: true,
      pagination: {},
      dialog: false,
      dialogFormulario: false,
      headers: [
        {
          text: "Identificador",
          align: "left",
          sortable: false,
          value: "IDAUT"
        },
        { text: "Autorización", value: "NOAUT", sortable: false },
        { text: "Fecha", value: "FECHA", sortable: false },
        { text: "Documento", value: "CEDULA", sortable: false },
        { text: "Paciente", value: "PACIENTE", sortable: false },
        { text: "Funcionario", value: "FUNCIONARIO", sortable: false },
        { text: "IPS", value: "IPS", sortable: false },
        { text: "ARL", value: "ARL", sortable: false },
        { text: "Estado", value: "ESTADO", sortable: false }
      ]
    };
  },
  watch: {
    params: {
      handler() {
        // clearTimeout(this.timeout);

        // this.timeout = setTimeout(() => {
        this.getDataFromApi().then(data => {
          console.log("GETDATA");
          this.desserts = data.items;
          this.totalDesserts = data.total;
        });
        // }, 1000);
      },
      deep: true
    },
    textboxInput(val) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.search = JSON.parse(JSON.stringify(val));
      }, 500);
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.desserts = data.items;
      this.totalDesserts = data.total;
    });

    // this.$store.dispatch("read",
    // {
    //   Tabla: "AUT",
    //   NumPagina: 1,
    //   TamPagina: 10,
    //   // StringABuscar: filter,
    //   // OrdenarPor: ordenerPor,
    //   // InnerJoin: this.inner_join,
    //   // ColumnasVisibles: this.columnas_visibles,
    //   // CondicionAdicional: this.condicion_adicional
    // }
    // ,{root:true})
    // console.log();
  },

  computed: {
    params(nv) {
      return {
        ...this.pagination,
        query: this.search
      };
    }
  },

  methods: {
    // ...mapActions(["read"]),
    ...mapActions("kcentral", ["read"]),
    getDataFromApi() {
      this.loading = true;

      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;
        let search = this.search.trim().toLowerCase();

        let items = this.getDesserts();

        if (search) {
          items = items.filter(item => {
            return Object.values(item)
              .join(",")
              .toLowerCase()
              .includes(search);
          });
        }

        if (this.pagination.sortBy) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy];
            const sortB = b[sortBy];

            if (descending) {
              if (sortA < sortB) return 1;
              if (sortA > sortB) return -1;
              return 0;
            } else {
              if (sortA < sortB) return -1;
              if (sortA > sortB) return 1;
              return 0;
            }
          });
        }

        if (rowsPerPage > 0) {
          items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage);
        }

        var total = 0;

        this.read({
          Tabla: "VWK_AUT",
          NumPagina: page,
          TamPagina: rowsPerPage,
          StringABuscar: "%" + search + "%",
          OrdenarPor: "FECHASINFORMATO DESC"
          // InnerJoin:
          //   "AFI ON AFI.IDAFILIADO=AUT.IDAFILIADO LEFT JOIN USUSU ON USUSU.USUARIO=AUT.USUARIO LEFT JOIN TER IPS ON IPS.IDTERCERO=AUT.IDIPS  LEFT JOIN TER ARL ON ARL.IDTERCERO=AUT.IDCONTRATANTE",
          // ColumnasVisibles:
          //   "IDAUT,NOAUT,CONVERT(VARCHAR,FECHA,103)+' '+CONVERT(VARCHAR,FECHA,108) FECHA,AFI.TIPO_DOC+AFI.DOCIDAFILIADO CEDULA,AFI.NOMBREAFI, USUSU.NOMBRE FUNCIONARIO, IPS.RAZONSOCIAL IPS, ARL.RAZONSOCIAL ARL",
          //ColumnasFiltro: "NOAUT,CEDULA,PACIENTE"
          // CondicionAdicional: this.condicion_adicional
        })
          .then(res => {
            this.loading = false;

            // console.log(res.result.output.CantPaginas);
            // console.log(res.result.recordset);
            var filas = res.result.recordset;
            filas.forEach(fila => {
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
            items = filas;
            total = res.result.output.TotalRegistros;
            resolve({
              items,
              total
            });
          })
          .catch(err => {
            this.loading = false;
          });
      });
    },
    getDataFromApi_OLD() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;
        let search = this.search.trim().toLowerCase();

        let items = this.getDesserts();

        if (search) {
          items = items.filter(item => {
            return Object.values(item)
              .join(",")
              .toLowerCase()
              .includes(search);
          });
        }

        if (this.pagination.sortBy) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy];
            const sortB = b[sortBy];

            if (descending) {
              if (sortA < sortB) return 1;
              if (sortA > sortB) return -1;
              return 0;
            } else {
              if (sortA < sortB) return -1;
              if (sortA > sortB) return 1;
              return 0;
            }
          });
        }

        if (rowsPerPage > 0) {
          items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage);
        }

        const total = items.length;

        setTimeout(() => {
          this.loading = false;
          resolve({
            items,
            total
          });
        }, 300);
      });
    },
    getDesserts() {
      return [
        {
          value: false,
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          value: false,
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          value: false,
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          value: false,
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          value: false,
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          value: false,
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          value: false,
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          value: false,
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          value: false,
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          value: false,
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
      ];
    },
    detalles(fila) {
      // console.log(fila)
      this.$emit("fila", fila);
      this.dialog = true;
    },
    cerrarDialog() {
      this.dialogFormulario = false;
      this.dialog = false;
    },
    seleccionar(fila) {
      console.log(fila);
      this.$emit("seleccionar", fila);
    },
  }
};
</script>