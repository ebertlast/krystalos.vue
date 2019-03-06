<template>
  <v-app id="inspire">
    <div>
      <v-progress-linear color="primary" height="2" :indeterminate="true" v-show="cargando"></v-progress-linear>
    </div>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Ingresar a Krystalos</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    name="usuario"
                    label="Usuario"
                    type="text"
                    ref="usuario"
                    v-model="usuario"
                    v-on:keypress.enter="ingresar"
                  ></v-text-field>
                  <!-- v-show="cia.COMPANIA!==''" -->
                  <!-- v-show="cia.COMPANIA!==''" -->
                  <v-text-field
                    id="clave"
                    prepend-icon="lock"
                    name="clave"
                    label="Contraseña"
                    type="password"
                    ref="clave"
                    v-on:keypress.enter="ingresar"
                    v-model="clave"
                  ></v-text-field>
                  <v-combobox
                    v-model="cli"
                    :items="clis"
                    label="Servidor"
                    autofocus
                    item-text="RAZONSOCIAL"
                    item-value="CLIENTEID"
                    ref="cliente"
                    class="danger"
                  ></v-combobox>
                  <v-combobox
                    v-model="cia"
                    :items="cias"
                    label="Base de Datos"
                    v-show="cias.length>0"
                    item-text="RAZONSOCIAL"
                    item-VALUE="COMPANIA"
                    ref="compania"
                  ></v-combobox>
                  
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  v-on:click.prevent="ingresar"
                  :loading="cargando"
                  :disabled="cargando || cia.COMPANIA==='' || usuario==='' || clave==='' "
                >Ingresar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { default as methods } from "./methods";
import { default as computed } from "./computed";
export default {
  data: () => ({
    drawer: null,
    clis: [],
    cli: {
      ACTIVO: false,
      CLIENTEID: "",
      RAZONSOCIAL: "",
      URL_API: "",
      VERSIONID: ""
    },
    cias: [],
    cia: {
      COMPANIA: "",
      RAZONSOCIAL: ""
    },
    usuario: "",
    clave: "",
    cargando: false
  }),
  props: {},
  mounted() {
    this.clearUsusu();
    this.consultarClientes();
    // console.log(this.setSnackbar);
    // this.notificacion({ message: "Bienvenido de vuelta a Krystalos Online" });
    this.setReportes([]);
    this.actualizarMes([]);
    this.refrescarDeps([]);
    this.refrescarCius([]);
    this.actualizarBarrios([]);
    this.actualizarDocXTpo([]);
    this.actualizarTipoDocumentos([]);
  },
  watch: {
    cli() {
      this.setApiUrl(this.cli.URL_API);
      this.consultarCompanias();
      // console.log(this.cias.length);
    }
  },
  methods,
  computed
};
</script>
