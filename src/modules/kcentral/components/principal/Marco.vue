<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
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
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click=""
              :to="child.route"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list-group>
          <v-list-tile v-else :key="item.text" :to="item.route">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="item.divider"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-2"
      dark
      app
      fixed
    >
      <v-toolbar-title class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">{{title}}</span>
      </v-toolbar-title>
      <v-text-field v-show="false"
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      
      <v-spacer></v-spacer>
      <h2>{{nombreUsuario}}</h2>
      <v-btn icon v-show="false">
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon v-show="false">
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="/src/assets/Krystalos.ico"
            alt="Krystalos"
          >
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
    <v-layout row wrap>
      <v-flex xs4>
        <v-card color="indigo" dark>
          <v-card-title primary-title>
            <div class="headline">Contable</div>
            <div>Provisiones, Libros Auxiliares, Balances de Comprobación, Estado de Resultados.</div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat :to="'/kconta'">Ir al módulo</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card color="red accent-1">
          <v-card-title primary-title>
            <div class="headline">Apoyo Diagnóstico</div>
            <div>Exámenes de laboratorio, Pruebas Cruzadas, Rayos X, Tomografías.</div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat :to="{name:'klab'}">Ir al módulo</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card color="pink lighten-4" class="black--text">
          <v-card-title primary-title>
            <div class="headline">Asistencial</div>
            <div>Admisiones, Pacientes, Historias Clínicas, Triages, Cirugías, Prestaciones.</div>
          </v-card-title>
          <v-card-actions>
            <v-btn class="black--text" flat dark :to="{name:'kasis'}">Ir al módulo</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card color="#0AA8AA" class="white--text">
          <v-card-title primary-title>
            <div class="headline">Droguería</div>
            <div>Solicitudes de Insumos y Drogas, Alistamiento, Logistica de despacho y entrega.</div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark :to="{name:'klog'}">Ir al módulo</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card color="amber" class="black--text">
          <v-card-title primary-title>
            <div class="headline">Dynamic Report</div>
            <div>Construcción de Reportes, Indicadores, Exportación a Excel.</div>
          </v-card-title>
          <v-card-actions>
            <v-btn class="black--text" flat dark :to="{name:'dynamic_report'}">Ir al módulo</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card color="purple" class="white--text">
          <v-card-title primary-title>
            <div class="headline">Sistema de Archivos</div>
            <div>Digitalizaciones, Radicaciones, Sistema de gestión de archivos, PDF.</div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark :to="{name:'kryocr'}">Ir al módulo</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card color="orange lighten-2">
          <v-card-title primary-title>
            <div class="headline">Inventario</div>
            <div>Compras, entradas, salidas, despachos, traslados entre bodegas, conteo físico.</div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat :to="{name:'kinv'}">Ir al módulo</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card color="deep-orange darken-1" dark >
          <v-card-title primary-title>
            <div class="headline">Activos Fijos</div>
            <div>Tipos de Activos, eventos, movimientos, depreciaciones, inflación, artículos.</div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat :to="{name:'kiaf'}">Ir al módulo</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      
      
      <v-flex xs4>
        <v-card color="blue-grey" dark>
          <v-card-title primary-title>
            <div class="headline">Konfiguración</div>
            <div>Configuraciones Generales del Sistema, Tablas Genéricas, Seguridad.</div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat :to="{name:'krycnf'}">Ir al módulo</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
    </v-content>
    <v-btn v-show="false"
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Create contact
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  placeholder="Name"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="business"
                placeholder="Company"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                placeholder="Job title"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="mail"
                placeholder="Email"
              ></v-text-field>
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
              <v-text-field
                prepend-icon="notes"
                placeholder="Notes"
              ></v-text-field>
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
    dialog: false,
    drawer: null,
    title: APPNAME,
    items: [
      {
        icon: "local_atm",
        text: "Contabilidad",
        // divider: true,
        route: "kconta"
      },
      {
        icon: "warning",
        text: "Apoyo Diagnóstico",
        // divider: true,
        route: "klab"
      },
      {
        icon: "contacts",
        text: "Asistencial",
        // divider: true,
        route: "kasis"
      },
      {
        icon: "beenhere",
        text: "Droguería",
        route: { name: "klog" }
      },
      {
        icon: "table_chart",
        text: "Dynamic Report",
        // divider: true,
        route: "dynamic_report"
      },
      // { icon: "history", text: "Frequently contacted" },
      {
        icon: "scanner",
        text: "Sistema de Archivos",
        route: "kryocr"
      },
      {
        icon: "widgets",
        text: "Inventario",
        route: "kinv"
      },
      {
        icon: "domain",
        text: "Activos Fijos",
        route: "kiaf"
      },
      {
        icon: "settings",
        text: "Configuración",
        route: { name: "krycnf" } 
      },
      {
        icon: "settings_ethernet",
        text: "Desarrollo",
        route: { name: "kdev" } 
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
      { icon: "vpn_key", text: "Cerrar Sesión", route: { name: "ingresar" } }
    ]
  }),
  mounted() {
    // console.log(this.ususu);
    this.title = this.ususu.INSTITUCION;
  },
  props: {
    source: String
  },
  methods: {},
  computed: {
    ...mapGetters("kseg", ["ususu", "nombreUsuario", "nombreGrupo"])
  }
};
</script>