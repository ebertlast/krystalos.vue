<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-autocomplete
          label="Tipo de Identificación"
          :items="tipoDocumentos"
          v-model="model.TIPO_ID"
          item-value="CODIGO"
          item-text="DESCRIPCION"
          :disabled="(editar)"
          ref="TIPO_ID"
          no-data-text="Registro no encontrado"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          name="IDMEDICO"
          label="Identificación"
          id="IDMEDICO"
          ref="IDMEDICO"
          v-model="model.IDMEDICO"
          :disabled="(editar)"
        ></v-text-field>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          name="NO_REGISTRO"
          label="Registro Médico"
          id="NO_REGISTRO"
          ref="NO_REGISTRO"
          v-model="model.NO_REGISTRO"
        ></v-text-field>
      </v-flex>
      <v-flex xs3>
        <v-autocomplete
          label="Especialidad Médica"
          :items="mes"
          v-model="model.IDEMEDICA"
          item-value="IDEMEDICA"
          item-text="DESCRIPCION"
          no-data-text="Registro no encontrado"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          name="PNOMBRE"
          label="Primer Nombre"
          id="PNOMBRE"
          ref="PNOMBRE"
          v-model="model.PNOMBRE"
        ></v-text-field>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          name="SNOMBRE"
          label="Segundo Nombre"
          id="SNOMBRE"
          ref="SNOMBRE"
          v-model="model.SNOMBRE"
        ></v-text-field>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          name="PAPELLIDO"
          label="Primer Apellido"
          id="PAPELLIDO"
          ref="PAPELLIDO"
          v-model="model.PAPELLIDO"
        ></v-text-field>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          name="SAPELLIDO"
          label="Segundo Apellido"
          id="SAPELLIDO"
          ref="SAPELLIDO"
          v-model="model.SAPELLIDO"
        ></v-text-field>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          name="CELULAR"
          label="Celular"
          id="CELULAR"
          ref="CELULAR"
          v-model="model.CELULAR"
          mask="phone"
        ></v-text-field>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          name="TELEFONOS"
          label="Teléfono Principal"
          id="TELEFONOS"
          ref="TELEFONOS"
          v-model="model.TELEFONOS"
          mask="phone"
        ></v-text-field>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          name="TEL_OTRO"
          label="Teléfono Secundario"
          id="TEL_OTRO"
          ref="TEL_OTRO"
          v-model="model.TEL_OTRO"
          mask="phone"
        ></v-text-field>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          name="EMAIL"
          label="Correo Electrónico"
          id="EMAIL"
          ref="EMAIL"
          v-model="model.EMAIL"
          type="email"
        ></v-text-field>
      </v-flex>

      <v-flex xs6>
        <v-autocomplete
          :items="deps"
          v-model="departamento"
          label="Departamento"
          solo
          item-value="DPTO"
          item-text="NOMBRE"
          ref="DPTO"
          no-data-text="Registro no encontrado"
          ></v-autocomplete>
      </v-flex>
      <v-flex xs6>
        <v-scroll-y-transition mode="out-in" v-if="departamento && departamento!==''">
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

      <v-flex xs12>
        <v-scroll-y-transition mode="out-in">
            <v-toolbar dark color="success lighten-3" v-if="model.DIRECCION && model.DIRECCION!==''">
                <v-toolbar-title class="black--text">Dirección: {{model.DIRECCION}}</v-toolbar-title>
                    
                <v-spacer></v-spacer>

                <v-btn icon @click="model.DIRECCION=''">
                    <v-icon  color="black">edit</v-icon>
                </v-btn>
            </v-toolbar>
        </v-scroll-y-transition>
        <v-scroll-y-transition mode="in-out">
          <direccionador @direccion="model.DIRECCION=$event" v-show="!model.DIRECCION || model.DIRECCION===''" ref="direccionador"></direccionador>
        </v-scroll-y-transition>
      </v-flex>
      <v-flex xs12>
        <v-btn color="success" @click="guardar">Guardar</v-btn>
        <v-btn @click="$emit('cancelar')">Cancelar</v-btn>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { default as components } from "../../../../../src/common/components";
export default {
  props: ["fila"],
  data: () => ({
    model: {
      IDMEDICO: undefined,
      TIPO_USUARIO: "Médico",
      TIPOVINCULACION: "Tercero",
      NOMBRE: undefined,
      IDEMEDICA: undefined,
      NO_REGISTRO: undefined,
      IDMODELO: undefined,
      DIRECCION: undefined,
      TELEFONOS: undefined,
      BEEPER: undefined,
      CELULAR: undefined,
      CIUDAD: undefined,
      AUTORIZACION: undefined,
      SEL_PROVEED: undefined,
      MANEJAMSEDES: undefined,
      NO_CONSULTAS: undefined,
      IDTERCERO: undefined,
      EMPLEADO: undefined,
      TOPEPACIENTES: undefined,
      PACIENTESASIG: undefined,
      ESTADO: "Activo",
      IDMODELOPRE: undefined,
      LUGARATENCION: undefined,
      IDSEDEATENCION: undefined,
      DIR_OTRA: undefined,
      TEL_OTRA: undefined,
      CIU_OTRA: undefined,
      TIPO_ID: undefined,
      PNOMBRE: undefined,
      SNOMBRE: undefined,
      PAPELLIDO: undefined,
      SAPELLIDO: undefined,
      IDFIRMA: undefined,
      CLASIFICACION: undefined,
      NUMACCIONES: undefined,
      NUMMSDS: undefined,
      CODCOLEGIO: undefined,
      TELEFONO: undefined,
      EMAIL: undefined,
      ACCIONES: undefined,
      MINUTOSCAMBIO: 60
    },
    departamento: {},
    ciudad: {},
    editar: false
  }),
  mounted() {
    var self = this;
    // setTimeout(() => {
    //   if (self.mes.length <= 0) {
    //     self.actualizarMes();
    //   }
    //   if (self.tipoDocumentos.length <= 0) {
    //     self.actualizarTipoDocumentos();
    //   }
    // }, 3000);
    if (this.fila) {
      this.model = this.fila;
      this.editar = true;
      if (this.model.CIUDAD) {
        var self = this;
        setTimeout(() => {
          self.ciudad = self.model.CIUDAD;
          self.departamento = self.cius.filter(function(el) {
            return el.CIUDAD == self.model.CIUDAD;
          })[0].DPTO;
        }, 2000);
      }
    }
  },
  computed: {
    ...mapGetters("krycnf", [
      "mes",
      "tipoDocumentos",
      "cius",
      "deps"
    ]),
    nombre() {
      var nombre = `${this.model.PAPELLIDO} ${this.model.SAPELLIDO} ${
        this.model.PNOMBRE
      } ${this.model.SNOMBRE}`;
      nombre = nombre.replace("  ", " ").trim();
      return nombre;
    },
    ciudadesFiltradas() {
      var departamento = this.departamento;
      if (!departamento || departamento === "") {
        return "";
      }
      return this.cius.filter(function(el) {
        return el.DPTO === departamento;
      });
    }
  },
  methods: {
    // ...mapActions("krycnf", ["actualizarMes", "actualizarTipoDocumentos"]),
    guardar() {
      this.$emit("guardar", this.model);
    }
  },
  components: {
    Direccionador: components.Direccionador
  },
  watch: {
    ciudad() {
      this.model.CIUDAD = this.ciudad;
      if (!this.departamento || this.departamento === "") {
        if (this.ciudad && this.ciudad !== "" && this.cius) {
          var self = this;
          this.departamento = this.cius.filter(function(el) {
            return el.CIUDAD == self.CIUDAD;
          })[0].DPTO;
        }
      }
    }
  }
};
</script>

<style>
</style>
