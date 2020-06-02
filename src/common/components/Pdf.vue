<template>
  <div>
    <v-flex xs12>
        <v-slider
          v-model="width"
        ></v-slider>
      </v-flex>
    <div class="text-xs-center">
      <v-pagination
        v-model="currentPage"
        :length="pageCount"
        v-show="pageCount>1"
      ></v-pagination>
    </div>
    <pdf
            :ref="identificador"
            :src="src"
            @num-pages="pageCount = $event"
            :page="currentPage"
            :style="`width: ${tamanio}`"
        ></pdf>
            <!-- style="display: inline-block; width: 25%" -->
  </div>
</template>

<script>
import pdf from "vue-pdf";
export default {
  props: ["url", "nombreDocumento", "solover"],
  components: {
    pdf
  },
  data() {
    return {
      src: this.loadingTask(),
      numPages: undefined,
      currentPage: 1,
      pageCount: 0,
      identificador: btoa(Math.random()).substring(0, 12),
      visor: true,
      width: 100
    };
  },
  created() {},
  mounted() {
    this.src.then(pdf => {
      this.numPages = pdf.numPages;
    });

    // var self = this;
    // setInterval(() => {
    //   self.currentPage =
    //     self.currentPage === self.numPages ? 1 : self.currentPage + 1;
    // }, 2000)
    // console.log("identificador:", this.identificador);
    // console.log(this.$refs[this.identificador]);
  },
  methods: {
    loadingTask() {
      return pdf.createLoadingTask(this.url);
    },
    imprimir() {
      this.$refs[this.identificador].print();
    },
    descargarPDF() {
      this.nombreDocumento = this.nombreDocumento || this.identificador;
      var self = this;
      const url = self.url;
      var link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${this.nombreDocumento}.pdf`);
      var event = document.createEvent("MouseEvents");
      event.initMouseEvent(
        "click",
        true,
        true,
        window,
        1,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      link.dispatchEvent(event);
    }
  },
  computed: {
    tamanio() {
      return this.width + "%";
    }
  },
  watch: {
    // url() {
    //   console.log("Ebert:", this.url);
    // }
    width() {
      console.log(this.width);
    }
  }
};
</script>

<style>
</style>
