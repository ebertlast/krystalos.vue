<template>
  <v-app id="inspire">
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
      <v-list dense>
        <template v-for="item in items">
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
            <v-list-tile v-for="(child, i) in item.children" :key="i" :to="child.route">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ child.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" @click :to="item.route">
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
      <v-footer class="indigo lighten-5" height="auto">
          <strong class="font-italic">{{ususu.INSTITUCION}}</strong>.-&nbsp;<strong class="caption">{{ususu.DB_NAME}}</strong>
      </v-footer>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="indigo" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Contable</span>
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
    <v-btn fab bottom right color="pink" dark fixed @click="$router.back(1)">
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
      // {
      //   icon: "keyboard_arrow_up",
      //   "icon-alt": "keyboard_arrow_down",
      //   text: "Contable",
      //   model: false,
      //   divider: true,
      //   children: [
      //     { text: "Grupos de Areas Funcionales", route: { name: "hare" } }
      //   ]
      // },
      { icon: "home", text: "Regresar a Inicio", route: "/" }
    ]
  }),
  props: {
    source: String
  },
  mounted() {},
  methods: {},
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
  }
};
</script>