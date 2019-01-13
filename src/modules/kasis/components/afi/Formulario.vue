<template>
    <v-container grid-list-md text-xs-center>
        <v-progress-linear :indeterminate="true" v-if="cargando"></v-progress-linear>
        <v-layout row wrap>
            <v-flex xs5>
                <v-autocomplete
                    v-model="afi.TIPO_DOC"
                    :items="tipoDocumentos"
                    label="Tipo de Documento de Identidad"
                    persistent-hint
                    prepend-icon="mdi-city"
                    item-value="CODIGO"
                    item-text="DESCRIPCION"
                    :disabled="afi.IDAFILIADO&&afi.IDAFILIADO!==''"
                >
                </v-autocomplete>
            </v-flex>
            <v-flex xs5>
                <v-text-field
                    v-model="afi.DOCIDAFILIADO"
                    ref="DOCIDAFILIADO"
                    label="Documento de Identidad"
                    v-on:keypress="valido=false"
                    v-on:keypress.delete.prevent="validar"
                    v-on:keypress.enter.prevent="validar"
                    :disabled="afi.IDAFILIADO&&afi.IDAFILIADO!==''"
                ></v-text-field>
                    <!-- v-on:change="valido=false" -->
            </v-flex>
            <v-flex xs2>
                <v-btn :color="valido ? '' : 'info'" @click="validar" :disabled="afi.IDAFILIADO&&afi.IDAFILIADO!==''">Validar</v-btn>
            </v-flex>
            <v-scroll-y-transition mode="out-in">
                <v-flex xs3 v-show="valido">
                   <v-text-field
                    v-model="afi.PNOMBRE"
                    ref="PNOMBRE"
                    label="Primer Nombre"
                    ></v-text-field>
                </v-flex>
            </v-scroll-y-transition>
            <v-scroll-y-transition mode="out-in">
                <v-flex xs3 v-show="valido">
                   <v-text-field
                    v-model="afi.SNOMBRE"
                    ref="SNOMBRE"
                    label="Segundo Nombre"
                    ></v-text-field>
                </v-flex>
            </v-scroll-y-transition>
            <v-scroll-y-transition mode="out-in">
                <v-flex xs3 v-show="valido">
                   <v-text-field
                    v-model="afi.PAPELLIDO"
                    ref="PAPELLIDO"
                    label="Primer Apellido"
                    ></v-text-field>
                </v-flex>
            </v-scroll-y-transition>
            <v-scroll-y-transition mode="out-in">
                <v-flex xs3 v-show="valido">
                   <v-text-field
                    v-model="afi.SAPELLIDO"
                    ref="SAPELLIDO"
                    label="Segundo Apellido"
                    ></v-text-field>
                </v-flex>
            </v-scroll-y-transition>
            <v-scroll-y-transition mode="out-in">
                <v-flex xs2 v-if="valido&&afi.PNOMBRE&&afi.PNOMBRRE!==''&&afi.PAPELLIDO&&afi.PAPELLIDO!==''">
                    <v-text-field
                        v-model="afi.FNACIMIENTO"
                        ref="FNACIMIENTO"
                        label="Fecha de Nacimiento"
                        type="date"
                        :suffix="edad"
                        v-on:change="calcularEdad"
                        ></v-text-field>
                </v-flex>
            </v-scroll-y-transition>
            <v-flex xs2>
                
            </v-flex>
            <v-scroll-y-transition mode="out-in">
                <v-flex xs4 v-if="valido&&afi.PNOMBRE&&afi.PNOMBRRE!==''&&afi.PAPELLIDO&&afi.PAPELLIDO!==''">
                    <v-radio-group v-model="afi.SEXO" row ref="SEXO">
                    <v-radio value="Femenino">
                        <div slot="label"><strong class="pink--text">Femenino</strong></div>
                    </v-radio>
                    <v-radio value="Masculino">
                        <div slot="label"><strong class="primary--text">Masculino</strong></div>
                    </v-radio>
                    </v-radio-group>
                </v-flex>
            </v-scroll-y-transition>

            <v-scroll-y-transition mode="out-in">
                <v-flex xs2 v-if="valido&&afi.PNOMBRE&&afi.PNOMBRRE!==''&&afi.PAPELLIDO&&afi.PAPELLIDO!==''">
                   <v-text-field
                    v-model="afi.TELEFONOLAB"
                    ref="TELEFONOLAB"
                    label="Teléfono Laboral"
                    mask="phone"
                    ></v-text-field>
                </v-flex>
            </v-scroll-y-transition>
            <v-scroll-y-transition mode="out-in">
                <v-flex xs2 v-if="valido&&afi.PNOMBRE&&afi.PNOMBRRE!==''&&afi.PAPELLIDO&&afi.PAPELLIDO!==''">
                   <v-text-field
                    v-model="afi.TELEFONORES"
                    ref="TELEFONOLAB"
                    label="Teléfono Particular"
                    mask="phone"
                    ></v-text-field>
                </v-flex>
            </v-scroll-y-transition>
            <v-flex xs3>
                <v-scroll-y-transition mode="out-in" v-if="valido&&afi.PNOMBRE&&afi.PNOMBRRE!==''&&afi.PAPELLIDO&&afi.PAPELLIDO!==''">
                   <v-text-field
                    v-model="afi.EMAIL"
                    ref="EMAIL"
                    label="Correo Electrónico"
                    type="email"
                    ></v-text-field>
                </v-scroll-y-transition>
            </v-flex>
            <v-flex xs3>
                <v-scroll-y-transition mode="out-in" v-if="valido&&afi.PNOMBRE&&afi.PNOMBRRE!==''&&afi.PAPELLIDO&&afi.PAPELLIDO!==''">
                   <v-autocomplete
                    :items="departamentos"
                    v-model="departamento"
                    label="Departamento"
                    solo
                    item-value="DPTO"
                    item-text="NOMBRE"
                    ref="DPTO"
                    no-data-text="Registro no encontrado"
                    ></v-autocomplete>
                
                </v-scroll-y-transition>
            </v-flex>

            <v-flex xs3>
                <v-scroll-y-transition mode="out-in" v-if="valido&&afi.PNOMBRE&&afi.PNOMBRRE!==''&&afi.PAPELLIDO&&afi.PAPELLIDO!=='' && departamento && departamento!==''">
                   <v-autocomplete
                    :items="ciudadesFiltradas"
                    v-model="ciudad"
                    label="Ciudad"
                    solo
                    item-value="CIUDAD"
                    item-text="NOMBRE"
                    ref="CIUDAD"
                    no-data-text="Registro no encontrado"
                    ></v-autocomplete>
                
                </v-scroll-y-transition>
            </v-flex>
            <v-flex xs3>
                <v-scroll-y-transition mode="out-in" v-if="valido&&afi.PNOMBRE&&afi.PNOMBRRE!==''&&afi.PAPELLIDO&&afi.PAPELLIDO!=='' && ciudad && ciudad!==''">
                   <v-autocomplete
                    :items="barriosFiltrados"
                    v-model="barrio"
                    label="Barrio"
                    solo
                    item-value="IDBARRIO"
                    item-text="NOMBRE"
                    ref="BARRIO"
                    no-data-text="Registro no encontrado"
                    ></v-autocomplete>
                
                </v-scroll-y-transition>
            </v-flex>

            <v-flex xs12>
                <v-scroll-y-transition mode="out-in" v-if="valido&&afi.PNOMBRE&&afi.PNOMBRRE!==''&&afi.PAPELLIDO&&afi.PAPELLIDO!==''">
                    <v-toolbar dark color="success lighten-3" v-if="afi.DIRECCION && afi.DIRECCION!==''">
                        <v-toolbar-title class="black--text">Dirección: {{afi.DIRECCION}}</v-toolbar-title>
                           
                        <v-spacer></v-spacer>

                        <v-btn icon @click="editarDireccion">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </v-toolbar>
                </v-scroll-y-transition>

                <v-scroll-y-transition mode="in-out">
                    <direccionador @direccion="afi.DIRECCION=$event" v-show="!afi.DIRECCION || afi.DIRECCION===''" ref="direccionador"></direccionador>
                </v-scroll-y-transition>
            </v-flex>
            <v-flex xs12>
                    <v-btn color="primary" :disabled="!camposLlenos" @click="guardar">Guardar</v-btn>                
                    <v-btn @click="$emit('cancelar')">Cancelar</v-btn>                
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { default as components } from "../../../../../src/common/components";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["afi"],
  data: () => ({
    cargando: false,
    departamento: "",
    ciudad: "",
    barrio: "",
    valido: false, //Determina si ya se hizo la consulta a la base de datos y se determino que no hay paciente registrado con el mísmo numero de identificación
    edad: "",
    docidafiliado: ""
  }),
  mounted() {
    // setTimeout(() => {
    //   console.log("Tipo Documentos: ", this.tipoDocumentos);
    // }, 2000);
    // Si el IDAFILIADO está lleno es porque es para editar el registro
    if (this.afi.IDAFILIADO && this.afi.IDAFILIADO !== "") {
      console.log("Ciudades: ",this.ciudades)
      console.log("Departamentos: ",this.departamentos)
      // alert("mounted Formulario")
      this.ciudad = this.afi.CIUDAD;
      this.barrio = this.afi.IDBARRIO;
      this.cargando = true;
      this.$http
        .get(`ciu/${this.afi.CIUDAD}`)
        .then(res => {
          this.departamento = res.result.recordset[0].DPTO;
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          this.cargando = false;
          this.afi.CIUDAD = this.ciudad;
          this.afi.IDBARRIO = this.barrio;
          this.valido = true;
        });

      this.afi.FNACIMIENTO = this.afi.FNACIMIENTO.substr(0, 10);
    }
  },

  methods: {
    ...mapActions(["notificacion", "setAlert"]),
    calcularEdad() {
      if (!this.afi.FNACIMIENTO || this.afi.FNACIMIENTO === "") {
        return "";
      }
      if (!isNaN(this.afi.FNACIMIENTO)) {
        return "";
      }

      //   this.$http
      //     .get(`afi/calcularEdad/${this.afi.FNACIMIENTO}`)
      //     .then(res => {
      //       console.log(res);
      //       this.edad = res.result.recordset[0].EDAD + " Años";
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });

      var hoy = new Date();
      var cumpleanos = new Date(this.afi.FNACIMIENTO);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var m = hoy.getMonth() - cumpleanos.getMonth();

      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }
      this.edad = edad + " Años";

      //   this.edad = edad + " Años";
    },
    editarDireccion() {
      //   setDialog({
      //     text_title: "Prueba"
      //   });
      this.afi.DIRECCION = "";
      this.$refs.direccionador.show = true;
    },
    validar() {
      if (this.afi.DOCIDAFILIADO === "") {
        return;
      }
      this.cargando = true;
      this.$http
        .get(`afi/${this.afi.TIPO_DOC}/${this.afi.DOCIDAFILIADO}`)
        .then(res => {
          if (res.result.recordset.length <= 0) {
            this.valido = true;
            this.$refs.PNOMBRE.focus();
          } else {
            this.valido = false;
            var afi = res.result.recordset[0];
            this.notificacion({
              type: "error",
              message: `Afiliado se encuentra registrado (${afi.IDAFILIADO})`
            });
          }
        })
        .then(() => {
          this.cargando = false;
        });
      //   this.valido = true;
    },
    guardar() {
      //   console.log(this.afi);
      //   this.setAlert({
      //     type: "success",
      //     text: "Cambios Realizados en la Base de Datos"
      //   });
      this.afi.PNOMBRE = this.afi.PNOMBRE.toUpperCase();
      this.afi.SNOMBRE = this.afi.SNOMBRE ? this.afi.SNOMBRE.toUpperCase() : "";
      this.afi.PAPELLIDO = this.afi.PAPELLIDO.toUpperCase();
      this.afi.SAPELLIDO = this.afi.SAPELLIDO
        ? this.afi.SAPELLIDO.toUpperCase()
        : "";
      // this.afi.EMAIL = this.afi.EMAIL.toLowerCase();
      // console.log(this.afi.PNOMBRE);

      var [anio, mes, dia] = this.afi.FNACIMIENTO.split("-");
      this.afi.FNACIMIENTO = new Date(anio, mes, dia);
      this.$emit("guardar", this.afi);
    },
    keypress(event) {
      console.log(event.keyCode);
    }
  },
  components: {
    Direccionador: components.Direccionador,
    Fecha: components.Fecha
  },
  computed: {
    ...mapGetters("krycnf", [
      "departamentos",
      "ciudades",
      "barrios",
      "tipoDocumentos"
    ]),
    camposLlenos() {
      // console.log(this.afi.DOCIDAFILIADO);
      // console.log(this.afi.PNOMBRE);
      // console.log(this.afi.PAPELLIDO);
      // console.log(this.afi.EMAIL);
      // console.log(this.afi.FNACIMIENTO);
      // console.log(this.afi.CIUDAD);
      // console.log(this.afi.IDBARRIO);
      // console.log(this.afi.DIRECCION);
      if (
        !this.afi.DOCIDAFILIADO ||
        !this.afi.PNOMBRE ||
        !this.afi.PAPELLIDO ||
        !this.afi.EMAIL ||
        !this.afi.FNACIMIENTO ||
        !this.afi.CIUDAD ||
        !this.afi.IDBARRIO ||
        !this.afi.DIRECCION
      ) {
        return false;
      } else if (
        this.afi.DOCIDAFILIADO === "" ||
        this.afi.PNOMBRE === "" ||
        this.afi.PAPELLIDO === "" ||
        this.afi.EMAIL === "" ||
        this.afi.FNACIMIENTO === "" ||
        this.afi.CIUDAD === "" ||
        this.afi.IDBARRIO === "" ||
        this.afi.DIRECCION === ""
      ) {
        return false;
      } else {
        return true;
      }
    },
    ciudadesFiltradas() {
      var departamento = this.departamento;
      return this.ciudades.filter(function(el) {
        return el.DPTO === departamento;
      });
    },
    barriosFiltrados() {
      var ciudad = this.ciudad;
      return this.barrios.filter(function(el) {
        return el.CIUDAD === ciudad;
      });
    }
  },
  watch: {
    departamento() {
      // console.log("Departamento: ",this.departamento)
      // console.log("Departamentos: ",this.departamentos)
      this.afi.CIUDAD = undefined;
      this.afi.IDBARRIO = undefined;
    },
    ciudad() {
      this.afi.CIUDAD = this.ciudad;
    },
    barrio() {
      this.afi.IDBARRIO = this.barrio;
    },

    docidafiliado() {
      this.validar();
    }
  }
};
</script>

<style>
</style>
