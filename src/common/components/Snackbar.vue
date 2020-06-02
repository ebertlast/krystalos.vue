<template>
  <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :multi-line="snackbar.mode === 'multi-line'"
      :timeout="snackbar.timeout"
      :vertical="snackbar.mode === 'vertical'"
    >
      {{snackbar.text}}
      <v-btn
        dark
        flat
        @click="snackbar.show = false"
      >
        Cerrar
      </v-btn>
    </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      show: false,
      color: "primary",
      mode: "multi-line", //multi-line, vertical
      timeout: 6000,
      text: "Hello, I'm a snackbar"
    };
  },
  mounted() {
    // console.log(this.snackbar.show)
    // setTimeout((this.snackbar = true), 20000);
  },
  methods: {
    // ...mapActions(["setSnackbar"])
  },
  computed: {
    ...mapGetters(["snackbar"])
  }
};
</script>

<style>
body {
  font-family: "Roboto", sans-serif;
  /* font-size: 18; */
}
</style>
