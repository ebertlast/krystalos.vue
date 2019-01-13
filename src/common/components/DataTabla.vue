<template>
  <div>
    <v-scroll-y-transition mode="out-in">
      <v-card>
        <v-card-title>
          {{titulo}}
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
          :headers="columnas"
          :items="filas"
          :search="search"
          :loading="loading"
          :rows-per-page-items=rows_per_page_items
          no-data-text="La consulta no ha generado resultados"
          rows-per-page-text="Filas por página:"
          >
          <!-- class="elevation-1" -->
          <v-progress-linear slot="progress" color="grey darken-2" indeterminate></v-progress-linear>
          <template slot="items" slot-scope="props">
            <td class="text-xs-left" v-for="(item, index) in props.item" :key="index" v-fecha @click="detalles(props.item)" :style="{ cursor: 'pointer'}">
              {{item}}
            </td>
            <!-- <td>
              <v-btn fab dark small color="grey darken-2" @click="detalles(props.item)">
                <v-icon dark>details</v-icon>
              </v-btn>
              
            </td> -->
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Su búsqueda de "{{ search }}" no encontró resultados.
          </v-alert>
          <template slot="pageText" slot-scope="props">
            Línea{{(props.itemsLength>1)?"s":""}} {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
          </template>
          <template slot="footer">
            <td colspan="100%">
              <v-btn color="success"  @click="dialogFormulario=true; $emit('agregar')">Agregar Registro</v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-scroll-y-transition>
    <v-scroll-y-transition mode="out-in">
      <v-layout row justify-center>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
            <v-toolbar dark :color="(color)?color:'grey darken-2'">
              <v-btn icon dark @click.native="dialog = false; $emit('cancelar')" v-show="false">
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>{{titulo}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark flat @click.native="dialog = false; $emit('cancelar')" v-show="false">Listo</v-btn>
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
        <v-dialog v-model="dialogFormulario" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
            <v-toolbar dark :color="(color)?color:'grey darken-2'">
              <v-btn icon dark @click.native="dialogFormulario = false; $emit('cancelar')" v-show="false">
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>{{titulo}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark flat @click.native="dialogFormulario = false; $emit('cancelar')" v-show="false">Listo</v-btn>
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
export default {
  props: ["columnas", "filas", "titulo", "loading", "color"],
  data: () => ({
    rows_per_page_items: [5, 10, 25, 50, 100, { text: "Todo", value: -1 }],
    search: "",
    dialog: false,
    dialogFormulario: false,
    notifications: false,
    sound: true,
    widgets: false,
    nuevoRegistro: false
  }),
  methods: {
    detalles(fila) {
      this.$emit("fila", fila);
      this.dialog = true;
    },
    cerrarDialog() {
      this.dialogFormulario = false;
      this.dialog = false;
    }
  },
  watch: {
    nuevoRegistro() {
      alert(this.nuevoRegistro);
    }
  }
};
</script>