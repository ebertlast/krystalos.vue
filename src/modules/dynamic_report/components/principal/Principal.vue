<template>
  <v-app id="keep">
    <v-navigation-drawer v-model="drawer" fixed clipped class="grey lighten-4" app>
      <v-list dense class="grey lighten-4">
        <template v-for="(item, i) in items">
          <v-layout v-if="item.heading" :key="i" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <v-btn small flat>edit</v-btn>
            </v-flex>
          </v-layout>
          <v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>
          <v-list-tile v-else :key="i" :to="item.route">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <v-footer class="amber lighten-5" height="auto">
          <strong class="font-italic">{{ususu.INSTITUCION}}</strong>.-&nbsp;<strong class="caption">{{ususu.DB_NAME}}</strong>
      </v-footer>
    </v-navigation-drawer>
    <v-toolbar color="amber" app clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">Dynamic &nbsp;
        <span class="font-weight-light">Report</span> (Indicadores)
      </span>
      <v-text-field
        v-show="false"
        solo-inverted
        flat
        hide-details
        label="Consulta de Reportes"
        prepend-inner-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid class="grey lighten-4">
        <!-- fill-height  -->
        <!-- <v-layout justify-center align-center> -->
        <v-scroll-y-transition mode="out-in">
          <router-view></router-view>
        </v-scroll-y-transition>
        <!-- </v-layout> -->
      </v-container>
    </v-content>
    <v-btn v-if="false" fab bottom right color="amber" dark fixed @click="$router.back(1)">
      <v-icon>chevron_left</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    drawer: null,
    items: [
      {
        icon: "lightbulb_outline",
        text: "Consultas",
        route: { name: "consultas" }
      },
      // { icon: "touch_app", text: "Reminders" },
      // { divider: true },
      // { heading: "Labels" },
      // { icon: "add", text: "Create new label" },
      // { divider: true },
      // { icon: "archive", text: "Archive" },
      // { icon: "delete", text: "Trash" },
      { divider: true },
      // { icon: "settings", text: "Settings" },
      // { icon: "chat_bubble", text: "Trash" },
      // { icon: "help", text: "Help" },
      // { icon: "phonelink", text: "App downloads" },
      { icon: "home", text: "Regresar a Inicio", route: "/" }
    ]
  }),
  props: {
    source: String
  },
  mounted() {
    this.$router.push({ nam: "consultas" });
  },
  computed: {
    ...mapGetters("kseg", ["ususu", "nombreUsuario", "nombreGrupo"]),
  },
};
</script>

<style>
</style>