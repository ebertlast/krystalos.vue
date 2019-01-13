<template>
  <v-card
    color="grey lighten-4"
    flat
  >
    <v-toolbar color="grey darken-2" dark>
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-toolbar-title class="white--text">Asistente generador de direcciones</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn> -->

      <v-card-actions>
          <v-btn icon @click="show = !show">
            <v-icon>{{ !show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>
    </v-toolbar>
    <v-slide-y-transition>
      <v-container grid-list-md text-xs-center v-show="show">
        <v-layout row wrap>
          <v-flex xs7>
            <v-card dark color="primary">
              <v-card-text class="px-0">Principal</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card dark color="primary">
              <v-card-text class="px-0">Secundaria</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card dark color="primary">
              <v-card-text class="px-0">Complemento</v-card-text>
            </v-card>
          </v-flex>


          <v-flex xs2>
              <v-card dark color="secondary" >
                <v-card-text class="px-0">CA(*)</v-card-text>
              </v-card>
          </v-flex>
          <v-flex xs1>
            <v-card dark color="secondary">
              <v-card-text class="px-0">18(*)</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs1>
            <v-card dark color="secondary">
              <v-card-text class="px-0">A</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs1>
            <v-card dark color="secondary">
              <v-card-text class="px-0">BIS</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs1>
            <v-card dark color="secondary">
              <v-card-text class="px-0">A</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs1>
            <v-card dark color="secondary">
              <v-card-text class="px-0">Sur</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs1>
            <v-card dark color="secondary">
              <v-card-text class="px-0">#86(*)</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs1>
            <v-card dark color="secondary">
              <v-card-text class="px-0">B</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs1>
            <v-card dark color="secondary">
              <v-card-text class="px-0">55</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card dark color="secondary">
              <v-card-text class="px-0">Este</v-card-text>
            </v-card>
          </v-flex>


          <v-flex xs2>
            <v-autocomplete
              :items="tipos"
              label="Tipo Vía"
              solo
              item-text="item_text"
              item-value="item_value"
              v-model="dir.TipoViaPrincipal"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs1>
            <v-text-field
              name="NumeroViaPrincipal"
              id="NumeroViaPrincipal"
              v-model="dir.NumeroViaPrincipal"
              type="number"
              :counter="3"
            ></v-text-field>
          </v-flex>
          <v-flex xs1>
            <v-autocomplete
              :items="letras"
              label="Letra"
              solo
              v-model="dir.LetraViaPrincipal"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs1>
            <v-autocomplete
              label="Letra"
              solo
              v-model="dir.Bis"
              :items="['','Bis']"
            >
            </v-autocomplete>
          </v-flex>
          <v-flex xs1>
            <v-autocomplete
              :items="letras"
              label="Letra Bis"
              solo
              v-model="dir.LetraBis"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs1>
            <v-autocomplete
              label="Cuadrante"
              solo
              v-model="dir.CuadranteViaPrincipal"
              :items="['','Sur','Este']"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs1>
            <v-text-field
              name="NumeroViaSecundaria"
              id="NumeroViaSecundaria"
              v-model="dir.NumeroViaSecundaria"
              type="number"
              :counter="3"
            ></v-text-field>
          </v-flex>
          <v-flex xs1>
            <v-autocomplete
              :items="letras"
              label="Letra Bis"
              solo
              v-model="dir.LetraViaSecundaria"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs1>
            <v-text-field
              name="NumeroPlaca"
              id="NumeroPlaca"
              v-model="dir.NumeroPlaca"
              type="number"
              :counter="3"
            ></v-text-field>
          </v-flex>
          <v-flex xs2>
            <v-autocomplete
              label="Cuadrante"
              solo
              v-model="dir.CuadranteViaSecundaria"
              :items="['','Sur','Este']"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12> 
            <v-card>
              <v-card-text>
                Asistente Para el ingreso de la Dirección Parte Complementaria (Ej. INT 2 AP 505)
              </v-card-text>
            </v-card>
            
          </v-flex>
          <v-flex xs3>
            <v-autocomplete
              label="Componente"
              solo
              v-model="componenteComplemento"
              :items="componentes"
              item-text="item_text"
              item-value="item_value"
              ref="componenteComplemento"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              label="Acepta  números, espacios y letras mayúsculas."
              name="valorComplemento"
              id="valorComplemento"
              v-model="complemento"
              ref="complemento"
              v-on:keypress.enter.prevent="agregarComplemento"
            ></v-text-field>
          </v-flex>

          <v-flex xs3>
            <v-btn color="primary" @click="agregarComplemento">Agregar Complemento</v-btn>
          </v-flex>

          <v-flex xs12 v-if="direccion.trim()!==''">
            <v-card dark color="info">
              <v-card-text class="px-0">{{direccion}}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-btn color="success" @click="terminar">Aceptar</v-btn>
            <v-btn color="warning" @click="limpiarComplemento">Limpiar Complemento</v-btn>
            <v-btn color="error" @click="limpiar">Limpiar Todo</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      </v-slide-y-transition>
    

      
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    show: false,
    tipos: [
      { item_text: "Avenida Calle", item_value: "AC" },
      { item_text: "Avenida Carrera", item_value: "AK" },
      { item_text: "Calle", item_value: "CL" },
      { item_text: "Carrera", item_value: "KR" },
      { item_text: "Diagonal", item_value: "DG" },
      { item_text: "Transversal", item_value: "TV" }
    ],
    componentes: [
      { item_value: "AP", item_text: "Apartamento" },
      { item_value: "AG", item_text: "Agrupación" },
      { item_value: "BL", item_text: "Bloque" },
      { item_value: "BG", item_text: "Bodega" },
      { item_value: "CN", item_text: "Camino" },
      { item_value: "CT ", item_text: "Carretera" },
      { item_value: "CEL", item_text: "Célula" },
      { item_value: "CA", item_text: "Casa" },
      { item_value: "CONJ", item_text: "Conjunto" },
      { item_value: "CS ", item_text: "Consultorio" },
      { item_value: "DP", item_text: "Depósito" },
      { item_value: "ED ", item_text: "Edificio" },
      { item_value: "EN", item_text: "Entrada" },
      { item_value: "ESQ", item_text: "Esquina" },
      { item_value: "ET", item_text: "Etapa" },
      { item_value: "GJ", item_text: "Garaje" },
      { item_value: "IN", item_text: "Interior" },
      { item_value: "KM", item_text: "Kilómetro" },
      { item_value: "LC", item_text: "Local" },
      { item_value: "LT", item_text: "Lote" },
      { item_value: "MZ", item_text: "Manzana" },
      { item_value: "MN", item_text: "Mezanine" },
      { item_value: "MD", item_text: "Módulo" },
      { item_value: "OF", item_text: "Oficina" },
      { item_value: "PS", item_text: "Paseo" },
      { item_value: "PA", item_text: "Parcela" },
      { item_value: "PH", item_text: "Penthouse" },
      { item_value: "PI", item_text: "Piso" },
      { item_value: "PN", item_text: "Puente" },
      { item_value: "PD", item_text: "Predio" },
      { item_value: "SC", item_text: "Salón" },
      { item_value: "SR", item_text: "Sector" },
      { item_value: "SL", item_text: "Solar" },
      { item_value: "SS", item_text: "Semi" },
      { item_value: "SM", item_text: "Super" },
      { item_value: "TO", item_text: "Torre" },
      { item_value: "UN", item_text: "Unidad" },
      { item_value: "UR", item_text: "Unidad" },
      { item_value: "URB", item_text: "Urbanización" },
      { item_value: "ZN", item_text: "Zona" }
    ],
    letras: [
      "",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ],

    dir: {
      TipoViaPrincipal: "",
      NumeroViaPrincipal: "",
      LetraViaPrincipal: "",
      Bis: "",
      LetraBis: "",
      CuadranteViaPrincipal: "",
      NumeroViaSecundaria: "",
      LetraViaSecundaria: "",
      NumeroPlaca: "",
      CuadranteViaSecundaria: "",
      Complemento: ""
    },
    componenteComplemento: "",
    complemento: ""
  }),
  computed: {
    direccion() {
      return `${
        this.dir.TipoViaPrincipal
      } ${this.dir.NumeroViaPrincipal.substring(0, 3)} ${
        this.dir.LetraViaPrincipal
      } ${this.dir.Bis} ${this.dir.LetraBis} ${
        this.dir.CuadranteViaPrincipal
      } ${this.dir.NumeroViaSecundaria.substring(0, 3)}  ${
        this.dir.LetraViaSecundaria
      } ${this.dir.NumeroPlaca} ${this.dir.CuadranteViaSecundaria} ${
        this.dir.Complemento
      }`
        .toUpperCase()
        .replace("  ", " ");
    }
  },
  watch: {
    direccion() {
      this.setDireccion(this.direccion);
    }
  },
  methods: {
    ...mapActions(["setDireccion"]),
    agregarComplemento() {
      if (this.componenteComplemento === "") {
        return this.$ref.complemento.focus();
      }
      if (this.complemento === "") {
        return this.$refs.complemento.focus();
      }
      this.dir.Complemento +=
        " " + this.componenteComplemento + " " + this.complemento;
      this.complemento = "";
      this.componenteComplemento = "";
      this.$refs.componenteComplemento.focus();
    },
    limpiar() {
      this.dir = {
        TipoViaPrincipal: "",
        NumeroViaPrincipal: "",
        LetraViaPrincipal: "",
        Bis: "",
        LetraBis: "",
        CuadranteViaPrincipal: "",
        NumeroViaSecundaria: "",
        LetraViaSecundaria: "",
        NumeroPlaca: "",
        CuadranteViaSecundaria: "",
        Complemento: ""
      };
      this.complemento = "";
      this.componenteComplemento = "";
    },
    limpiarComplemento() {
      this.dir.Complemento = "";
    },
    terminar() {
      this.$emit("direccion", this.direccion);
      this.setDireccion(this.dir);
      this.show = false;
    }
  }
};
</script>

<style>
</style>
