<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs2>
        <v-text-field label="ID" name="ID" id="ID" ref="ID" v-model="model.ID"></v-text-field>
      </v-flex>

      <v-flex xs2>
        <v-text-field
          label="ORDEN"
          name="ORDEN"
          id="ORDEN"
          ref="ORDEN"
          type="number"
          v-model="model.ORDEN"
        ></v-text-field>
      </v-flex>

      <v-flex xs2>
        <!-- <v-text-field label="TIPO" name="TIPO" id="TIPO" ref="TIPO" v-model="model.TIPO"></v-text-field> -->
        <v-autocomplete
          :items="['SPKI','SPK','JOBK','VWK','SPKH','TK','FNK']"
          label="TIPO"
          solo
          v-model="model.TIPO"
        ></v-autocomplete>
      </v-flex>

      <v-flex xs6>
        <v-text-field label="NOMBRE" name="NOMBRE" id="NOMBRE" ref="NOMBRE" v-model="model.NOMBRE"></v-text-field>
      </v-flex>

      <v-flex xs12>
        <v-textarea
          v-model="model.BORRADO"
          auto-grow
          box
          color="deep-purple"
          label="BORRADO"
          name="BORRADO"
          id="BORRADO"
          rows="1"
          ref="BORRADO"
          @keydown.tab.prevent="tabularBorrado($event)"
        ></v-textarea>
      </v-flex>

      <v-flex xs12>
        <!-- <v-text-field label="QUERY" name="QUERY" id="QUERY" ref="QUERY" v-model="model.QUERY"></v-text-field> -->
        <v-textarea
          v-model="model.QUERY"
          auto-grow
          box
          color="deep-purple"
          label="QUERY"
          name="QUERY"
          id="QUERY"
          rows="2"
          ref="QUERY"
          @keydown.tab.prevent="tabularQuery($event)"
        ></v-textarea>
      </v-flex>

      <v-flex xs12>
        <!-- <v-text-field label="QUERY2" name="QUERY2" id="QUERY2" ref="QUERY2" v-model="model.QUERY2"></v-text-field> -->
        <v-textarea
          v-model="model.QUERY2"
          auto-grow
          box
          color="deep-purple"
          label="QUERY2"
          name="QUERY2"
          id="QUERY2"
          rows="2"
          ref="QUERY2"
          @keydown.tab.prevent="tabularQuery2($event)"
        ></v-textarea>
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
export default {
  props: ["fila", "editar", "id"],
  data: () => ({
    model: {
      ID: undefined,
      ORDEN: undefined,
      NOMBRE: undefined,
      TIPO: undefined,
      BORRADO: undefined,
      QUERY: undefined,
      QUERY2: undefined,
      INSTRUCCION: undefined
    }
  }),
  mounted() {
    if (this.fila) {
      this.model = this.fila;
      if (this.id) {
        this.model.ID = this.id;
      }
    }
  },
  methods: {
    guardar() {
      this.$emit("guardar", this.model);
      this.model = this.model_limpio;
    },
    tabularBorrado(event) {
      if (event) {
        event.preventDefault();
        let startText = this.model.BORRADO.slice(
          0,
          event.target.selectionStart
        );
        let endText = this.model.BORRADO.slice(event.target.selectionStart);
        this.model.BORRADO = `${startText}\t${endText}`;
        event.target.selectionEnd = event.target.selectionStart + 1;
      }
    },
    tabularQuery(event) {
      if (event) {
        event.preventDefault();
        let startText = this.model.QUERY.slice(0, event.target.selectionStart);
        let endText = this.model.QUERY.slice(event.target.selectionStart);
        this.model.QUERY = `${startText}\t${endText}`;
        event.target.selectionEnd = event.target.selectionStart + 1;
      }
    },
    tabularQuery2(event) {
      if (event) {
        event.preventDefault();
        let startText = this.model.QUERY2.slice(0, event.target.selectionStart);
        let endText = this.model.QUERY2.slice(event.target.selectionStart);
        this.model.QUERY2 = `${startText}\t${endText}`;
        event.target.selectionEnd = event.target.selectionStart + 1;
      }
    }
  },
  computed: {
    model_limpio() {
      var model = {
        ID: this.id,
        ORDEN: undefined,
        NOMBRE: undefined,
        TIPO: undefined,
        BORRADO: undefined,
        QUERY: undefined,
        QUERY2: undefined,
        INSTRUCCION: undefined
      };

      return model;
    }
  },
  watch: {
    id(val) {
      this.model.ID = val;
    }
  }
};
</script>
    