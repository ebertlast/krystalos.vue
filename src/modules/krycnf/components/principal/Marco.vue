<template>
  <v-app id="inspire">
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
      <v-list dense>
        <template v-for="(menu, index) in menus">
          <v-list-group
            :prepend-icon="menu.icono"
            :value="menu.desplegado"
            :key="index"
            v-if="!menu.individual"
          >
            <v-list-tile slot="activator">
              <v-list-tile-title v-text="menu.texto"></v-list-tile-title>
            </v-list-tile>

            <template v-for="submenu in menu.submenus">
              <v-divider v-if="submenu.divisor"></v-divider>
              <v-list-tile
                @click
                :to="submenu.ruta"
                v-if="!submenu.items || submenu.items.length<=0"
              >
                <v-list-tile-title v-text="submenu.texto"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="submenu.icono"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-group no-action sub-group :value="submenu.desplegado" v-else>
                <v-list-tile slot="activator">
                  <v-list-tile-title v-text="submenu.texto"></v-list-tile-title>
                </v-list-tile>

                <v-list-tile v-for="(item, i) in submenu.items" :key="i" @click :to="item.ruta">
                  <v-list-tile-title v-text="item.texto"></v-list-tile-title>
                  <v-list-tile-action>
                    <v-icon v-text="item.icono"></v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list-group>
            </template>
          </v-list-group>

          <v-list-tile :key="menu.texto" :to="menu.ruta" v-else>
            <v-list-tile-action>
              <v-icon>{{ menu.icono }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ menu.texto }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <v-footer class="blue-grey lighten-5" height="auto">
        <strong class="font-italic">{{ususu.INSTITUCION}}</strong>.-&nbsp;
        <strong class="caption">{{ususu.DB_NAME}}</strong>
      </v-footer>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue-grey" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Konfiguración</span>
      </v-toolbar-title>
      <v-text-field
        v-if="false"
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer v-if="false"></v-spacer>
      <v-btn icon v-if="false">
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon v-if="false">
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large v-if="false">
        <v-avatar size="32px" tile>
          <img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify">
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
      <!-- <v-container fluid fill-height> -->
      <v-scroll-y-transition mode="out-in">
        <router-view></router-view>
      </v-scroll-y-transition>
      <!-- </v-container> -->
    </v-content>
    <v-btn fab bottom right color="pink" dark fixed @click="$router.back(1)" v-if="false">
      <v-icon>chevron_left</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    drawer: null,
    admins: [["Management", "people_outline"], ["Settings", "settings"]],
    cruds: [
      ["Create", "add"],
      ["Read", "insert_drive_file"],
      ["Update", "update"],
      ["Delete", "delete"]
    ],
    menus: [
      {
        icono: "local_atm",
        texto: "Contable",
        desplegado: false,
        submenus: [
          {
            texto: "Grupos de Áreas Funcionales",
            ruta: { name: "hare" },
            icono: ""
          },
          {
            texto: "Cuentas Contables",
            ruta: { name: "cue" },
            icono: ""
          },
          {
            texto: "Cuentas Contables NIIF",
            ruta: { name: "cueniif" },
            icono: ""
          }
        ]
      },
      {
        icono: "widgets",
        texto: "Inventario",
        desplegado: false,
        submenus: [
          {
            texto: "Tipos de Artículos",
            ruta: { name: "itar" },
            icono: "",
            divisor: false
          },
          {
            texto: "Formas Farmacéuticas",
            ruta: { name: "iffa" },
            icono: "",
            divisor: false
          },
          {
            texto: "Clases de Medicamentos",
            ruta: { name: "icla" },
            icono: "",
            divisor: true
          },
          {
            texto: "Subclases de Medicamentos",
            ruta: { name: "iclah" },
            icono: "",
            divisor: false
          },
          {
            texto: "Agrupación de Medicamentos",
            ruta: { name: "igru" },
            icono: "",
            divisor: false
          },
          {
            texto: "Principios Activos",
            ruta: { name: "ipac" },
            icono: "",
            divisor: false
          },
          {
            texto: "Unidades de Medida",
            ruta: { name: "iuni" },
            icono: "",
            divisor: false
          },
          {
            texto: "Concentraciones",
            ruta: { name: "iccn" },
            icono: "",
            divisor: false
          },
          {
            texto: "Genéricos",
            icono: "",
            divisor: true,
            items: [
              {
                texto: "Tipos de Genéricos",
                ruta: { name: "itgen" },
                icono: ""
              },
              {
                texto: "Genéricos",
                ruta: { name: "igen" },
                icono: ""
              }
            ]
          },
          {
            texto: "Artículos",
            ruta: { name: "iart" },
            icono: "",
            divisor: false
          }
        ]
      },
      {
        icono: "domain",
        texto: "Activos Fijos",
        desplegado: false,
        submenus: [
          {
            texto: "Tipos de Activos",
            ruta: { name: "iactt" },
            icono: ""
          }
        ]
      },
      {
        icono: "settings",
        texto: "Generales",
        desplegado: false,
        submenus: [
          {
            texto: "Terceros",
            icono: "",
            divisor: true,
            items: [
              {
                texto: "Categorias",
                ruta: { name: "cat" },
                icono: ""
              },
              {
                texto: "Terceros",
                ruta: { name: "ter" },
                icono: ""
              }
            ]
          },
          {
            texto: "Médicos",
            ruta: { name: "med" },
            icono: ""
          },
          {
            texto: "Direcciones",
            icono: "",
            divisor: true,
            items: [
              {
                texto: "Paises",
                ruta: { name: "pais" },
                icono: ""
              },
              {
                texto: "Departamentos",
                ruta: { name: "dep" },
                icono: ""
              },
              {
                texto: "Ciudades",
                ruta: { name: "ciu" },
                icono: ""
              },
              {
                texto: "Barrios",
                ruta: { name: "ciub" },
                icono: ""
              },
              {
                texto: "Zonas",
                ruta: { name: "zon" },
                icono: ""
              }
            ]
          },
          {
            texto: "Otros",
            icono: "",
            divisor: true,
            items: [
              {
                texto: "Ocupaciones",
                ruta: { name: "ocu" },
                icono: ""
              },
              {
                texto: "Actividades Econonómicas",
                ruta: { name: "aec" },
                icono: ""
              }
            ]
          }
        ]
      },
      {
        icono: "headset_mic",
        texto: "Sistemas",
        desplegado: false,
        submenus: [
          {
            texto: "Tablas Genéricas",
            ruta: { name: "tgen" },
            icono: ""
          },
        ]
      },
      {
        icono: "home",
        texto: "Regresar a Inicio",
        ruta: "/",
        individual: true
      }
    ]
  }),
  props: {
    source: String
  },
  mounted() {
    if (!this.mes || this.mes.length <= 0) {
      this.actualizarMes();
    }
    if (!this.deps || this.deps.length <= 0) {
      this.refrescarDeps();
    }
    if (!this.cius || this.cius.length <= 0) {
      this.refrescarCius();
    }
    if (!this.tipoDocumentos || this.tipoDocumentos.length <= 0) {
      this.actualizarTipoDocumentos();
    }
    if (!this.ciubs || this.ciubs.length < 1) {
      this.actualizarBarrios();
    }
    if (this.docXTpo.length <= 0) {
      this.actualizarDocXTpo();
    }
    if (this.mdxs.length <= 0) {
      this.actualizarMdxs();
    }
    if (this.sers.length <= 0) {
      this.actualizarSers();
    }
    if (this.ipss.length <= 0) {
      this.actualizarIpss();
    }
    if (this.epss.length <= 0) {
      this.actualizarEpss();
    }
    if (this.precomercials.length <= 0) {
      this.refrescarPrecomercials();
    }
    if (this.paiss.length <= 0) {
      this.refrescarPaiss();
    }
  },
  methods: {
    ...mapActions("krycnf", [
      "actualizarMes",
      "refrescarDeps",
      "refrescarCius",
      "actualizarBarrios",
      "actualizarDocXTpo",
      "actualizarTipoDocumentos",
      "actualizarMdxs",
      "actualizarSers",
      "actualizarIpss",
      "actualizarEpss",
      "refrescarPaiss"
    ]),
    ...mapActions("kinv", ["refrescarPrecomercials"])
  },
  computed: {
    ...mapGetters("kseg", ["ususu", "nombreUsuario", "nombreGrupo"]),
    ...mapGetters("kinv", ["precomercials"]),
    ...mapGetters("krycnf", [
      "mes",
      "cius",
      "deps",
      "ciubs",
      "tipoDocumentos",
      "docXTpo",
      "sers",
      "ipss",
      "epss",
      "mdxs",
      "paiss"
    ])
  }
};
</script>