<template>
  <div id="app">
    <v-scroll-y-transition mode="out-in">
      <router-view></router-view>
    </v-scroll-y-transition>
    <snackbar></snackbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { default as components } from "./common/components";
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to IX Online App"
    };
  },
  methods: {
    ...mapActions("kseg", ["initUsusu"])
  },
  mounted() {
    this.initUsusu();
  },
  components: {
    Snackbar: components.Snackbar
    // Alert: components.Alert
  },
  computed: {}
};
</script>

<style>
</style>
