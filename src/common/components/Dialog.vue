<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
      <v-card>
        <v-card-title class="headline">{{dialog.text_title}}</v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="color_ok" flat @click.native="aceptar">{{dialog.text_ok}}</v-btn>
          <v-btn color="color_cancel" flat @click.native="cancelar">{{dialog.text_cancel}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["dialog"],
  data: () => ({
    // dialog: {
    //   show: false,
    //   text_ok: "Aceptar",
    //   text_cancel: "Cancelar",
    //   color_ok: "green darken-1",
    //   color_cancel: "green darken-1",
    //   text_title: "Titulo",
    //   text_body:
    //     "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae commodi, nesciunt quos aliquid rerum quibusdam natus vero, nihil blanditiis culpa fugit est tenetur, illum possimus? Tempora amet eum similique alias."
    // }
  }),
  computed: {
    // ...mapGetters(["dialog"])
  },
  methods: {
    aceptar() {
      this.dialog.show = false;
      this.$emit("respuesta", true);
    },
    cancelar() {
      this.dialog.show = false;
      this.$emit("respuesta", false);
    }
  }
};
</script>