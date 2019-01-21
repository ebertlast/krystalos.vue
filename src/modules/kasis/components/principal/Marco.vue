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
          <v-list-tile v-else :key="item.text" @click="" :to="item.route">
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
      <v-footer class="pink lighten-5" height="auto">
          <strong class="font-italic">{{ususu.INSTITUCION}}</strong>.-&nbsp;<strong class="caption">{{ususu.DB_NAME}}</strong>
      </v-footer>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="pink lighten-4"
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Asistencial</span>
      </v-toolbar-title>
      <v-text-field v-if="false"
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
          <img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          >
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
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click="$router.back(1)"
    >
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
    items: [
      // { icon: "contacts", text: "Contacts" },
      // { icon: "history", text: "Frequently contacted" },
      // { icon: "content_copy", text: "Duplicates" },
      // {
      //   icon: "keyboard_arrow_up",
      //   "icon-alt": "keyboard_arrow_down",
      //   text: "Labels",
      //   model: true,
      //   children: [{ icon: "add", text: "Create label" }]
      // },
      // {
      //   icon: "keyboard_arrow_up",
      //   "icon-alt": "keyboard_arrow_down",
      //   text: "More",
      //   model: false,
      //   children: [
      //     { text: "Import" },
      //     { text: "Export" },
      //     { text: "Print" },
      //     { text: "Undo changes" },
      //     { text: "Other contacts" }
      //   ]
      // },
      // { icon: "settings", text: "Settings" },
      // { icon: "chat_bubble", text: "Send feedback" },
      // { icon: "help", text: "Help" },
      {
        icon: "accessible",
        text: "Pacientes",
        divider: true,
        route: { name: "afi" }
      },
      { icon: "home", text: "Regresar a Inicio", route: "/" }
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
      "actualizarEpss"
    ])
  },
  computed: {
    ...mapGetters("kseg", ["ususu", "nombreUsuario", "nombreGrupo"]),
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
      "mdxs"
    ])
  },
};
</script>