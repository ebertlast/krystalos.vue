<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-progress-linear :indeterminate="true" v-if="cargando"></v-progress-linear>
        </v-flex>
        <v-flex xs3>
          <v-scroll-y-transition mode="out-in">
            <v-autocomplete
              label="Base de Datos"
              :items="basesDeDatos"
              v-model="basedatos"
              item-value="BASEDATOS"
              item-text="BASEDATOS"
            ></v-autocomplete>
          </v-scroll-y-transition>
        </v-flex>
        <v-flex xs2>
          <v-scroll-y-transition mode="out-in" v-if="basedatos && basedatos!==''">
            <v-autocomplete
              label="Tabla"
              :items="tablas"
              v-model="tablaBD"
              item-value="object_id"
              item-text="name"
              ref="tablaBD"
            ></v-autocomplete>
          </v-scroll-y-transition>
        </v-flex>
        <v-flex xs2>
          <v-scroll-y-transition
            mode="out-in"
            v-if="basedatos && basedatos!=='' && tablaBD && tablaBD!==''"
          >
            <v-btn color="warning" @click="generar2">Generar</v-btn>
          </v-scroll-y-transition>
        </v-flex>
        <v-flex xs10 v-if="false">
          <v-text-field
            class="mx-3"
            flat
            label="Nombre de la tabla"
            prepend-inner-icon="code"
            solo-inverted
            v-model="tabla"
            v-focus
            ref="tabla"
            v-on:keypress.enter.prevent="generar"
          ></v-text-field>
        </v-flex>
        <v-flex xs2 v-if="false">
          <v-btn color="warning" @click="generar">Generar</v-btn>
        </v-flex>
        <v-flex xs12>
          <v-tabs
            slot="extension"
            v-model="tabs"
            centered
            color="secondary"
            dark
            slider-color="white"
            v-show="propiedades.length>0"
          >
            <v-tab key="1">SQL</v-tab>
            <v-tab key="2">Ruta</v-tab>
            <v-tab key="3">Modelo</v-tab>
            <v-tab key="4">JSON</v-tab>
            <v-tab key="5">Detalles</v-tab>
            <v-tab key="6">Formulario</v-tab>
            <v-tab key="7">Registros</v-tab>
          </v-tabs>

          <!-- v-if="propiedades.length>0" -->
          <v-tabs-items v-model="tabs" v-if="propiedades.length>0">
            <v-tab-item key="1">
              <v-card>
                <v-btn
                  color="primary"
                  @click="setClipboard(nombreSQL)"
                  v-if="propiedades.length>0"
                >{{sqlName}}</v-btn>
                <v-btn
                  color="success"
                  @click="setClipboard(sqlCode)"
                  v-if="propiedades.length>0"
                >Copiar consulta</v-btn>

                <!-- <v-card-text>
                  <v-btn color="info" @click="setClipboard(sqlCode)">Copiar Consulta</v-btn>
                </v-card-text>-->
                <codemirror v-model="sqlCode" :options="sqlOption" ref="sqlCRUD"></codemirror>
              </v-card>
            </v-tab-item>
            <v-tab-item key="2">
              <v-card>
                <v-btn color="primary" @click="setClipboard(nombreRoute)">{{nombreRoute}}</v-btn>
                <v-btn color="success" @click="setClipboard(routeCode)">Copiar Código</v-btn>
                <codemirror v-model="routeCode" :options="jsOption"></codemirror>
              </v-card>
            </v-tab-item>
            <v-tab-item key="3">
              <v-card>
                <!-- <v-card-text> -->
                <v-btn
                  color="primary"
                  @click="setClipboard(nombreModel)"
                  v-if="propiedades.length>0"
                >{{nombreModel}}</v-btn>
                <v-btn
                  color="success"
                  @click="setClipboard(modelCode)"
                  v-if="propiedades.length>0"
                >Copiar Código</v-btn>
                <!-- </v-card-text> -->
                <!-- <v-card-text> -->
                <codemirror v-model="modelCode" :options="jsOption"></codemirror>
                <!-- </v-card-text> -->
              </v-card>
            </v-tab-item>
            <v-tab-item key="4">
              <v-btn
                color="success"
                @click="setClipboard(jsonCode)"
                v-if="propiedades.length>0"
              >Copiar Código</v-btn>
              <codemirror v-model="jsonCode" :options="jsOption"></codemirror>
            </v-tab-item>
            <v-tab-item key="5">
              <v-btn color="primary" @click="setClipboard('Detalles.vue')">Detalles.vue</v-btn>
              <v-btn
                color="success"
                @click="setClipboard(viewCode)"
              >Copiar Código</v-btn>
              <v-btn color="secondary" @click="setClipboard(viewDeclare)">Declaración del Componente</v-btn>
              <codemirror v-model="viewCode" :options="jsOption"></codemirror>
            </v-tab-item>
            <v-tab-item key="6">
              <v-btn color="primary" @click="setClipboard('Formulario.vue')">Formulario.vue</v-btn>
              <v-btn
                color="success"
                @click="setClipboard(formularioCode)"
                v-if="propiedades.length>0"
              >Copiar Código</v-btn>
              <v-btn color="secondary" @click="setClipboard(formularioDeclare)">Declaración del Componente</v-btn>
              <codemirror v-model="formularioCode" :options="jsOption"></codemirror>
            </v-tab-item>
            <v-tab-item key="7">
              <v-btn color="primary" @click="setClipboard('Registros.vue')">Registros.vue</v-btn>
              <v-btn
                color="success"
                @click="setClipboard(registrosCode)"
                v-if="propiedades.length>0"
              >Copiar Código</v-btn>
              <v-btn color="secondary" @click="setClipboard(registrosDeclare)">Declaración del Componente</v-btn>
              <codemirror v-model="registrosCode" :options="jsOption"></codemirror>
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { default as methods } from "./methods";
import { default as computed } from "./computed";
// #region vue-codemirror
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/sql/sql.js";
import "codemirror/theme/solarized.css";
import "codemirror/theme/paraiso-light.css";

// language
import "codemirror/mode/javascript/javascript.js";
// theme css
import "codemirror/theme/monokai.css";
// require active-line.js
import "codemirror/addon/selection/active-line.js";
// styleSelectedText
import "codemirror/addon/selection/mark-selection.js";
import "codemirror/addon/search/searchcursor.js";
// hint
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint.js";
import "codemirror/addon/selection/active-line.js";
// highlightSelectionMatches
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/match-highlighter.js";
// keyMap
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/keymap/sublime.js";
// foldGutter
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";
// #endregion
export default {
  data: () => ({
    tabs: null,
    cargando: false,
    propiedades: {},
    sqlOption: {
      tabSize: 4,
      styleActiveLine: true,
      lineNumbers: true,
      line: true,
      mode: "text/x-mysql",
      theme: "solarized light"
      // theme: "paraiso-light"
    },
    jsOption: {
      tabSize: 4,
      styleActiveLine: false,
      lineNumbers: true,
      styleSelectedText: false,
      line: true,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
      mode: "text/javascript",
      // hint.js options
      hintOptions: {
        // 当匹配只有一项的时候是否自动补全
        completeSingle: false
      },
      //快捷键 可提供三种模式 sublime、emacs、vim
      keyMap: "sublime",
      matchBrackets: true,
      showCursorWhenSelecting: true,
      theme: "monokai",
      extraKeys: { Ctrl: "autocomplete" }
    },
    sqlCode: "",
    modelCode: "",
    routeCode: "",
    jsonCode: "",
    registrosCode: "",
    registrosDeclare: "",
    formularioCode:"",
    formularioDeclare: "",
    sqlName: "",
    basesDeDatos: [],
    basedatos: "",
    tablas: [],
    tabla: "",
    tablaBD: ""
  }),
  methods,
  computed,
  components: {
    codemirror
  },
  watch: {
    tabla() {
      this.sqlName = this.nombreSQL;
      this.sqlCode = this.sqlCRUD;
      this.modelCode = this.modelCRUD;
      this.routeCode = this.routeCRUD;
      this.jsonCode = this.jsonCRUD;
      this.registrosCode = this.browseCode;
      this.registrosDeclare = this.browseDeclare;
      this.formularioCode = this.formCode;
      this.formularioDeclare = this.formDeclare;
    },
    propiedades() {
      this.sqlName = this.nombreSQL;
      this.sqlCode = this.sqlCRUD;
      this.modelCode = this.modelCRUD;
      this.routeCode = this.routeCRUD;
      this.jsonCode = this.jsonCRUD;
      this.registrosCode = this.browseCode;
      this.registrosDeclare = this.browseDeclare;
      this.formularioCode = this.formCode;
      this.formularioDeclare = this.formDeclare;
    },

    basedatos() {
      this.tablas = [];
      this.tablaBD = "";

      this.cargando = true;
      this.$http
        .get(`cgen/tablas/${this.basedatos}`)
        .then(res => {
          this.tablas = res.result.recordset;
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          this.cargando = false;
        });
    }
  },
  mounted() {
    this.cargando = true;
    this.$http
      .get(`cgen/basedatos`)
      .then(res => {
        this.basesDeDatos = res.result.recordset;
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.cargando = false;
      });
  }
};
</script>

<style>
.codemirror {
  border: 1px solid #eee;
  height: auto;
}
</style>
