<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" color="teal lighten-1">Datos Generales</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2" color="teal lighten-1">Datos Específicos</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3" color="teal lighten-1">Solicitud</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4" color="teal lighten-1">Observaciones</v-stepper-step>
        <v-progress-linear :indeterminate="true" v-if="cargando" color="teal lighten-1"></v-progress-linear>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div>
            <v-expansion-panel v-model="panelAfi" expand>
              <v-expansion-panel-content
                ripple
                :class="((aut.IDAFILIADO&&aut.IDAFILIADO!=='')?'grey':'error') +' lighten-3'"
              >
                <div slot="header">
                  <div class="title font-italic" v-if="!aut.IDAFILIADO || aut.IDAFILIADO===''">
                    <v-icon color="error">accessible</v-icon>
                    <font color="error">Elegir Paciente</font>
                  </div>

                  <div class="title" v-else>
                    <v-icon color="success">check</v-icon>
                    <font color="success">{{nombre_afi}} ({{afi.TIPO_DOC}} {{afi.DOCIDAFILIADO}})</font>
                  </div>
                </div>
                <v-card>
                  <afi-elegir @model="afi=$event" :elegir="true"></afi-elegir>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </div>

          <template>
            <v-container grid-list-md text-xs-center>
              <v-layout row wrap>
                <v-flex xs10>
                  <v-autocomplete
                    label="Institución Prestadora de Salud (IPS)"
                    :items="ipss"
                    v-model="aut.IDIPS"
                    item-value="IDTERCERO"
                    item-text="RAZONSOCIAL"
                    no-data-text="Registro no encontrado"
                  ></v-autocomplete>
                </v-flex>
                <!-- <v-flex xs1>
                <v-btn flat icon color="green" >
                  <v-icon>cached</v-icon>
                </v-btn>
                </v-flex>-->
                <v-flex xs2>
                  <FormTER idcategoria="IPS" @refrescar_registros="actualizarIpss"></FormTER>
                </v-flex>
                <v-flex xs10>
                  <v-autocomplete
                    label="Entidad Promotora de Salud (EPS)"
                    :items="epss"
                    v-model="aut.IDTERCEROCA"
                    item-value="IDTERCERO"
                    item-text="RAZONSOCIAL"
                    no-data-text="Registro no encontrado"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs2>
                  <FormTER idcategoria="EPS" @refrescar_registros="actualizarEpss"></FormTER>
                </v-flex>
                <v-flex xs4>
                  <v-autocomplete
                    v-validate="'required'"
                    :items="items"
                    v-model="aut.ORIGEN"
                    :error-messages="errors.collect('medio')"
                    label="Medio de la Solicitud"
                    data-vv-name="medio"
                    required
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs4>
                  <v-text-field
                    v-model="aut.NUMAUTORIZA"
                    ref="NUMAUTORIZA"
                    label="Número de Autorización"
                  ></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field
                    name="NOAUT"
                    label="Número de Siniestro"
                    id="NOAUT"
                    v-model="aut.NOAUT"
                  ></v-text-field>
                </v-flex>

                <v-flex xs1>
                  <v-autocomplete
                    label="IDDX"
                    :items="mdxs"
                    item-text="IDDX"
                    item-value="IDDX"
                    v-model="aut.DXPPAL"
                    no-data-text="IDDX no encontrado"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs11>
                  <v-autocomplete
                    label="Diagnóstico Clínico Principal"
                    :items="mdxs"
                    item-text="DESCRIPCION"
                    item-value="IDDX"
                    v-model="aut.DXPPAL"
                    no-data-text="Diagnóstico no encontrado"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs1>
                  <v-autocomplete
                    label="IDDX"
                    :items="mdxs"
                    item-text="IDDX"
                    item-value="IDDX"
                    v-model="aut.DXRELACIONADO"
                    no-data-text="IDDX no encontrado"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs11>
                  <v-autocomplete
                    label="Diagnóstico Clínico Relacionado"
                    :items="mdxs"
                    item-text="DESCRIPCION"
                    item-value="IDDX"
                    v-model="aut.DXRELACIONADO"
                    no-data-text="Diagnóstico no encontrado"
                  ></v-autocomplete>
                </v-flex>

                <v-flex xs12>
                  <v-expansion-panel popout>
                    <v-expansion-panel-content
                      :class="((archivos.length>0)?'grey':'error') +' lighten-3'"
                    >
                      <v-flex xs12>
                        <input
                          class="btn btn-warning btn-sm btn-block"
                          type="file"
                          name="archivo"
                          id="archivo"
                          ref="archivo"
                          v-on:change="mostrarArchivo"
                          v-show="false"
                        >
                        <!-- accept="application/pdf"  -->
                        <v-text-field
                          v-model="nombreArchivo"
                          label="Archivo"
                          append-outer-icon="attach_file"
                          @click="elegirArchivo"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-autocomplete
                          v-if="nombreArchivo!==''"
                          label="Tipo de Documento"
                          :items="docXTpo"
                          item-value="CODIGO"
                          item-text="DESCRIPCION"
                          v-model="archivo.TIPODOC"
                          no-data-text="Registro no encontrado"
                        ></v-autocomplete>
                      </v-flex>
                      <v-flex xs3>
                        <v-btn
                          color="primary"
                          :disabled="!archivo.TIPODOC || archivo.TIPODOC===''"
                          @click="agregarArchivo"
                        >Agregar Documento</v-btn>
                      </v-flex>
                      <div slot="header">Listado de Archivos ({{archivos.length}})</div>
                      <v-card>
                        <v-list two-line>
                          <template v-for="(item, index) in archivos">
                            <v-list-tile :key="index" avatar @click="quitarArchivo(item)">
                              <!-- <v-list-tile-avatar>
                                <img :src="item.avatar">
                              </v-list-tile-avatar>-->
                              <v-list-tile-content>
                                <v-list-tile-title v-html="`${tipoArchivo(item.TIPODOC)}`"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="item.file.name"></v-list-tile-sub-title>
                              </v-list-tile-content>
                            </v-list-tile>
                          </template>
                        </v-list>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-flex>
              </v-layout>
            </v-container>
          </template>

          <v-btn color="teal lighten-1" @click="e1 = 2" class="white--text">Siguiente</v-btn>

          <v-btn flat :to="{name:'autorizaciones'}">Cancelar</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <template>
            <v-layout column justify-center>
              <v-expansion-panel popout v-model="panelMed">
                <v-expansion-panel-content
                  hide-actions
                  :class="((aut.IDSOLICITANTE&&aut.IDSOLICITANTE!=='')?'grey':'error') +' lighten-3'"
                >
                  <v-layout slot="header" align-center row spacer>
                    <v-flex xs4 sm2 md1>
                      <v-avatar slot="activator" size="36px" :tile="true">
                        <img
                          :src="(!aut.IDSOLICITANTE || aut.IDSOLICITANTE==='')?'/src/assets/images/medical/Chief of Staff 2 Warning.ico':'/src/assets/images/medical/Chief of Staff 2 Check.ico'"
                          alt="Avatar"
                        >
                      </v-avatar>
                    </v-flex>

                    <v-flex sm5 md7 hidden-xs-only>
                      <strong
                        v-html="(aut.IDSOLICITANTE && aut.IDSOLICITANTE!=='')?med.NOMBRE:'Seleccione Médico que Atiende al Paciente'"
                      ></strong>
                      <span
                        v-if="aut.IDSOLICITANTE && aut.IDSOLICITANTE!==''"
                        class="grey--text"
                      >&nbsp;({{ aut.IDSOLICITANTE }})</span>
                    </v-flex>

                    <v-flex no-wrap xs5 sm3>
                      <strong v-html="especialidad"></strong>
                    </v-flex>
                  </v-layout>

                  <v-card>
                    <v-divider></v-divider>
                    <medicos @model="med=$event"></medicos>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel popout v-model="panelIPS" v-if="false">
                <v-expansion-panel-content
                  hide-actions
                  :class="((aut.IDIPS&&aut.IDIPS!=='')?'grey':'error') +' lighten-3'"
                >
                  <v-layout slot="header" align-center row spacer>
                    <v-flex xs4 sm2 md1>
                      <v-avatar slot="activator" size="36px" :tile="true">
                        <img
                          :src="`/src/assets/images/medical/Hospital 2 ${(!aut.IDIPS || aut.IDIPS==='')?'Warning':'Check'}.ico`"
                          alt="Avatar"
                        >
                      </v-avatar>
                    </v-flex>

                    <v-flex sm12 md7 hidden-xs-only>
                      <strong
                        v-html="(aut.IDIPS && aut.IDIPS!=='')?ips.RAZONSOCIAL:'Seleccione IPS donde se Atiende el Paciente'"
                      ></strong>
                      <span
                        v-if="aut.IDIPS && aut.IDIPS!==''"
                        class="grey--text"
                      >&nbsp;({{ aut.IDIPS }})</span>
                    </v-flex>

                    <!-- <v-flex no-wrap xs5 sm3>
                    <strong v-html="especialidad"></strong>
                    </v-flex>-->
                  </v-layout>

                  <v-card>
                    <v-divider></v-divider>
                    <medicos @model="med=$event"></medicos>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <template>
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex xs4>
                      <v-text-field
                        name="FECHAREALIZACION"
                        label="Fecha de Atención"
                        id="FECHAREALIZACION"
                        v-model="fecharealizacion"
                        mask="date"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        name="FECHASOL"
                        label="Fecha Autorización"
                        id="FECHASOL"
                        v-model="fechasol"
                        mask="date"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-text-field
                        name="FECHAGEN"
                        label="Fecha Recepción"
                        id="FECHAGEN"
                        v-model="fechagen"
                        mask="date-with-time"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                      <v-autocomplete
                        label="Tipo de Atención"
                        :items="['Ambulatoria', 'Hospitalaria']"
                        v-model="aut.ATENCION"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs2>
                      <v-checkbox label="Urgencia" v-model="urgencia"></v-checkbox>
                    </v-flex>
                    <v-flex xs4 v-if="false">
                      <v-autocomplete
                        label="Departamento Donde Atendieron al Paciente"
                        :items="deps"
                        v-model="departamento"
                        item-text="NOMBRE"
                        item-value="DPTO"
                        no-data-text="Registro no encontrado"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex xs6>
                      <v-text-field
                        name="FUNCIONARIO_AUT"
                        label="Nombre del Funcionario que dió la autorización"
                        id="FUNCIONARIO_AUT"
                        v-model="aut.FUNCIONARIO_AUT"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                      <hr>
                      <h2>Dirección de Envío</h2>
                      <hr>
                    </v-flex>
                    <v-flex xs4>
                      <v-autocomplete
                        label="Ciudad de Envío"
                        :items="cius"
                        v-model="ciudad"
                        item-text="NOMBRE"
                        item-value="CIUDAD"
                        no-data-text="Registro no encontrado"
                        :hint="nombre_departamento"
                        persistent-hint
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs12>
                      <v-scroll-y-transition
                        mode="out-in"
                        v-if="aut.DIRECCION && aut.DIRECCION!==''"
                      >
                        <v-toolbar dark color="success lighten-3">
                          <v-toolbar-title class="black--text">Dirección: {{aut.DIRECCION}}</v-toolbar-title>

                          <v-spacer></v-spacer>

                          <v-btn icon @click="editarDireccion">
                            <v-icon>edit</v-icon>
                          </v-btn>
                        </v-toolbar>
                      </v-scroll-y-transition>
                      <v-scroll-y-transition mode="in-out">
                        <direccionador
                          @direccion="aut.DIRECCION = $event"
                          v-show="!aut.DIRECCION || aut.DIRECCION===''"
                          ref="direccionador"
                        ></direccionador>
                      </v-scroll-y-transition>
                    </v-flex>
                  </v-layout>
                </v-container>
              </template>
            </v-layout>
          </template>

          <v-btn color="teal lighten-1" @click="e1 = 3" class="white--text">Siguiente</v-btn>

          <v-btn flat @click="e1--">Regresar</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <template>
            <v-container grid-list-md text-xs-center>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-autocomplete
                    label="Contratante"
                    :items="contratantes"
                    v-model="aut.IDCONTRATANTE"
                    item-value="IDTERCERO"
                    item-text="RAZONSOCIAL"
                    no-data-text="Registro no encontrado"
                    :disabled="servicios.length>0"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 v-if="plns.length>0">
                  <v-autocomplete
                    label="Planes del Tercero"
                    :items="plns"
                    v-model="aut.IDPLAN"
                    item-value="IDPLAN"
                    item-text="DESCPLAN"
                    no-data-text="Registro no encontrado"
                    :disabled="servicios.length>0"
                  ></v-autocomplete>
                </v-flex>

                <v-flex xs12 v-show="servicios_del_plan.length>0">
                  <v-tooltip top>
                    <div class="text-xs-center" slot="activator">
                      <v-combobox
                        v-model="palabras"
                        :items="items_palabras"
                        label="Escribe aquí las palabras a coincidir en los artículos a consultar"
                        chips
                        clearable
                        prepend-icon="filter_list"
                        solo
                        multiple
                      >
                        <template slot="selection" slot-scope="data">
                          <v-chip
                            :selected="data.selected"
                            close
                            @input="descartarPalabra(data.item)"
                          >
                            <strong>{{ data.item }}</strong>&nbsp;
                            <span v-if="false">(interest)</span>
                          </v-chip>
                        </template>
                      </v-combobox>
                    </div>
                    <span>Enter para agregar palabra</span>
                  </v-tooltip>
                </v-flex>
                <v-flex xs2 v-show="servicios_del_plan.length>0">
                  <v-autocomplete
                    label="Código"
                    :items="articulos"
                    v-model="ser.IDSERVICIO"
                    item-value="CODIGO"
                    item-text="CODIGO"
                    no-data-text="Registro no encontrado"
                    ref="IDSERVICIO"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs8 v-show="servicios_del_plan.length>0">
                  <v-autocomplete
                    label="Artículo"
                    :items="articulos"
                    v-model="ser.IDSERVICIO"
                    item-value="CODIGO"
                    item-text="ARTICULO"
                    no-data-text="Registro no encontrado"
                    ref="DESCSERVICIO"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs1 v-show="servicios_del_plan.length>0">
                  <v-text-field
                    name="cantidad"
                    label="Cantidad"
                    id="cantidad"
                    v-model="ser.CANTIDAD"
                    type="number"
                    v-on:keypress.enter.prevent="agregarServicio"
                    ref="CANTIDADSERVICIO"
                  ></v-text-field>
                </v-flex>
                <v-flex xs1 v-show="servicios_del_plan.length>0">
                  <v-btn color="primary" @click="agregarServicio">Agregar</v-btn>
                </v-flex>
                <v-flex xs12>
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap v-for="(item, index) in servicios" :key="index">
                      <v-flex xs11>
                        <v-hover style="cursor:pointer">
                          <v-card
                            slot-scope="{ hover }"
                            :class="`elevation-${hover ? 12 : 2}`"
                            class="mx-auto"
                          >
                            <v-card-title @click="descartarArticulo(item)">
                              <v-badge left>
                                <span slot="badge">{{item.CANTIDAD}}</span>
                                {{item.DESCSERVICIO}} ({{item.IDSERVICIO}})
                              </v-badge>
                            </v-card-title>
                            <p
                              class="text-sm-left red--text text--darken-2"
                              v-text="item.COMENTARIOS"
                            ></p>
                            <!-- <v-card-text v-if="item.COMENTARIOS&&item.COMENTARIOS!==''">
                              <p
                                class="text-sm-left red--text text--darken-2"
                                v-text="item.COMENTARIOS"
                              ></p>
                            </v-card-text>-->
                          </v-card>
                        </v-hover>
                      </v-flex>
                      <v-flex xs1>
                        <v-btn
                          color="primary"
                          fab
                          small
                          dark
                          v-if="item.COMENTARIOS&&item.COMENTARIOS!==''"
                          @click="editarComentarios(item)"
                        >
                          <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn
                          outline
                          small
                          fab
                          color="primary"
                          v-else
                          @click="editarComentarios(item)"
                        >
                          <v-icon>edit</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-flex>
                <v-flex xs12 v-if="false">
                  <v-list>
                    <v-list-tile
                      v-for="item in aut.SERVICIOS"
                      :key="item.IDSERVICIO"
                      avatar
                      @click="descartarArticulo(item)"
                    >
                      <v-list-tile-action>{{item.CANTIDAD}}</v-list-tile-action>

                      <v-list-tile-content>
                        <v-list-tile-title v-text="`(${item.IDSERVICIO}) ${item.DESCSERVICIO}`"></v-list-tile-title>
                      </v-list-tile-content>

                      <!-- <v-list-tile-avatar>
                          <img src="/src/assets/images/no-picture.png">
                      </v-list-tile-avatar>-->
                    </v-list-tile>
                  </v-list>
                </v-flex>
              </v-layout>
            </v-container>
          </template>

          <v-btn color="teal lighten-1" @click="e1 = 4" class="white--text">Siguiente</v-btn>

          <v-btn flat @click="e1--">Regresar</v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <template>
            <v-container grid-list-md text-xs-center>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-textarea
                    name="OBS"
                    label="Observaciones sobre la autorización"
                    hint="Escriba en éste espacio la información relevante en cuanto a la autorización"
                    v-model="aut.OBS"
                  ></v-textarea>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    name="OBSDX"
                    label="Observaciones sobre el Diagnóstico"
                    hint="Escriba en éste espacio la información relevante en cuanto al diagnóstico"
                    v-model="aut.OBSDX"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </template>

          <v-btn color="teal lighten-1" class="white--text" @click="guardar">Finalizar</v-btn>

          <v-btn flat @click="e1--">Regresar</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-layout row justify-center>
      <v-dialog v-model="dialogComentarios" persistent max-width="600px">
        <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{servicio_comentario.DESCSERVICIO}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-textarea
                    label="Comentarios y Observaciones"
                    v-model="servicio_comentario.COMENTARIOS"
                    ref="comentarios"
                    v-on:keyup.ctrl.enter="dialogComentarios=false"
                    hint="Presione la tecla Ctrl + Enter para Terminar"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialogComentarios = false">Terminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import { default as methods } from "./methods";
import { default as computed } from "./computed";
import { default as components } from "./components";
import { default as watch } from "./watch";
export default {
  // $_veeValidate: {
  //   validator: "new"
  // },

  data: () => ({
    panelAfi: [false],
    panelMed: [false],
    panelIPS: [false],
    e1: 1,
    cargando: false,
    aut: {
      ORIGEN: "",
      // IDSEDE: "01",
      // IDSEDEORIGEN: "01",
      TIPOAUTORIZACION: "Previa",
      ALTOCOSTO: "No",
      ATENCION: "Ambulatoria",
      URGENCIA: 0,
      IMPUTABLE_A: "Administradora",
      ESTADO: "Solicitada",
      VALORTOTAL: 0,
      VALORCOPAGO: 0,
      VALORBENEFICIO: 0,
      VALOREXEDENTE: 0,
      VALORTOTALCOSTO: 0,
      VALORCOPAGOCOSTO: 0,
      IMPRESO: 0,
      CLASEORDEN: "Normal",
      GENEROCAJA: 0,
      AUTORIZADO: 1,
      CIUDAD: undefined,
      FUNCIONARIO_AUT: undefined,
      FECHAREALIZACION: undefined,
      FECHASOL: undefined,
      FECHAGEN: undefined,

      // -----------------------------
      IDAFILIADO: "",
      AUTORIZADOPOR: "",
      NUMAUTORIZA: "",
      DIRECCION: ""
      // USUARIO: ""
    },
    fecharealizacion: undefined,
    fechasol: undefined,
    fechagen: undefined,
    // ipss: [],
    // epss: [],
    plns: [],
    name: "",
    email: "",
    select: null,
    items: ["Chat", "Correo", "Llamada", "Otro"],
    checkbox: null,
    urgencia: false,
    dictionary: {
      attributes: {
        email: "Correo Electrónico",
        medio: "Medio de la Solicitud"
        // custom attributes
      },
      custom: {
        name: {
          // required: () => "Name can not be empty",
          max: "The name field may not be greater than 10 characters"
          // custom messages
        },
        select: {
          required: "Select field is required"
        }
      }
    },

    archivos: [],
    nombreArchivo: "",
    archivo: {
      TIPODOC: ""
    },
    med: {
      IDMEDICO: undefined,
      TIPO_USUARIO: undefined,
      TIPOVINCULACION: undefined,
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
      ESTADO: undefined,
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
      MINUTOSCAMBIO: undefined
    },
    afi: {},
    ips: {},
    eps: {},
    pln: {},
    ser: { CANTIDAD: 1 },
    departamento: {},
    ciudad: {},
    messages: [
      {
        avatar: "/src/assets/images/medical/Group_Doctors_Check.ico",
        name: "John Leider",
        title: "Welcome to Vuetify.js!",
        excerpt: "Thank you for joining our community..."
      },
      {
        color: "red",
        icon: "people",
        name: "Social",
        new: 1,
        total: 3,
        title: "Twitter"
      },
      {
        color: "teal",
        icon: "local_offer",
        name: "Promos",
        new: 2,
        total: 4,
        title: "Shop your way",
        exceprt: "New deals available, Join Today"
      }
    ],
    contratantes: [],
    lorem:
      "Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.",
    servicios: [],
    dialog_frm_ips: false,
    palabras: [],
    items_palabras: [],
    dialogComentarios: false,
    servicio_comentario: {},
    servicios_del_plan:[]
  }),
  mounted() {
    // this.$validator.localize("es");
    // this.$validator.localize("es", this.dictionary);
    this.actualizarIpss();
    this.actualizarEpss();
    this.actualizarContratantes();
  },

  methods,
  components,
  computed,
  watch
};
</script>

<style>
</style>
