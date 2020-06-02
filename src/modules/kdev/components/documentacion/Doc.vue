<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6>
        <v-autocomplete
          label="Producto"
          :items="productos"
          v-model="producto"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs6>
        <v-scroll-y-transition mode="out-in" v-if="producto && producto!==''">
          <v-autocomplete
            label="Version"
            :items="pversiones"
            v-model="version"
            item-text="descripcion"
            item-value="version"
          ></v-autocomplete>
        </v-scroll-y-transition>
      </v-flex>
      <v-flex xs12>
        <vue-markdown>_this_ #is the default slot</vue-markdown>
      </v-flex>
      <v-flex v-for="i in 3" :key="`4${i}`" xs4>
        <v-card dark color="primary">
          <v-card-text class="px-0">4</v-card-text>
        </v-card>
      </v-flex>
      <v-flex v-for="i in 4" :key="`3${i}`" xs3>
        <v-card dark color="secondary">
          <v-card-text class="px-0">3</v-card-text>
        </v-card>
      </v-flex>
      <v-flex v-for="i in 6" :key="`2${i}`" xs2>
        <v-card dark color="primary">
          <v-card-text class="px-0">2</v-card-text>
        </v-card>
      </v-flex>
      <v-flex v-for="i in 12" :key="`1${i}`" xs1>
        <v-card dark color="secondary">
          <v-card-text class="px-0">1</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { default as global_components } from "../../../../common/components/";
import VueMarkdown from "vue-markdown";
console.log(VueMarkdown)
export default {
  data: () => ({
    cargando: false,
    versiones: [],
    producto: "",
    version: ""
  }),
  mounted() {
    this.cargando = true;
    this.$http
      .get("desaix/versiones/")
      .then(res => {
        this.versiones = res.result.recordset;
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.cargando = false;
      });
  },
  computed: {
    productos() {
      var productos = [];
      this.versiones.forEach(version => {
        var existe = false;
        productos.forEach(_version => {
          if (version.PRODUCTO == _version) {
            existe = true;
          }
        });
        if (!existe) {
          productos.push(version.PRODUCTO);
        }
      });
      return productos;
    },
    pversiones() {
      var versiones = [];
      this.versiones.forEach(version => {
        var existe = false;
        versiones.forEach(_version => {
          if (version.ID == _version) {
            existe = true;
          }
        });
        if (!existe) {
          // console.log(version.PRODUCTO, this.producto)
          if (version.PRODUCTO !== this.producto) {
            existe = true;
          }
        }
        if (!existe) {
          versiones.push({
            version: version.ID,
            descripcion: `${version.ID} (${version.ESTADO})`
          });
        }
      });
      console.log(versiones);
      return versiones;
    }
  },
  components: {
    'vue-markdown': VueMarkdown
  }
};
</script>

<style>
</style>
