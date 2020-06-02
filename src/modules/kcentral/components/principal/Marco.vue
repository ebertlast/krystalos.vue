<template>
  <v-app id="inspire">
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
      <v-list dense>
        <template v-for="item in menus">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i" @click :to="child.route">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ child.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" :to="item.route">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="item.divider"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-2" dark app fixed>
      <v-toolbar-title class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">{{title}}</span>
      </v-toolbar-title>
      <v-text-field
        v-show="true"
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Filtrar"
        class="hidden-sm-and-down"
        v-model="texto_filtro"
        ref="texto_filtro"
      ></v-text-field>

      <v-spacer></v-spacer>
      <h2 @click="$router.push({name:'cambiar_clave'})" style="cursor:pointer;">{{nombreUsuario}}</h2>
      <v-btn icon v-show="false">
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon v-show="false">
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img src="/src/assets/Krystalos.ico" alt="Krystalos">
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height v-if="false">
        <v-layout justify-center align-center>
          <v-tooltip left>
            <v-btn slot="activator" fab dark large color="amber" :to="{name:'dynamic_report'}">
              <v-icon dark>table_chart</v-icon>
            </v-btn>
            <span>Dynamic Report</span>
          </v-tooltip>
          <v-tooltip right v-show="ususu.USUARIO==='EZERPA'">
            <v-btn
              slot="activator"
              :href="source"
              icon
              large
              dark
              fab
              color="purple"
              :to="{name:'kryocr'}"
            >
              <v-icon large>scanner</v-icon>
            </v-btn>
            <span>Optical Character Recognition</span>
          </v-tooltip>
        </v-layout>
      </v-container>

      <v-container grid-list-md text-xs-center>
        <template>
          <div v-for="(item, index) in notificaciones" :key="index">
            <v-alert
              v-model="item.DISPLAY"
              dismissible
              type="error"
              transition="scale-transition"
              style="cursor: pointer"
              @click="descartar_notificacion(item)"
            >{{item.NOTIFICACION}}</v-alert>
          </div>
        </template>
        <v-layout row wrap>
          <v-flex xs4 v-for="(item, index) in menus" :key="index">
            <v-card :color="item.color" :dark="item.dark" :class="item.class">
              <v-card-title primary-title>
                <div class="headline" v-text="item.text"></div>
                <div v-text="item.description"></div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat :dark="item.dark" :to="item.route">Ir allí</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-btn v-show="false" fab bottom right color="pink" dark fixed @click="dialog = !dialog">
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey lighten-4 py-4 title">Create contact</v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt>
                </v-avatar>
                <v-text-field placeholder="Name"></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field prepend-icon="business" placeholder="Company"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field placeholder="Job title"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field prepend-icon="mail" placeholder="Email"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                type="tel"
                prepend-icon="phone"
                placeholder="(000) 000 - 0000"
                mask="phone"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field prepend-icon="notes" placeholder="Notes"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { APPNAME } from "../../../../common/globals";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    alert: true,
    dialog: false,
    drawer: null,
    title: APPNAME,
    texto_filtro: "",
    items: [
      {
        icon: "local_atm",
        text: "Contabilidad",
        // divider: true,
        route: { name: "kconta" },
        color: "indigo",
        dark: true,
        description:
          "Provisiones, Libros Auxiliares, Balances de Comprobación, Estado de Resultados.",
        name: "BContable"
      },
      {
        icon: "warning",
        text: "Apoyo Diagnóstico",
        // divider: true,
        route: { name: "klab" },
        color: "red accent-1",
        description:
          "Exámenes de laboratorio, Pruebas Cruzadas, Rayos X, Tomografías.",
        name: "BApoyoDX"
      },
      {
        icon: "contacts",
        text: "Asistencial",
        // divider: true,
        route: { name: "kasis" },
        color: "pink lighten-4",
        description:
          "Admisiones, Pacientes, Historias Clínicas, Triages, Cirugías, Prestaciones.",
        class: "black--text",
        name: "BAsistencial"
      },
      {
        icon: "beenhere",
        text: "Autorizaciones",
        route: { name: "autorizaciones" },
        color: "#0AA8AA",
        class: "white--text",
        description:
          "Solicitudes de Drogas, Alistamiento, Logistica de despacho y entrega.",
        dark: true,
        name: "BAutorizacion"
      },
      {
        icon: "table_chart",
        text: "Dynamic Report",
        // divider: true,
        route: { name: "dynamic_report" },
        color: "amber",
        class: "black--text",
        description:
          "Construcción de Reportes, Indicadores, Exportación a Excel.",
        dark: false,
        name: "BDinamic"
      },
      // { icon: "history", text: "Frequently contacted" },
      {
        icon: "scanner",
        text: "Sistema de Archivos",
        route: { name: "kryocr" },
        color: "purple",
        // class: "white--text",
        description:
          "Digitalizaciones, Radicaciones, Sistema de gestión de archivos, PDF.",
        dark: true,
        name: "BOCR"
      },
      {
        icon: "widgets",
        text: "Inventario",
        route: { name: "kinv" },
        color: "orange lighten-2",
        description:
          "Compras, entradas, salidas, despachos, traslados entre bodegas, conteo físico.",
        dark: false,
        name: "BInventario"
      },
      {
        icon: "domain",
        text: "Activos Fijos",
        route: { name: "kiaf" },
        color: "deep-orange darken-1",
        description:
          "Tipos de Activos, eventos, movimientos, depreciaciones, inflación, artículos.",
        dark: true,
        name: "BActivosF"
      },
      {
        icon: "settings",
        text: "Configuración",
        route: { name: "krycnf" },
        color: "blue-grey",
        description:
          "Configuraciones Generales del Sistema, Tablas Genéricas, Seguridad.",
        dark: true,
        name: "BKonfiguracion"
      },
      {
        icon: "settings_ethernet",
        text: "Desarrollo",
        route: { name: "kdev" },
        description:
          "Configuraciones Generales del Sistema, Tablas Genéricas, Seguridad.",
        dark: true,
        name: "BDesarrollo"
      },
      // {
      //   icon: "keyboard_arrow_up",
      //   "icon-alt": "keyboard_arrow_down",
      //   text: "Labels",
      //   model: false,
      //   children: [{ icon: "add", text: "Create label" }]
      // },
      // {
      //   icon: "keyboard_arrow_up",
      //   "icon-alt": "keyboard_arrow_down",
      //   text: "Sistema",
      //   model: false,
      //   divider: true,
      //   children: [
      //     {
      //       icon: "settings_ethernet",
      //       text: "Desarrollo",
      //       route: { name: "kdev" }
      //     },
      //     { icon: "settings", text: "Configuración", route: { name: "krycnf" } }
      //     // { text: "Print" },
      //     // { text: "Undo changes" },
      //     // { text: "Other contacts" }
      //   ]
      // },
      // { icon: "chat_bubble", text: "Send feedback" },
      // { icon: "help", text: "Help" },
      // { icon: "phonelink", text: "App downloads" },
      {
        icon: "vpn_key",
        text: "Cerrar Sesión",
        route: { name: "ingresar" },
        color: "blue darken-2",
        dark: true,
        description:
          "Cerrar sesión y salir del Sistema. Acceder a otras instituciones.",
        name: "BSalir"
      }
    ],
    notificaciones: []
  }),
  mounted() {
    // console.log(this.ususu);
    var self = this;
    self.title = self.ususu.INSTITUCION;
    setTimeout(() => {
      self.$refs.texto_filtro.focus();
    }, 1000);

    this.$http
      .get("ususun/pendientes")
      .then(res => {
        var notificaciones = res.result.recordset;
        notificaciones.forEach(el => {
          el.DISPLAY = true;
        });
        this.notificaciones = notificaciones;
        console.log("Notificaciones: ", this.notificaciones);
      })
      .catch(err => {
        console.log(err);
      });
  },
  props: {
    source: String
  },
  methods: {
    descartar_notificacion(ususun) {
      this.$http
        .get(`ususun/leido/${ususun.CNSNOTIFICACION}`)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

      ususun.DISPLAY = false;
    }
  },
  computed: {
    ...mapGetters("kseg", ["ususu", "nombreUsuario", "nombreGrupo"]),
    menus() {
      var menus = this.items;
      var _return = [];
      var palabra = this.texto_filtro;
      var permisos = undefined;

      if (this.ususu && this.ususu.USGRUH) {
        var permisos = this.ususu.USGRUH.filter(function(el) {
          return el.IDPROCEDIMIENTO == "MenuKCentral";
        });
      }

      for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        var _push = true;
        if (palabra && palabra !== "") {
          if (
            menu.description.toUpperCase().search(palabra.toUpperCase()) >= 0 ||
            menu.text.toUpperCase().search(palabra.toUpperCase()) >= 0
          ) {
          } else {
            _push = false;
          }
        }
        if (_push && permisos) {
          var permiso = permisos.filter(function(el) {
            return el.IDCONTROL == menu.name;
          })[0];
          if (!permiso) {
            _push = false;
          } else {
            if (permiso.PERMISO != 1) {
              _push = false;
            }
          }
        }

        if (menu.name == "BSalir") {
          _push = true;
        }
        if (_push) {
          _return.push(menu);
        }
      }
      return _return;
    }
  },
  watch: {}
};
</script>