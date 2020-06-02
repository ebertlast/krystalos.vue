<template>
  <v-container fluid > <!--fill-height-->
    
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Seleccionar</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">Procesar</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">Resultados</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-layout row wrap>
            <v-flex xs12>
              <input class="btn btn-warning btn-sm btn-block" type="file" name="archivo" id="archivo" ref="archivo" accept="application/pdf" v-on:change="mostrarArchivo" v-show="false"/>
              <v-text-field
                v-model="nombre"
                  label="Archivo"
                  append-outer-icon="place"
                  @click="elegirArchivo"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
              <v-btn slot="activator" color="#9C27B0" dark v-show="archivo">Ver Archivo</v-btn>
              <v-card>
                <v-toolbar dark color="primary">
                  <v-btn icon dark @click.native="dialog = false">
                    <v-icon>close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Visor</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn dark flat @click.native="dialog = false">Cerrar</v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <pdf v-if="archivo" :url="archivo" :solover="true"></pdf>
                
              </v-card>
            </v-dialog>
          </v-layout>
          <v-btn
            color="primary"
            @click="e1 = 2"
            :disabled="!archivo"
          >
            Continuar
          </v-btn>

          <v-btn flat :to="{name:'archivos'}">Cancelar</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-progress-linear :indeterminate="true" v-show="cargando"></v-progress-linear>

          <v-btn
            color="primary"
            @click="e1 = 3"
          >
            Continuar
          </v-btn>

          <!-- <v-btn flat @click="e1=1">Regresar</v-btn> -->
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
            class="mb-5"
            color="grey lighten-1"
            height="200px"
          ></v-card>

          <v-btn
            color="primary"
            @click="e1 = 1"
          >
            Seleccionar archivo
          </v-btn>

          <!-- <v-btn flat>Cancel</v-btn> -->
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    
    

   
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { default as components } from "../../../../common/components";
export default {
  data: () => ({
    archivo: undefined,
    nombre: "",
    cargando: false,
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    e1: 0,
    arr_archivo: [],
    texto: undefined
  }),
  methods: {
    elegirArchivo() {
      // console.log(this.$refs.archivo)
      this.archivo = undefined;
      this.texto = undefined;
      this.$refs.archivo.click();
    },
    mostrarArchivo() {
      this.archivo = undefined;
      this.arr_archivo = [];

      var inputFile = this.$refs.archivo;
      //   console.log(inputFile.files[0]);
      if (inputFile.value !== "") {
        // var file = inputFile.mozFullPath;
        if (this.extensionArchivo(inputFile.value)[0] !== "pdf") {
          inputFile.value = "";
          this.$noty.error("No se permiten formatos diferentes a PDF's");
        } else {
          //   console.log(inputFile.files);
          //   var file = inputFile.files[0];
          this.arr_archivo.push(inputFile.files[0]);
          this.archivo = (window.URL || window.webkitURL).createObjectURL(
            inputFile.files[0]
          );
          this.nombre = inputFile.files[0].name;

          console.log("Archivo: " + this.archivo);
          //   var path = (window.URL || window.webkitURL).createObjectURL(archivo);
          //   console.log("Path:", path);
          // var binaryData = [];
          // binaryData.push(data);
          //   var file = new File(archivo, "Prueba");
        }
      }
    },
    extraerTexto() {
      const formData = new FormData();

      //#region agregar archivo a la solicitud
      var file = this.arr_archivo[0];
      formData.append("file", file, file.name);
      //#endregion

      //#region agregar datos al cuerpo de la solicitud
      var model = {};
      formData.append(
        "json",
        JSON.stringify({
          model
        })
      );
      //#endregion

      this.cargando = true;
      var self = this;
      this.$http
        .post(`ocr/extraer/texto`, formData)
        .then(res => {
          this.cargando = false;
          console.log(res);
        })
        .catch(function(err) {
          self.cargando = false;
        });
    }
  },
  computed: {
    ...mapGetters(["extensionArchivo"])
  },
  components: {
    pdf: components.Pdf
  },
  watch: {
    e1() {
      // console.log(this.e1);
      switch (this.e1) {
        case 1:
          this.elegirArchivo();
          break;
        case 2:
          this.extraerTexto();
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style>
</style>
