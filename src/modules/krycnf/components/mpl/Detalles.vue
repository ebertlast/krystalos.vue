<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-scroll-y-transition mode="out-in">
        <v-flex xs12 v-if="cargando">
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-flex>
      </v-scroll-y-transition>
      <v-flex xs12>
        <h4>Información Básica de la Plantilla</h4>
        <hr>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs1>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">CODIGO</span>
                    <div>{{(model && model.CLASEPLANTILLA) ? model.CLASEPLANTILLA : ""}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs5>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">NOMBRE</span>
                    <div
                      class="blue--text bold--text"
                    >{{(model && model.DESCPLANTILLA) ? model.DESCPLANTILLA : ""}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">CLASE</span>
                    <div>{{CLASE}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs1>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">AMBITO</span>
                    <div>{{(model && model.AMBITO) ? model.AMBITO : ""}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs1>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">NIV. AUT.</span>
                    <div>{{(model && model.NIVELFUNCIONARIO) ? model.NIVELFUNCIONARIO : ""}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">ESTADO</span>
                    <div
                      :class="(model.ESTADO!=='Activo'?'red--text':'green--text')"
                    >{{(model && model.ESTADO) ? model.ESTADO : ""}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs4>
        <h4>Pide Diagnósticos</h4>
        <hr>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs6>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">PRINCIPAL</span>
                    <div>{{(model && model.PIDEDX) ? (model.PIDEDX=="1"?"SI":"NO") : "NO"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs6>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">RELACIONADOS</span>
                    <div>{{(model && model.PIDEDXR) ? (model.PIDEDXR=="1"?"SI":"NO") : "NO"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs8>
        <h4>Tipo de Plantilla</h4>
        <hr>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">UCI</span>
                    <div>{{(model && model.UCI) ? (model.UCI=="1"?"SI":"NO") : "NO"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">INGRESO UCI</span>
                    <div>{{(model && model.INGUCI) ? (model.INGUCI=="1"?"SI":"NO") : "NO"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">PROGRESIVA</span>
                    <div>{{(model && model.PROGRESIVA) ? (model.PROGRESIVA=="1"?"SI":"NO") : "NO"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">UNICA POR INGRESO</span>
                    <div>{{(model && model.UNICA) ? (model.UNICA=="1" ? "SI" : "NO") : "NO"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">ALTA</span>
                    <div>{{(model && model.DAALTA) ? (model.DAALTA=="1"?"SI":"NO") : "NO"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">TIPO</span>
                    <div>{{HURG}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs12>
        <h4>La Plantilla Maneja</h4>
        <hr>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex x1>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">GRAFICAS</span>
                    <div>{{(model && model.GRAFICA) ? (model.GRAFICA=="1"?"SI":"NO") : "NO"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs1>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">ORDEN MÉDICA</span>
                    <div>{{(model && model.TIENEOM) ? (model.TIENEOM=="1"?"SI":"NO") : "NO"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">EDAD</span>
                    <div>
                      {{(model && model.MEDAD) ? (model.MEDAD=="1"?"SI":"NO") : "NO"}}
                      <template
                        v-if="model.MEDAD==='1'||model.MEDAD===1"
                      >&nbsp;({{model.EDADINI}}-{{model.EDADFIN}})</template>
                    </div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">SIGNOS VITALES</span>
                    <div>{{(model && model.PIDESV) ? (model.PIDESV=="1"?"SI":"NO") : "NO"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">CENTRO DE COSTO</span>
                    <div>{{(model && model.MAREA) ? (model.MAREA=="1"?"SI":"NO") : "NO"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">EXCLUYENTES</span>
                    <div>{{(model && model.TEXCLUYENTES) ? (model.TEXCLUYENTES=="1"?"SI":"NO") : "NO"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">RESOLUCIONES</span>
                    <div>{{(model && model.M4505) ? (model.TEXCLUYENTES=="1"?"SI":"NO") : "NO"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs4>
        <h4>Incluir en Epicrisis</h4>
        <hr>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs6>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">CAMPOS</span>
                    <div>{{(model && model.ENEPICRISIS) ? (model.ENEPICRISIS=="1"?"SI":"NO") : "NO"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs6>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">INCL OM EN EPICRISIS</span>
                    <div>{{(model && model.OM_ENEPICRISIS) ? (model.OM_ENEPICRISIS=="1"?"SI":"NO") : "NO"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs4>
        <h4>En la Impresión Incluye</h4>
        <hr>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs6>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">ORDEN MÉDICA</span>
                    <div>{{(model && model.IMPRIMEOM) ? (model.IMPRIMEOM=="1"?"SI":"NO") : "NO"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs6>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">DATOS EGRESO</span>
                    <div>{{(model && model.IMPDATOSEGRESO) ? (model.IMPDATOSEGRESO=="1"?"SI":"NO") : "NO"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs12>
        <h4>La Plantilla Maneja las Siguientes Restricciones</h4>
        <hr>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">VISTA</span>
                    <div>{{(model && model.RESTRINGEVISTA) ? (model.RESTRINGEVISTA=="1"?"SI":"NO") : "NO"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">NO COPIA OM</span>
                    <div>{{(model && model.NOCOPIAOM) ? (model.NOCOPIAOM=="1"?"SI":"NO") : "NO"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">DIAS</span>
                    <div>{{(model && model.DIASREST) ? model.DIASREST : "0"}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">SEXO</span>
                    <div>{{(model && model.SEXO) ? model.SEXO : ""}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">TIPO SV</span>
                    <div>{{TIPOSV}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">TIPO ESPECIALIDAD</span>
                    <div>{{TIPOESP}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <v-flex xs6>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-card-text class="text-sm-left">
                    <span class="grey--text">ESPECIALIDAD</span>
                    <div
                      v-text="model.ESPECIALIDAD || 'Sin Restricciones de especialidades médicas'"
                    ></div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>

      <v-flex xs3 v-if="false">
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">COMPANIAALTERNA</span>
              <div>{{(model && model.COMPANIAALTERNA) ? model.COMPANIAALTERNA : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs2 v-if="false">
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">TITULOX</span>
              <div>{{(model && model.TITULOX) ? model.TITULOX : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs2 v-if="false">
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">TITULOY</span>
              <div>{{(model && model.TITULOY) ? model.TITULOY : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs2 v-if="false">
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">TRAESERVICIOS</span>
              <div>{{(model && model.TRAESERVICIOS) ? (model.TRAESERVICIOS=="1"?"SI":"NO") : "NO"}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>

      <v-scroll-y-transition mode="out-in" v-if="!cargando">
        <v-flex xs12>
          <v-tooltip top>
            <v-btn slot="activator" color="warning" @click="seleccionar" fab small dark>
              <v-icon>done_outline</v-icon>
            </v-btn>
            <span>Seleccionar</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn slot="activator" color="primary" @click="editarFila" fab small dark>
              <v-icon>edit</v-icon>
            </v-btn>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn slot="activator" color="error" @click="eliminar" fab small dark>
              <v-icon>delete</v-icon>
            </v-btn>
            <span>Eliminar</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn slot="activator" @click="cancelar" fab small>
              <v-icon>undo</v-icon>
            </v-btn>
            <span>Cancelar</span>
          </v-tooltip>
        </v-flex>
      </v-scroll-y-transition>

      <v-flex xs12>
        <hr>
        <hr>
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <template>
              <v-flex
                :xs3="
                  mpld.TIPO_CAMPO.toLowerCase()!=='multicheck' && 
                  mpld.TIPO_CAMPO.toLowerCase()!=='subtitulo' && 
                  mpld.TIPO_CAMPO.toLowerCase()!=='memo' && 
                  mpld.TIPO_CAMPO.toLowerCase()!=='titulo'"
                :xs12="
                mpld.TIPO_CAMPO.toLowerCase()==='multicheck' || 
                mpld.TIPO_CAMPO.toLowerCase()==='subtitulo' || 
                mpld.TIPO_CAMPO.toLowerCase()==='memo' || 
                mpld.TIPO_CAMPO.toLowerCase()==='titulo'
                "
                v-for="(mpld, i) in mplds"
                :key="i"
              >
                <v-card
                  dark
                  color="primary"
                  v-if="mpld.TIPO_CAMPO.toLowerCase()=='subtitulo'"
                >{{mpld.DESCCAMPO}}</v-card>
                <v-card
                  dark
                  color="secondary"
                  v-else-if="mpld.TIPO_CAMPO.toLowerCase()=='titulo'"
                  class="text-uppercase"
                >{{mpld.DESCCAMPO}}</v-card>
                <v-text-field
                  v-else-if="mpld.TIPO_CAMPO.toLowerCase()=='fecha'"
                  :label="mpld.DESCCAMPO"
                  mask="date-with-time"
                ></v-text-field>
                <v-autocomplete
                  :items="detalles(mpld)"
                  :label="mpld.DESCCAMPO"
                  persistent-hint
                  prepend-icon="mdi-city"
                  item-value="VALORLISTA"
                  item-text="VALORLISTA"
                  v-else-if="mpld.TIPO_CAMPO.toLowerCase()=='lista'"
                  no-data-text="Sin datos disponibles para seleccionar"
                ></v-autocomplete>
                <v-text-field
                  v-else-if="mpld.TIPO_CAMPO.toLowerCase()=='alfanumerico'"
                  :label="mpld.DESCCAMPO"
                ></v-text-field>
                <v-textarea
                  v-else-if="mpld.TIPO_CAMPO.toLowerCase()=='memo'"
                  :label="mpld.DESCCAMPO"
                ></v-textarea>
                <v-text-field
                  v-else-if="mpld.TIPO_CAMPO.toLowerCase()=='numerico'"
                  :label="mpld.DESCCAMPO"
                  type="number"
                ></v-text-field>
                <v-autocomplete
                  :items="mpld.data"
                  :label="mpld.DESCCAMPO"
                  persistent-hint
                  prepend-icon="mdi-city"
                  :item-value="mpld.C_KRYSTALOS"
                  :item-text="mpld.D_KRYSTALOS"
                  v-else-if="mpld.TIPO_CAMPO.toLowerCase()=='krystalos'"
                  no-data-text="Sin datos disponibles para seleccionar"
                ></v-autocomplete>
                <!-- <v-container fluid v-else-if="mpld.TIPO_CAMPO.toLowerCase()=='multicheck'">
                </v-container>-->
                <!-- <v-switch
                    :label="`${item.VALORLISTA}`"
                    v-for="(item, index) in detalles(mpld)"
                    :key="index"
                    v-else-if="mpld.TIPO_CAMPO.toLowerCase()=='multicheck'"
                ></v-switch>-->
                <v-container
                  grid-list-md
                  text-xs-center
                  v-else-if="mpld.TIPO_CAMPO.toLowerCase()=='multicheck'"
                >
                  <v-layout row wrap>
                    <v-flex xs12 v-text="mpld.DESCCAMPO">
                      
                    </v-flex>
                    <v-flex xs3 v-for="(item, index) in detalles(mpld)" :key="index">
                      <v-switch
                        :label="`${item.VALORLISTA}`"
                      ></v-switch>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-card dark color="primary" v-else>{{mpld.TIPO_CAMPO}}.........falta crear</v-card>
              </v-flex>
            </template>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["fila"],
  data: () => ({
    cargando: false,
    model: {
      CLASEPLANTILLA: undefined,
      DESCPLANTILLA: undefined,
      COMPANIAALTERNA: undefined,
      NIVELFUNCIONARIO: undefined,
      UNICA: undefined,
      ESTADO: undefined,
      PIDEDX: undefined,
      PIDESV: undefined,
      DAALTA: undefined,
      IMPDATOSEGRESO: undefined,
      SEXO: undefined,
      MEDAD: undefined,
      EDADINI: undefined,
      EDADFIN: undefined,
      CLASE: undefined,
      AMBITO: undefined,
      PIDEDXR: undefined,
      TEXCLUYENTES: undefined,
      GRAFICA: undefined,
      TITULOX: undefined,
      TITULOY: undefined,
      ENEPICRISIS: undefined,
      OM_ENEPICRISIS: undefined,
      TIENEOM: undefined,
      TRAESERVICIOS: undefined,
      TIPOSV: undefined,
      PROGRESIVA: undefined,
      INGUCI: undefined,
      UCI: undefined,
      RESTRINGEVISTA: undefined,
      IDEMEDICA: undefined,
      TIPOESP: undefined,
      M4505: undefined,
      NOCOPIAOM: undefined,
      DIASREST: undefined,
      MAREA: undefined,
      IMPRIMEOM: undefined,
      HURG: undefined
    },

    mpld: {
      CLASEPLANTILLA: undefined,
      CAMPO: undefined,
      NIVELCAMPOHC: undefined,
      SECUENCIA: undefined,
      DESCCAMPO: undefined,
      TIPO_CAMPO: undefined,
      DEFAULT1: undefined,
      MOBS: undefined,
      PREFIJOS: undefined,
      TIPODETALLE: undefined,
      MCANTIDAD: undefined,
      IMPRIMESINDATO: undefined,
      CLASEPLANTILLAORG: undefined,
      CAMPOORG: undefined,
      O_KRYSTALOS: undefined,
      T_KRYSTALOS: undefined,
      C_KRYSTALOS: undefined,
      D_KRYSTALOS: undefined,
      SEXO: undefined,
      EDADINI: undefined,
      EDADFIN: undefined,
      REQUERIDO: undefined,
      DATOENLACE: undefined,
      LONGENLACE: undefined,
      F_KRYSTALOS: undefined,
      FORMULA: undefined,
      CAMPOFORMULA: undefined,
      TIPO_NANDA: undefined,
      IDDXNANDA: undefined,
      ENEPICRISIS: undefined,
      XPOS: undefined,
      YPOS: undefined,
      XNOM: undefined,
      YNOM: undefined,
      NUMCAMPOCLARION: undefined,
      W: undefined,
      H: undefined,
      WNOM: undefined,
      HNOM: undefined,
      NOMNUMCAMPOCLARION: undefined,
      BOTNUMCAMPOCLARION: undefined,
      WBOT: undefined,
      HBOT: undefined,
      XBOT: undefined,
      YBOT: undefined,
      DESNUMCAMPOCLARION: undefined,
      XDES: undefined,
      YDES: undefined,
      WDES: undefined,
      HDES: undefined,
      XP: undefined,
      YP1: undefined,
      YP2: undefined,
      YP3: undefined,
      YP4: undefined,
      YP5: undefined,
      YP6: undefined,
      REQLONG: undefined,
      EJEX: undefined,
      UNIX: undefined,
      EJEY: undefined,
      UNIY: undefined,
      ESCALAX: undefined,
      ESCALAY: undefined,
      TMINIMOX: undefined,
      MINIMOX: undefined,
      TMINIMOY: undefined,
      MINIMOY: undefined,
      IMAGEN: undefined,
      MINREQ: undefined,
      GCOLOR: undefined,
      ESTADO: undefined,
      FINAC: undefined,
      IMPHORA: undefined,
      NOIMPRIME: undefined,
      NOCOPIA: undefined
    },

    mpldl: {
      CLASEPLANTILLA: undefined,
      CAMPO: undefined,
      VALORLISTA: undefined,
      DESCRITO: undefined,
      DATOENLACE: undefined,
      LONGENLACE: undefined,
      XPOS: undefined,
      YPOS: undefined,
      XNOM: undefined,
      YNOM: undefined,
      NUMCAMPOCLARION: undefined,
      W: undefined,
      H: undefined,
      WNOM: undefined,
      HNOM: undefined,
      NOMNUMCAMPOCLARION: undefined,
      BOTNUMCAMPOCLARION: undefined,
      WBOT: undefined,
      HBOT: undefined,
      XBOT: undefined,
      YBOT: undefined,
      VALOR: undefined,
      DESCRIPCION: undefined,
      VALOR1: undefined,
      TIPOCAMPO: undefined
    },

    mplds: [],
    mpldls: []
  }),
  mounted() {
    this.refrescarDatos();
  },
  methods: {
    ...mapActions(["notificacion"]),
    refrescarDatos() {
      if (!this.fila || !this.fila.CLASEPLANTILLA) return;
      this.cargando = true;
      this.model = {};
      this.mplds = [];
      this.mpldls = [];
      this.$http
        .get(`mpl/${this.fila.CLASEPLANTILLA}`)
        .then(res => {
          this.model = res.result.recordset[0];
          // console.log("MPL: ", this.model);
        })
        .then(() => {
          this.$http
            .get(`mpld/${this.model.CLASEPLANTILLA}/`)
            .then(res => {
              this.mplds = res.result.recordset;
              // console.log("MPLD: ", this.mplds);
            })
            .then(() => {
              this.$http
                .get(`mpldl/${this.model.CLASEPLANTILLA}/`)
                .then(res => {
                  this.mpldls = res.result.recordset;
                  // console.log("MPLDL: ", this.mplds);
                })
                .catch(err => {
                  console.log(err);
                })
                .then(() => {
                  // console.log("mpld: ", this.mplds);
                  // console.log("mpldl: ", this.mpldls);
                  this.cargando = false;
                });
            })
            .catch(err => {
              this.cargando = false;
              console.log(err);
            });
        })
        .catch(err => {
          this.cargando = false;
          console.log(err);
        });
    },
    seleccionar() {
      this.$emit("seleccionar", this.model);
    },
    eliminar() {
      return this.notificacion({
        message:
          "No está permitido eliminar un registro de esta tabla, intente inactivarlo",
        type: "error"
      });
    },
    cancelar() {
      this.$emit("cancelar");
    },
    editarFila() {
      this.$emit("editar", this.model);
    },
    detalles(mpld) {
      return this.mpldls.filter(function(el) {
        return (
          el.CLASEPLANTILLA == mpld.CLASEPLANTILLA && el.CAMPO == mpld.CAMPO
        );
      });
    }
  },
  watch: {
    fila() {
      this.refrescarDatos();
    },
    mplds() {
      this.mplds.forEach(mpld => {
        if (mpld.TIPO_CAMPO.toLowerCase() == "krystalos") {
          console.log(mpld.CLASEPLANTILLA, mpld.CAMPO);
          this.$http
            .get(`mpld/campo_krystalos/${mpld.CLASEPLANTILLA}/${mpld.CAMPO}`)
            .then(res => {
              mpld.data = res.result.recordset;
              console.log(
                `Campo Krystalos - ${mpld.CLASEPLANTILLA} - ${mpld.CAMPO}: `,
                mpld.data
              );
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  },
  computed: {
    TIPOSV() {
      var _return = "";
      switch (this.model.TIPOSV) {
        case "001":
          _return = "Traidos por plantilla SV";
          break;
        case "002":
          _return = "En HC";
          break;
        default:
          _return = "Directamente";
          break;
      }
      return _return;
    },
    HURG() {
      var _return = "";
      switch (this.model.HURG) {
        case "1":
          _return = "Adulto";
          break;
        case "2":
          _return = "Pediátrico";
          break;
        case "3":
          _return = "Ginecologica";
          break;
        case "4":
          _return = "Código Azul";
          break;
        case "5":
          _return = "Record Anestesia";
          break;
        case "6":
          _return = "Stock";
          break;
        default:
          _return = "No aplica";
          break;
      }
      return _return;
    },
    CLASE() {
      var _return = "";
      switch (this.model.CLASE) {
        case "NE":
          _return = "Nota Enfermería";
          break;
        case "FT":
          _return = "Fisioterapia";
          break;
        case "OD":
          _return = "Odontología";
          break;
        case "LX":
          _return = "Laboratorio";
          break;
        case "GC":
          _return = "Glucometria";
          break;
        default:
          _return = "Historia Clínica";
          break;
      }
      return _return;
    },
    TIPOESP() {
      var _return = "";
      // 'Inicial|#I|Evolución|#E|No aplica|#N'
      switch (this.model.CLASE) {
        case "I":
          _return = "Inicial";
          break;
        case "E":
          _return = "Evolución";
          break;
        default:
          _return = "No Aplica";
          break;
      }
      return _return;
    }
  }
};
</script>
    