<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-scroll-y-transition mode="out-in">
          <v-flex xs12 v-if="cargando">
            <v-progress-linear :indeterminate="true"></v-progress-linear>
          </v-flex>
        </v-scroll-y-transition>
      </v-layout>
    </v-container>
    <v-tabs color="cyan" dark slider-color="yellow">
      <v-tab key="1" ripple>Datos Principales</v-tab>
      <v-tab key="2" ripple>Clasificación</v-tab>
      <v-tab key="3" ripple>Inventario</v-tab>
      <v-tab key="4" ripple>Transformaciones</v-tab>
      <v-tab key="5" ripple>Unidosis</v-tab>
      <v-tab key="6" ripple v-show="false">Otras Configuraciones</v-tab>
      <v-tab key="7" ripple>Fabricantes</v-tab>
      <v-tab-item key="1">
        <v-card flat>
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex xs2>
                <v-text-field
                  name="IDARTICULO"
                  label="CODIGO"
                  id="IDARTICULO"
                  ref="IDARTICULO"
                  v-model="model.IDARTICULO"
                  :disabled="editar"
                ></v-text-field>
              </v-flex>

              <v-flex xs2>
                <v-text-field
                  name="IDALTERNA"
                  label="IDALTERNA"
                  id="IDALTERNA"
                  ref="IDALTERNA"
                  v-model="model.IDALTERNA"
                ></v-text-field>
              </v-flex>

              <v-flex xs2>
                <v-combobox
                  name="ESTADO"
                  label="ESTADO"
                  id="ESTADO"
                  ref="ESTADO"
                  v-model="model.ESTADO"
                  :items="['Activo', 'Inactivo']"
                ></v-combobox>
              </v-flex>

              <v-flex xs1>
                <v-autocomplete
                  label="IDITAR"
                  :items="itars"
                  v-model="model.IDITAR"
                  item-value="IDITAR"
                  item-text="IDITAR"
                  no-data-text="Registro no encontrado"
                ></v-autocomplete>
              </v-flex>

              <v-flex xs5>
                <v-autocomplete
                  label="TIPO DE ARTICULO"
                  :items="itars"
                  v-model="model.IDITAR"
                  item-value="IDITAR"
                  item-text="DESCRIPCION"
                  ref="IDITAR"
                  no-data-text="Registro no encontrado"
                ></v-autocomplete>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  name="DESCRIPCION"
                  label="DESCRIPCION"
                  id="DESCRIPCION"
                  ref="DESCRIPCION"
                  v-model="model.DESCRIPCION"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  name="IDSERVICIO"
                  label="IDSERVICIO"
                  id="IDSERVICIO"
                  ref="IDSERVICIO"
                  v-model="model.IDSERVICIO"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 v-if="false">
                <v-btn color="success" @click="guardar">Guardar</v-btn>
                <v-btn @click="$emit('cancelar')">Cancelar</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item key="2">
        <!-- Generico y ATC -->
        <v-card flat>
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex xs12 class="text-sm-left">
                <span class="grey--text">GENERICO</span>
                <v-expansion-panel popout v-model="panelGenerico">
                  <v-expansion-panel-content>
                    <div
                      slot="header"
                    >{{model.IDGENERICO}} {{(generico) ? generico.DESCRIPCION : ""}}</div>
                    <v-card>
                      <genericos @model="elegirGenerico($event)"></genericos>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>

              <!-- Clase -->
              <v-flex xs1>
                <v-autocomplete
                  label="IDCLASE"
                  :items="iclas"
                  v-model="model.IDCLASE"
                  item-value="IDCLASE"
                  item-text="IDCLASE"
                  no-data-text="Registro no encontrado"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs5>
                <v-autocomplete
                  label="CLASE"
                  :items="iclas"
                  v-model="model.IDCLASE"
                  item-value="IDCLASE"
                  item-text="DESCRIPCION"
                  ref="IDCLASE"
                  no-data-text="Registro no encontrado"
                ></v-autocomplete>
              </v-flex>

              <!-- SUBClase -->
              <v-flex xs1>
                <v-autocomplete
                  label="IDSUBCLASE"
                  :items="iclahFiltradas"
                  v-model="model.IDSUBCLASE"
                  item-value="IDSUBCLASE"
                  item-text="IDSUBCLASE"
                  no-data-text="Registro no encontrado"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs5>
                <v-autocomplete
                  label="SUBCLASE"
                  :items="iclahFiltradas"
                  v-model="model.IDSUBCLASE"
                  item-value="IDSUBCLASE"
                  item-text="DESCRIPCION"
                  ref="IDSUBCLASE"
                  no-data-text="Registro no encontrado"
                ></v-autocomplete>
              </v-flex>

              <!-- Grupo -->
              <v-flex xs1>
                <v-autocomplete
                  label="IDGRUPO"
                  :items="igrusFiltrados"
                  v-model="model.IDGRUPO"
                  item-value="IDGRUPO"
                  item-text="IDGRUPO"
                  no-data-text="Registro no encontrado"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs5>
                <v-autocomplete
                  label="GRUPO"
                  :items="igrusFiltrados"
                  v-model="model.IDGRUPO"
                  item-value="IDGRUPO"
                  item-text="DESCRIPCION"
                  ref="IDGRUPO"
                  no-data-text="Registro no encontrado"
                ></v-autocomplete>
              </v-flex>

              <!-- Forma Farmacéutica -->
              <v-flex xs1>
                <v-autocomplete
                  label="IDFORFARM"
                  :items="iffas"
                  v-model="model.IDFORFARM"
                  item-value="IDFORFARM"
                  item-text="IDFORFARM"
                  no-data-text="Registro no encontrado"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs5>
                <v-autocomplete
                  label="IDFORFARM"
                  :items="iffas"
                  v-model="model.IDFORFARM"
                  item-value="IDFORFARM"
                  item-text="DESCRIPCION"
                  ref="IDFORFARM"
                  no-data-text="Registro no encontrado"
                ></v-autocomplete>
              </v-flex>

              <!-- Principio Activo -->
              <v-flex xs2>
                <v-autocomplete
                  label="IDPRINCIPIOACTIVO"
                  :items="ipacs"
                  v-model="model.IDPRINACTIVO"
                  item-value="IDPRINACTIVO"
                  item-text="IDPRINACTIVO"
                  no-data-text="Registro no encontrado"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs10>
                <v-autocomplete
                  label="PRINCIPIO ACTIVO"
                  :items="ipacs"
                  v-model="model.IDPRINACTIVO"
                  item-value="IDPRINACTIVO"
                  item-text="DESCRIPCION"
                  ref="IDPRINACTIVO"
                  no-data-text="Registro no encontrado"
                ></v-autocomplete>
              </v-flex>

              <!-- Concentración -->
              <v-flex xs1>
                <v-autocomplete
                  label="IDCONCENTRA"
                  :items="iccns"
                  v-model="model.IDCONCENTRA"
                  item-value="IDCONCENTRA"
                  item-text="IDCONCENTRA"
                  no-data-text="Registro no encontrado"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs5>
                <v-autocomplete
                  label="CONCENTRACION"
                  :items="iccns"
                  v-model="model.IDCONCENTRA"
                  item-value="IDCONCENTRA"
                  item-text="DESCRIPCION"
                  ref="IDCONCENTRA"
                  no-data-text="Registro no encontrado"
                ></v-autocomplete>
              </v-flex>

              <!-- Unidad de Medida -->
              <v-flex xs2>
                <v-autocomplete
                  label="IDUNIDAD"
                  :items="iunis"
                  v-model="model.IDUNIDAD"
                  item-value="IDUNIDAD"
                  item-text="IDUNIDAD"
                  no-data-text="Registro no encontrado"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs4>
                <v-autocomplete
                  label="IDUNIDAD"
                  :items="iunis"
                  v-model="model.IDUNIDAD"
                  item-value="IDUNIDAD"
                  item-text="DESCRIPCION"
                  ref="IDUNIDAD"
                  no-data-text="Registro no encontrado"
                ></v-autocomplete>
              </v-flex>

              <v-flex xs12 class="text-sm-left">
                <span class="grey--text">PRESENTACION COMERCIAL</span>
                <v-expansion-panel popout v-model="panelPresentacionComercial">
                  <v-expansion-panel-content>
                    <div
                      slot="header"
                    >{{model.PRECOMERCIAL}} {{(tgen_precomercial) ? tgen_precomercial.DESCRIPCION : ""}}</div>
                    <v-card>
                      <!-- <tgen
                        nombre_tabla="IART"
                        nombre_campo="PRECOMERCIAL"
                        @model="elegirPreComercial($event)"
                      ></tgen>-->
                      <v-container grid-list-md text-xs-center>
                        <v-layout row wrap>
                          <v-flex xs10>
                            <v-tooltip top>
                              <div class="text-xs-center" slot="activator">
                                <v-combobox
                                  v-model="palabras"
                                  :items="items_palabras"
                                  label="Escribe aquí las palabras a coincidir en las presentaciones comerciales"
                                  chips
                                  clearable
                                  prepend-icon="filter_list"
                                  solo
                                  multiple
                                  v-on:keyup.ctrl.enter="filtrarPrecomerciales"
                                >
                                  <template slot="selection" slot-scope="data">
                                    <v-chip
                                      :selected="data.selected"
                                      close
                                      @input="remove(data.item)"
                                    >
                                      <strong>{{ data.item }}</strong>&nbsp;
                                      <span v-if="false">(interest)</span>
                                    </v-chip>
                                  </template>
                                </v-combobox>
                              </div>
                              <span>Ctrl+Enter para consultar</span>
                            </v-tooltip>
                          </v-flex>
                          <v-flex xs2>
                            <v-btn @click="filtrarPrecomerciales">Consultar</v-btn>
                          </v-flex>
                          <v-flex xs12>
                            <tabla
                              :columnas="columnas"
                              :filas="filas"
                              :loading="cargando_tabla"
                              @fila="elegirPreComercial($event);"
                              titulo="Presentaciones Comerciales"
                              ref="tabla_precomercial"
                            ></tabla>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item key="3">
        <v-card flat>
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex xs1>
                <v-text-field
                  name="PCOSTO"
                  label="PCOSTO"
                  id="PCOSTO"
                  ref="PCOSTO"
                  v-model="model.PCOSTO"
                  readonly
                  disabled
                ></v-text-field>
              </v-flex>

              <v-flex xs1>
                <v-text-field
                  name="EXISTOTAL"
                  label="EXISTOTAL"
                  id="EXISTOTAL"
                  ref="EXISTOTAL"
                  v-model="model.EXISTOTAL"
                  readonly
                  disabled
                ></v-text-field>
              </v-flex>

              <v-flex xs2>
                <v-text-field
                  name="STOCKMINIMO"
                  label="STOCK MINIMO"
                  id="STOCKMINIMO"
                  ref="STOCKMINIMO"
                  type="number"
                  v-model="model.STOCKMINIMO"
                ></v-text-field>
              </v-flex>

              <v-flex xs2>
                <v-text-field
                  name="STOCKMAXIMO"
                  label="STOCK MAXIMO"
                  id="STOCKMAXIMO"
                  ref="STOCKMAXIMO"
                  type="number"
                  v-model="model.STOCKMAXIMO"
                ></v-text-field>
              </v-flex>

              <v-flex xs2>
                <v-text-field
                  name="PUNTOREORDEN"
                  label="PUNTO REORDEN"
                  id="PUNTOREORDEN"
                  ref="PUNTOREORDEN"
                  type="number"
                  v-model="model.PUNTOREORDEN"
                ></v-text-field>
              </v-flex>

              <v-flex xs2>
                <v-autocomplete
                  label="HEMOCLASIFICACION"
                  :items="hemocomponentes"
                  v-model="model.HEMOCLASIFICACION"
                  item-value="valor"
                  item-text="descripcion"
                  no-data-text="Registro no encontrado"
                ></v-autocomplete>
              </v-flex>

              <v-flex xs2>
                <v-text-field
                  name="CODBARRA"
                  label="CODBARRA"
                  id="CODBARRA"
                  ref="CODBARRA"
                  v-model="model.CODBARRA"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-checkbox
                  name="ALTO_COSTO"
                  id="ALTO_COSTO"
                  ref="ALTO_COSTO"
                  :label="`${(model.ALTO_COSTO) ? 'ES DE ALTO COSTO': 'NO ES DE ALTO COSTO'}`"
                  value="1"
                  v-model="model.ALTO_COSTO"
                ></v-checkbox>
              </v-flex>

              <v-flex xs3>
                <v-checkbox
                  name="CONT_ESPECIAL"
                  id="CONT_ESPECIAL"
                  ref="CONT_ESPECIAL"
                  :label="`${(model.CONT_ESPECIAL) ? 'CONTROLADO': 'NO CONTROLADO'}`"
                  v-model="model.CONT_ESPECIAL"
                  value="1"
                ></v-checkbox>
              </v-flex>

              <v-flex xs3>
                <v-checkbox
                  name="MLOTEO"
                  id="MLOTEO"
                  ref="MLOTEO"
                  :label="`${(model.MLOTEO) ? 'SE LOTEA': 'NO SE LOTEA'}`"
                  v-model="model.MLOTEO"
                  value="1"
                ></v-checkbox>
              </v-flex>

              <v-flex xs3>
                <v-checkbox
                  name="INSTITUCIONAL"
                  id="INSTITUCIONAL"
                  ref="INSTITUCIONAL"
                  :label="`${(model.INSTITUCIONAL) ? 'ES DE USO INSTITUCIONAL': 'NO ES DE USO INSTITUCIONAL'}`"
                  v-model="model.INSTITUCIONAL"
                ></v-checkbox>
              </v-flex>

              <v-flex xs3>
                <v-checkbox
                  name="REGULADO"
                  id="REGULADO"
                  ref="REGULADO"
                  :label="`${(model.REGULADO) ? 'ES REGULADO': 'NO ES REGULADO'}`"
                  v-model="model.REGULADO"
                  value="1"
                ></v-checkbox>
              </v-flex>

              <v-flex xs3>
                <v-checkbox
                  name="NOPOS"
                  id="NOPOS"
                  ref="NOPOS"
                  :label="`${(model.NOPOS) ? 'NOPOS': 'NO ES NOPOS'}`"
                  v-model="model.NOPOS"
                  value="1"
                ></v-checkbox>
              </v-flex>

              <v-flex xs3>
                <v-checkbox
                  name="ESACTIVO"
                  id="ESACTIVO"
                  ref="ESACTIVO"
                  :label="`${(model.ESACTIVO) ? 'ES ACTIVO': 'NO ES ACTIVO'}`"
                  v-model="model.ESACTIVO"
                  value="1"
                ></v-checkbox>
              </v-flex>

              <v-flex xs3 v-if="model.ESACTIVO">
                <v-text-field
                  name="IDTIPOACTIVO"
                  label="IDTIPOACTIVO"
                  id="IDTIPOACTIVO"
                  ref="IDTIPOACTIVO"
                  v-model="model.IDTIPOACTIVO"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-checkbox
                  name="JUSTIFICACION"
                  id="JUSTIFICACION"
                  ref="JUSTIFICACION"
                  :label="`${(model.JUSTIFICACION) ? 'JUSTIFICADO': 'NO JUSTIFICADO'}`"
                  v-model="model.JUSTIFICACION"
                  value="1"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item key="4">
        <v-card>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs4 class="text-sm-left">
                <!-- <span class="grey--text">TRANSFORMABLE</span> -->
                <v-checkbox
                  name="ESTRANSFORMABLE"
                  id="ESTRANSFORMABLE"
                  ref="ESTRANSFORMABLE"
                  :label="`${(model.ESTRANSFORMABLE) ? 'ES TRANSFORMABLE': 'NO ES TRANSFORMABLE'}`"
                  VAL
                  v-model="model.ESTRANSFORMABLE"
                  value="1"
                ></v-checkbox>
                <!-- <v-radio-group v-model="row" row>
                    <v-radio label="Transformable" value="1" ref="ESTRANSFORMABLE"></v-radio>
                    <v-radio label="No Transformable" value="0"></v-radio>
                </v-radio-group>-->
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>

      <v-tab-item key="5">
        <v-card>
          <v-container grif-list-md>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field
                  name="DOSIFICADO"
                  label="DOSIFICADO"
                  id="DOSIFICADO"
                  ref="DOSIFICADO"
                  v-model="model.DOSIFICADO"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  name="NDOSIS"
                  label="NDOSIS"
                  id="NDOSIS"
                  ref="NDOSIS"
                  v-model="model.NDOSIS"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  name="ESCALA_RIESGO"
                  label="ESCALA_RIESGO"
                  id="ESCALA_RIESGO"
                  ref="ESCALA_RIESGO"
                  v-model="model.ESCALA_RIESGO"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  name="LABILIDAD"
                  label="LABILIDAD"
                  id="LABILIDAD"
                  ref="LABILIDAD"
                  v-model="model.LABILIDAD"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  name="TESTABILIDAD"
                  label="TESTABILIDAD"
                  id="TESTABILIDAD"
                  ref="TESTABILIDAD"
                  v-model="model.TESTABILIDAD"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  name="IDSERVICIOBASE"
                  label="IDSERVICIOBASE"
                  id="IDSERVICIOBASE"
                  ref="IDSERVICIOBASE"
                  v-model="model.IDSERVICIOBASE"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  name="CANTIDADBASE"
                  label="CANTIDADBASE"
                  id="CANTIDADBASE"
                  ref="CANTIDADBASE"
                  v-model="model.CANTIDADBASE"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  name="IDSERVICIOMEZCLA"
                  label="IDSERVICIOMEZCLA"
                  id="IDSERVICIOMEZCLA"
                  ref="IDSERVICIOMEZCLA"
                  v-model="model.IDSERVICIOMEZCLA"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  name="CANTIDADMEZCLA"
                  label="CANTIDADMEZCLA"
                  id="CANTIDADMEZCLA"
                  ref="CANTIDADMEZCLA"
                  v-model="model.CANTIDADMEZCLA"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  name="CODIBASE"
                  label="CODIBASE"
                  id="CODIBASE"
                  ref="CODIBASE"
                  v-model="model.CODIBASE"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  name="CENTRAL"
                  label="CENTRAL"
                  id="CENTRAL"
                  ref="CENTRAL"
                  v-model="model.CENTRAL"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>

      <v-tab-item key="6">
        <v-card>
          <v-container grif-list-md>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field
                  name="CODCUM"
                  label="CODCUM"
                  id="CODCUM"
                  ref="CODCUM"
                  v-model="model.CODCUM"
                ></v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-text-field
                  name="REGINVIMA"
                  label="REGINVIMA"
                  id="REGINVIMA"
                  ref="REGINVIMA"
                  v-model="model.REGINVIMA"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  name="F_VIGENCIAINV"
                  label="F_VIGENCIAINV"
                  id="F_VIGENCIAINV"
                  ref="F_VIGENCIAINV"
                  v-model="model.F_VIGENCIAINV"
                  mask="date"
                ></v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-text-field
                  name="CUENTA"
                  label="CUENTA"
                  id="CUENTA"
                  ref="CUENTA"
                  v-model="model.CUENTA"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  name="IDFABRICANTE"
                  label="IDFABRICANTE"
                  id="IDFABRICANTE"
                  ref="IDFABRICANTE"
                  v-model="model.IDFABRICANTE"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-checkbox
                  name="ENTREGA_TURNO"
                  id="ENTREGA_TURNO"
                  ref="ENTREGA_TURNO"
                  :label="`${(model.ENTREGA_TURNO) ? 'VALIDA ENTREGA TURNO': 'NO VALIDA ENTREGA TURNO'}`"
                  v-model="model.ENTREGA_TURNO"
                  value="1"
                ></v-checkbox>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  name="UTILIDAD"
                  label="UTILIDAD"
                  id="UTILIDAD"
                  ref="UTILIDAD"
                  v-model="model.UTILIDAD"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  name="PRINCIPAL"
                  label="PRINCIPAL"
                  id="PRINCIPAL"
                  ref="PRINCIPAL"
                  v-model="model.PRINCIPAL"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  name="CLASERIESGO"
                  label="CLASERIESGO"
                  id="CLASERIESGO"
                  ref="CLASERIESGO"
                  v-model="model.CLASERIESGO"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  name="CONTADOR"
                  label="CONTADOR"
                  id="CONTADOR"
                  ref="CONTADOR"
                  v-model="model.CONTADOR"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  name="IDSERVICIOCOBRO"
                  label="IDSERVICIOCOBRO"
                  id="IDSERVICIOCOBRO"
                  ref="IDSERVICIOCOBRO"
                  v-model="model.IDSERVICIOCOBRO"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field name="CTV" label="CTV" id="CTV" ref="CTV" v-model="model.CTV"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>

      <v-tab-item key="7">
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs12></v-flex>
          </v-layout>
        </v-container>
      </v-tab-item>
    </v-tabs>

    <div class="text-xs-center mt-3">
      <!-- <v-btn @click="next">next tab</v-btn> -->
      <v-btn color="success" @click="guardar">Guardar</v-btn>
      <v-btn @click="$emit('cancelar')">Cancelar</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { default as components } from "../../";
import { default as global_components } from "../../../../../common/components/";
import { default as krycnf_components } from "../../../../krycnf/components";
import { default as methods } from "./methods";
export default {
  name: "frmIart",
  props: ["fila", "editar"],
  data: () => ({
    cargando: false,
    hemocomponentes: [
      { descripcion: "No Aplica", valor: "NA" },
      { descripcion: "Plaquetas", valor: "PLAQUETAS" },
      { descripcion: "Glóbulos Rojos", valor: "GLOBULOS" },
      { descripcion: "Plasma", valor: "Plasma" }
    ],

    model: {
      IDARTICULO: undefined,
      IDCLASE: undefined,
      IDSUBCLASE: undefined,
      IDGRUPO: undefined,
      DESCRIPCION: undefined,
      IDPRINACTIVO: undefined,
      IDFORFARM: undefined,
      IDCONCENTRA: undefined,
      IDUNIDAD: undefined,
      PCOSTO: undefined,
      EXISTOTAL: undefined,
      STOCKMINIMO: undefined,
      STOCKMAXIMO: undefined,
      PUNTOREORDEN: undefined,
      IDITAR: undefined,
      ESTRANSFORMABLE: undefined,
      ESTADO: undefined,
      IDGENERICO: undefined,
      CUENTA: undefined,
      IDFABRICANTE: undefined,
      ESACTIVO: undefined,
      IDTIPOACTIVO: undefined,
      IDALTERNA: undefined,
      REGINVIMA: undefined,
      ALTO_COSTO: undefined,
      CONT_ESPECIAL: undefined,
      ENTREGA_TURNO: undefined,
      UTILIDAD: undefined,
      DOSIFICADO: undefined,
      NDOSIS: undefined,
      CODCUM: undefined,
      ESCALA_RIESGO: undefined,
      IDSERVICIO: undefined,
      PRINCIPAL: undefined,
      CLASERIESGO: undefined,
      TESTABILIDAD: undefined,
      // CLASE: undefined,
      MLOTEO: undefined,
      IDSERVICIOBASE: undefined,
      CANTIDADBASE: undefined,
      IDSERVICIOMEZCLA: undefined,
      CANTIDADMEZCLA: undefined,
      CODIBASE: undefined,
      CENTRAL: undefined,
      IDSERVICIOCOBRO: undefined,
      CTV: undefined,
      F_VIGENCIAINV: undefined,
      REGULADO: undefined,
      PRECOMERCIAL: undefined,
      NOPOS: undefined,
      CONTADOR: undefined,
      // GRUPO: undefined,
      LABILIDAD: undefined,
      INSTITUCIONAL: undefined,
      HEMOCLASIFICACION: undefined,
      JUSTIFICACION: undefined,
      CODBARRA: undefined
    },
    fabricante: {
      IDARTICULO: undefined,
      IDCLASE: undefined,
      IDSUBCLASE: undefined,
      IDGRUPO: undefined,
      DESCRIPCION: undefined,
      IDPRINACTIVO: undefined,
      IDFORFARM: undefined,
      IDCONCENTRA: undefined,
      IDUNIDAD: undefined,
      PCOSTO: undefined,
      EXISTOTAL: undefined,
      STOCKMINIMO: undefined,
      STOCKMAXIMO: undefined,
      PUNTOREORDEN: undefined,
      IDITAR: undefined,
      ESTRANSFORMABLE: undefined,
      ESTADO: undefined,
      IDGENERICO: undefined,
      CUENTA: undefined,
      IDFABRICANTE: undefined,
      ESACTIVO: undefined,
      IDTIPOACTIVO: undefined,
      IDALTERNA: undefined,
      REGINVIMA: undefined,
      ALTO_COSTO: undefined,
      CONT_ESPECIAL: undefined,
      ENTREGA_TURNO: undefined,
      UTILIDAD: undefined,
      DOSIFICADO: undefined,
      NDOSIS: undefined,
      CODCUM: undefined,
      ESCALA_RIESGO: undefined,
      IDSERVICIO: undefined,
      PRINCIPAL: undefined,
      CLASERIESGO: undefined,
      TESTABILIDAD: undefined,
      MLOTEO: undefined,
      IDSERVICIOBASE: undefined,
      CANTIDADBASE: undefined,
      IDSERVICIOMEZCLA: undefined,
      CANTIDADMEZCLA: undefined,
      CODIBASE: undefined,
      CENTRAL: undefined,
      IDSERVICIOCOBRO: undefined,
      CTV: undefined,
      F_VIGENCIAINV: undefined,
      REGULADO: undefined,
      PRECOMERCIAL: undefined,
      NOPOS: undefined,
      CONTADOR: undefined,
      LABILIDAD: undefined,
      INSTITUCIONAL: undefined,
      HEMOCLASIFICACION: undefined,
      JUSTIFICACION: undefined,
      CODBARRA: undefined
    },
    fabricantes: [],
    hermanos: [],
    generico: {
      IDGENERICO: undefined,
      DESCRIPCION: undefined,
      IDCLASE: undefined,
      IDSUBCLASE: undefined,
      IDGRUPO: undefined,
      IDPRINACTIVO: undefined,
      IDTGENERICO: undefined
    },
    panelGenerico: [],
    panelPresentacionComercial: [],
    precomercial: [],

    tgen_precomercial: {
      TABLA: undefined,
      CAMPO: undefined,
      CODIGO: undefined,
      DESCRIPCION: undefined,
      VALOR1: undefined,
      DATO1: undefined,
      DFECHA: undefined,
      OPCIONESLIBRES: undefined,
      VALORINI: undefined,
      VALORFIN: undefined,
      VALOR2: undefined,
      DATO2: undefined
    },
    cargando_tabla: false,
    filas: [],
    columnas: [],
    items_palabras: [],
    palabras: []
  }),
  mounted() {
    if (this.fila) {
      this.model = this.fila;
    }
    if (this.iclas.length <= 0) {
      this.refrescarIclas();
    }
    if (this.iclahs.length <= 0) {
      this.refrescarIclahs();
    }
    if (this.igrus.length <= 0) {
      this.refrescarIgrus();
    }
    if (this.ipacs.length <= 0) {
      this.refrescarIpacs();
    }
    if (this.iffas.length <= 0) {
      this.refrescarIffas();
    }
    if (this.iccns.length <= 0) {
      this.refrescarIccns();
    }
    if (this.iunis.length <= 0) {
      this.refrescarIunis();
    }
    if (this.itars.length <= 0) {
      this.refrescarItars();
    }
    var self = this;
    setInterval(() => {
      self.tgen_precomercial = self.precomercials.filter(function(el) {
        return el.CODIGO == self.model.PRECOMERCIAL;
      })[0];
    }, 5000);
  },
  methods,
  computed: {
    ...mapGetters("kinv", [
      "iclas",
      "iclahs",
      "igrus",
      "ipacs",
      "iffas",
      "iccns",
      "iunis",
      "itars",
      "precomercials"
    ]),
    iclahFiltradas() {
      var _idclase = this.model.IDCLASE;
      return this.iclahs.filter(function(el) {
        return el.IDCLASE == _idclase;
      });
    },
    igrusFiltrados() {
      var _idsubclase = this.model.IDSUBCLASE;
      return this.igrus.filter(function(el) {
        return el.IDSUBCLASE == _idsubclase;
      });
    }
  },
  watch: {
    "model.IDCLASE"() {
      this.$refs.IDSUBCLASE.focus();
    },
    // "model.IDSUBCLASE"(){
    //   this.$refs.IDGRUPO.focus();
    // }
    "model.IDGENERICO"() {
      if (this.model.IDGENERICO && this.model.IDGENERICO !== "") {
        this.panelGenerico = null;
        this.$http
          .get(`igen/${this.model.IDGENERICO}`)
          .then(res => {
            this.generico = res.result.recordset[0];
            this.model.IDPRINACTIVO = this.generico.IDPRINACTIVO;
            this.model.IDCLASE = this.generico.IDCLASE;
            this.model.IDSUBCLASE = this.generico.IDSUBCLASE;
            this.model.IDGRUPO = this.generico.IDGRUPO;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    "model.PRECOMERCIAL"() {
      // if(!this.tgen_precomercial.DESCRIPCION || this.tgen_precomercial.DESCRIPCION===""){
      //   this.$http//.get(`tgen/${this.TABLA}/${this.CAMPO}/`)
      //   ebert
      //   alert("")
      // }
    },
    "model.IDARTICULO"() {
      this.cargarHermanos();
    }
  },
  components: {
    Genericos: components.IGEN,
    Tgen: krycnf_components.TGENRegistros,
    Tabla: global_components.DataTabla
  }
};
</script>
    