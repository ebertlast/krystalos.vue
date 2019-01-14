export default {
  Tabla() {
    var tabla = this.tablaBD;
    // console.log("Tabla: ", this.tablaBD)
    // console.log("Tablas: ", this.tablas)
    return this.tablas.filter(function (el) { return el.object_id == tabla })[0].name.toUpperCase();
    var tabla = this.tabla.toUpperCase();
    return tabla;
  },
  llaves() {
    var llaves = [];
    for (var i = this.propiedades.length - 1; i >= 0; i--) {
      if (this.propiedades[i].LLAVE === 1) {
        llaves.push(this.propiedades[i]);
      }
    }
    return llaves;
  },
  noLlaves() {
    var llaves = [];
    for (var i = this.propiedades.length - 1; i >= 0; i--) {
      if (this.propiedades[i].LLAVE === 0) {
        llaves.push(this.propiedades[i]);
      }
    }
    return llaves;
  },
  sqlCRUD() {
    const cant_propiedades = this.propiedades ? this.propiedades.length : 0;

    var sql = `IF OBJECT_ID('SPK_CRUD_${
      this.Tabla
      }','P') IS NOT NULL DROP PROCEDURE SPK_CRUD_${this.Tabla}\nGO\n`;
    sql += `CREATE PROCEDURE [dbo].[SPK_CRUD_${this.Tabla}]`;

    // #region Parametros
    sql += `(\n\t@ACCION VARCHAR(10) = 'READ',`;
    for (let index = 0; index < cant_propiedades; index++) {
      const item = this.propiedades[index];
      sql += `\n\t${this.parametro(item, index)}`;
    }
    sql += `)`;
    // #endregion

    sql += "\nWITH ENCRYPTION\nAS\nBEGIN\n";

    // #region CREATE
    sql += `\n\tIF @ACCION = 'CREATE'`;
    sql += `\n\tBEGIN`;
    sql += `\n\t\tINSERT INTO ${this.Tabla}(`;
    var values = "\n\t\tVALUES(";
    for (let index = 0; index < cant_propiedades; index++) {
      const item = this.propiedades[index];
      sql += `\n\t\t\t${item.COLUMNA},`;
      values += `\n\t\t\t@${item.COLUMNA},`;
    }
    sql = sql.substring(0, sql.length - 1);
    sql += `\n\t\t)`;

    values = values.substring(0, values.length - 1);
    sql += values;

    sql += `)\n\tEND\n`;
    // #endregion

    // #region DELETE
    sql += `\n\tIF @ACCION = 'DELETE'`;
    sql += `\n\tBEGIN`;
    sql += `\n\t\t${this.cadenaDelete()}`;
    sql += `\n\tEND\n`;
    // #endregion

    // #region UPDATE
    sql += `\n\tIF @ACCION = 'UPDATE'`;
    sql += `\n\tBEGIN`;
    sql += `\n\t\tUPDATE ${this.Tabla} SET `;
    for (let index = 0; index < this.noLlaves.length; index++) {
      const item = this.noLlaves[index];
      sql += `\n\t\t\t${item.COLUMNA} = ISNULL(@${item.COLUMNA}, ${
        item.COLUMNA
        }),`;
    }
    sql = sql.substring(0, sql.length - 1);
    sql += "\n\t\tWHERE ";
    if (this.llaves.length <= 0) {
      const item = this.noLlaves[0]
      sql += `\n\t\t\t${item.COLUMNA} = @${item.COLUMNA} AND`;

    } else {
      for (let index = 0; index < this.llaves.length; index++) {
        const item = this.llaves[index];
        sql += `\n\t\t\t${item.COLUMNA} = @${item.COLUMNA} AND`;
      }
    }
    sql = sql.substring(0, sql.length - 3);
    sql += `\n\tEND\n`;
    // #endregion

    // #region READ
    sql += `\n\tIF @ACCION = 'READ'`;
    sql += `\n\tBEGIN`;
    sql += `\n\t\tSELECT `;
    for (let index = 0; index < cant_propiedades; index++) {
      const item = this.propiedades[index];
      sql += `\n\t\t\t${item.COLUMNA},`;
    }
    sql = sql.substring(0, sql.length - 1);
    sql += `\n\t\t\tFROM ${this.Tabla}`;
    sql += "\n\t\t\tWHERE 1=1";
    if (this.llaves.length <= 0) {
      const item = this.noLlaves[0];
      sql += `\n\t\t\tAND (@${item.COLUMNA} IS NULL OR ${item.COLUMNA} = @${
        item.COLUMNA
        })`;
    } else {
      for (let index = 0; index < this.llaves.length; index++) {
        const item = this.llaves[index];
        sql += `\n\t\t\tAND (@${item.COLUMNA} IS NULL OR ${item.COLUMNA} = @${
          item.COLUMNA
          })`;
      }
    }
    sql += `\n\tEND\n`;
    // #endregion

    sql += "END\nGO\n";
    // console.log(sql);
    return sql;
  },
  modelCRUD() {
    var code = `var db = require('../core/db');`;
    code += `\ntry {`;

    // #region CREATE
    code += `\n\texports.create = function (dbConfig, params, done) {`;
    code += `\n\t\ttry {`;
    code += `\n\t\t\tvar procedure_name = "SPK_CRUD_${this.Tabla}";`;
    code += `\n\t\t\tvar inputs = [ { nombre: 'ACCION', tipo: 'VARCHAR', tamanio: 10, valor: 'CREATE' } ]`;
    code += `\n\t\t\t//#region ****INPUTS***`;

    for (let index = 0; index < this.propiedades.length; index++) {
      const item = this.propiedades[index];
      if (item.TIPO.toUpperCase() === "DATETIME") {
        code += `\n\t\t\tif(params.${item.COLUMNA}){ inputs.push({ nombre: '${
          item.COLUMNA
          }', tipo: '${item.TIPO.toUpperCase()}', tamanio: ${
          item.TAMANIO
          }, precision: ${item.PRECISION}, valor: (new Date(params.${item.COLUMNA})) });}`;
      } else {
        code += `\n\t\t\tif(params.${item.COLUMNA}){ inputs.push({ nombre: '${
          item.COLUMNA
          }', tipo: '${item.TIPO.toUpperCase()}', tamanio: ${
          item.TAMANIO
          }, precision: ${item.PRECISION}, valor: params.${item.COLUMNA} });}`;
      }
    }

    code += `\n\t\t\t//#endregion`;
    code += `\n\t\t\tdb.execute(dbConfig, procedure_name, inputs, undefined, function (data, err) {\n\t\t\t\tif (err) return done(null, err);\n\t\t\t\treturn done(data);\n\t\t\t});`;
    code += `\n\t\t} catch (ex) { \n\t\t\tthrow ex; \n\t\t}`;
    code += `\n\t};`;
    // #endregion

    // #region READ
    code += `\n\texports.read = function (dbConfig, params, done) {`;
    code += `\n\t\ttry {`;
    code += `\n\t\t\tvar procedure_name = "SPK_CRUD_${this.Tabla}";`;
    code += `\n\t\t\tvar inputs = [ { nombre: 'ACCION', tipo: 'VARCHAR', tamanio: 10, valor: 'READ' } ]`;
    code += `\n\t\t\t//#region ****INPUTS***`;



    if (this.llaves.length <= 0) {
      const item = this.noLlaves[0];
      code += `\n\t\t\tif(params.${item.COLUMNA}){ inputs.push({ nombre: '${
        item.COLUMNA
        }', tipo: '${item.TIPO.toUpperCase()}', tamanio: ${
        item.TAMANIO
        }, precision: ${item.PRECISION}, valor: params.${item.COLUMNA} });}`;
    }

    for (let index = 0; index < this.llaves.length; index++) {
      const item = this.llaves[index];
      code += `\n\t\t\tif(params.${item.COLUMNA}){ inputs.push({ nombre: '${
        item.COLUMNA
        }', tipo: '${item.TIPO.toUpperCase()}', tamanio: ${
        item.TAMANIO
        }, precision: ${item.PRECISION}, valor: params.${item.COLUMNA} });}`;
    }
    code += `\n\t\t\t//#endregion`;

    code += `\n\t\t\tdb.execute(dbConfig, procedure_name, inputs, undefined, function (data, err) {\n\t\t\t\tif (err) return done(null, err);\n\t\t\t\treturn done(data);\n\t\t\t});`;
    code += `\n\t\t} catch (ex) { \n\t\t\tthrow ex; \n\t\t}`;
    code += `\n\t};`;
    // #endregion

    // #region UPDATE
    code += `\n\texports.update = function (dbConfig, params, done) {`;
    code += `\n\t\ttry {`;
    code += `\n\t\t\tvar procedure_name = "SPK_CRUD_${this.Tabla}";`;
    code += `\n\t\t\tvar inputs = [ { nombre: 'ACCION', tipo: 'VARCHAR', tamanio: 10, valor: 'UPDATE' } ]`;
    code += `\n\t\t\t//#region ****INPUTS***`;
    for (let index = 0; index < this.propiedades.length; index++) {
      const item = this.propiedades[index];
      if (item.TIPO.toUpperCase() === "DATETIME") {
        code += `\n\t\t\tif(params.${item.COLUMNA}){ inputs.push({ nombre: '${
          item.COLUMNA
          }', tipo: '${item.TIPO.toUpperCase()}', tamanio: ${
          item.TAMANIO
          }, precision: ${item.PRECISION}, valor: (new Date(params.${item.COLUMNA})) });}`;
      } else {
        code += `\n\t\t\tif(params.${item.COLUMNA}){ inputs.push({ nombre: '${
          item.COLUMNA
          }', tipo: '${item.TIPO.toUpperCase()}', tamanio: ${
          item.TAMANIO
          }, precision: ${item.PRECISION}, valor: params.${item.COLUMNA} });}`;
      }
    }

    code += `\n\t\t\t//#endregion`;
    code += `\n\t\t\tdb.execute(dbConfig, procedure_name, inputs, undefined, function (data, err) {\n\t\t\t\tif (err) return done(null, err);\n\t\t\t\treturn done(data);\n\t\t\t});`;
    code += `\n\t\t} catch (ex) { \n\t\t\tthrow ex; \n\t\t}`;
    code += `\n\t};`;
    // #endregion

    // #region DELETE
    code += `\n\texports.delete = function (dbConfig, params, done) {`;
    code += `\n\t\ttry {`;
    code += `\n\t\t\tvar procedure_name = "SPK_CRUD_${this.Tabla}";`;
    code += `\n\t\t\tvar inputs = [ { nombre: 'ACCION', tipo: 'VARCHAR', tamanio: 10, valor: 'DELETE' } ]`;
    code += `\n\t\t\t//#region ****INPUTS***`;
    if (this.llaves.length <= 0) {
      const item = this.noLlaves[0];
      code += `\n\t\t\tif(params.${item.COLUMNA}){ inputs.push({ nombre: '${
        item.COLUMNA
        }', tipo: '${item.TIPO.toUpperCase()}', tamanio: ${
        item.TAMANIO
        }, precision: ${item.PRECISION}, valor: params.${item.COLUMNA} });}`;
    }
    for (let index = 0; index < this.llaves.length; index++) {
      const item = this.llaves[index];
      code += `\n\t\t\tif(params.${item.COLUMNA}){ inputs.push({ nombre: '${
        item.COLUMNA
        }', tipo: '${item.TIPO.toUpperCase()}', tamanio: ${
        item.TAMANIO
        }, precision: ${item.PRECISION}, valor: params.${item.COLUMNA} });}`;
    }

    code += `\n\t\t\t//#endregion`;
    code += `\n\t\t\tdb.execute(dbConfig, procedure_name, inputs, undefined, function (data, err) {\n\t\t\t\tif (err) return done(null, err);\n\t\t\t\treturn done(data);\n\t\t\t});`;
    code += `\n\t\t} catch (ex) { \n\t\t\tthrow ex; \n\t\t}`;
    code += `\n\t};`;
    // #endregion

    code += `\n} catch (ex) { \n\tthrow ex; \n}`;

    return code;
  },
  routeCRUD() {
    var code = `var m = require("../models/${this.tabla.toLowerCase()}_model");`;
    code += `\nvar app = require('..').app;`;
    code += `\nvar router = require('..').express.Router();`;
    code += `\ntry {`;

    // #region GET
    code += `\n\trouter.get('${this.rutaGet()}', function (req, res) {`;
    code += `\n\t\tm.read(req.dbConfig, req.params, function (data, err) {`;
    code += `\n\t\t\tif (err) {`;
    code += `\n\t\t\t\treturn res.status('500').send(JSON.stringify({ success: false, error: err })).end();`;
    code += `\n\t\t\t} else {`;
    code += `\n\t\t\t\treturn res.status('200').send(JSON.stringify({ success: true, token: req.token, result: data })).end();`;
    code += `\n\t\t\t}`;
    code += `\n\t\t});`;
    code += `\n\t});`;
    // #endregion

    // #region DELETE
    code += `\n\trouter.delete('${this.rutaDelete()}', function (req, res) {`;
    code += `\n\t\tm.delete(req.dbConfig, req.params, function (data, err) {`;
    code += `\n\t\t\tif (err) {`;
    code += `\n\t\t\t\treturn res.status('500').send(JSON.stringify({ success: false, error: err })).end();`;
    code += `\n\t\t\t} else {`;
    code += `\n\t\t\t\treturn res.status('200').send(JSON.stringify({ success: true, token: req.token, result: data })).end();`;
    code += `\n\t\t\t}`;
    code += `\n\t\t});`;
    code += `\n\t});`;
    // #endregion

    // #region PUT
    code += `\n\trouter.put('', function (req, res) {`;
    code += `\n\t\tvar model = JSON.parse(req.body.json).model;`;
    code += `\n\t\tm.create(req.dbConfig, model, function (data, err) {`;
    code += `\n\t\t\tif (err) {`;
    code += `\n\t\t\t\treturn res.status('500').send(JSON.stringify({ success: false, error: err })).end();`;
    code += `\n\t\t\t} else {`;
    code += `\n\t\t\t\treturn res.status('200').send(JSON.stringify({ success: true, token: req.token, result: data })).end();`;
    code += `\n\t\t\t}`;
    code += `\n\t\t});`;
    code += `\n\t});`;
    // #endregion

    // #region POST
    code += `\n\trouter.post('', function (req, res) {`;
    code += `\n\t\tvar model = JSON.parse(req.body.json).model;`;
    code += `\n\t\tm.update(req.dbConfig, model, function (data, err) {`;
    code += `\n\t\t\tif (err) {`;
    code += `\n\t\t\t\treturn res.status('500').send(JSON.stringify({ success: false, error: err })).end();`;
    code += `\n\t\t\t} else {`;
    code += `\n\t\t\t\treturn res.status('200').send(JSON.stringify({ success: true, token: req.token, result: data })).end();`;
    code += `\n\t\t\t}`;
    code += `\n\t\t});`;
    code += `\n\t});`;
    // #endregion

    code += `\n\tapp.use("/${this.tabla.toLowerCase()}/", router);`;

    code += `\n} catch (ex) { \n\tthrow ex; \n}`;

    return code;
  },
  jsonCRUD() {
    var json = `var ${this.Tabla} = {`;
    if (this.propiedades.length > 0)
      this.propiedades.forEach(propiedad => {
        // console.log(propiedad.COLUMNA, propiedad.TIPO)
        json += `\n\t${propiedad.COLUMNA}: undefined,`
      });
    json = json.substr(0, json.length - 1)
    json += "\n}";
    return json;
  },
  nombreSQL() {
    return `SPK_CRUD_${this.Tabla}.sql`;
  },
  nombreModel() {
    return `${this.tabla.toLowerCase()}_model.js`;
  },
  nombreRoute() {
    return `${this.tabla.toLowerCase()}_route.js`;
  },
  browseCode() {
    var js = `<template>
  <tabla
    :columnas="columnas"
    :filas="filas"
    :loading="cargando_tabla"
    @fila="fila=$event;"
    titulo="${this.Tabla}"
    ref="tabla"
  >
    <template slot="detalles">
      <v-scroll-y-transition mode="out-in">
        <detalles @cancelar="cancelar" :fila="fila" v-if="!editar" @editar="editarFila($event)" @seleccionar="seleccionar($event)"></detalles>
      </v-scroll-y-transition>
      <v-scroll-y-transition mode="out-in">
        <v-container grid-list-md text-xs-center v-if="editar">
          <formulario @cancelar="editar=false" @guardar="guardar($event)" :fila="model" ref="formulario_edicion"></formulario>
        </v-container>
      </v-scroll-y-transition>
    </template>
    <template slot="formulario">
      <formulario @cancelar="cancelar" @guardar="guardar($event)" ref="formulario_nuevo"></formulario>
    </template>
  </tabla>\n</template>`;

    var model = `model: {`;
    if (this.propiedades.length > 0)
      this.propiedades.forEach(propiedad => {
        model += `\n\t\t\t${propiedad.COLUMNA}: undefined,`
      });
    model = model.substr(0, model.length - 1)
    model += "\n\t\t}";

    js += `\n\n<script>
import { default as global_components } from "../../../../common/components/";
import { default as components } from "../";
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    cargando: false,
    fila: {},
    filas: [],
    columnas: [],
    cargando_tabla: false,
    ${model},
    editar: false
  }),
  components: {
    Tabla: global_components.DataTabla,
    EnConstruccion: global_components.EnConstruccion,
    Detalles: components.${this.Tabla}Detalles,
    Formulario: components.${this.Tabla}Formulario
  },
  mounted() {
    this.recargarFilas();
  },
  methods: {
    ...mapActions(["notificacion"]),
    recargarFilas() {
      this.cargando_tabla = true;
      this.filas = [];
      this.columnas = [];
      this.$http
        .get(\`${this.tabla.toLowerCase()}\`)
        .then(res => {
          this.filas = res.result.recordset;
          this.columnas = [];
          Object.keys(this.filas[0]).forEach(col => {
            this.columnas.push({ text: col.replace("_", " "), value: col });
          });
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          this.cargando_tabla = false;
        });
    },
    seleccionar(model) {
      this.model = model;
      console.log(this.model);
      this.$emit("model", this.model);
      this.$refs.tabla.cerrarDialog();
    },
    editarFila(_model) {
      this.model = _model;
      this.editar = true;
    },
    guardar(_model) {
      const json = "json=" + JSON.stringify({ model: _model });
      this.cargando = true;
      if (!this.editar) {
        this.$http
          .put(\`${this.tabla.toLowerCase()}\`, json)
          .then(res => {
            this.cargando = false;
            if (res.success) {
              this.recargarFilas();
              this.notificacion({
                message:
                  "Registro Agregado a la Base de Datos Satisfactoriamente",
                type: "success"
              });
              this.$refs.tabla.cerrarDialog();
            } else {
              this.notificacion({
                message:
                  "Problemas al Intentar Realizar el Registro en la Base de Datos",
                type: "error"
              });
            }
          })
          .catch(err => {
            console.log(err);
          })
          .then(() => {
            this.cargando = false;
          });
      } else {
        this.$http
          .post(\`${this.tabla.toLowerCase()}\`, json)
          .then(res => {
            this.cargando = false;
            if (res.success) {
              this.recargarFilas();
              this.notificacion({
                message: "Registro Actualizado Satisfactoriamente",
                type: "success"
              });
              this.editar = false;
            } else {
              this.notificacion({
                message:
                  "Problemas al Intentar Actualizar el Registro en la Base de Datos",
                type: "error"
              });
            }
          })
          .catch(err => {
            console.log(err);
          })
          .then(() => {
            this.cargando = false;
          });
      }
    },
    cancelar() {
      this.$refs.tabla.cerrarDialog();
    },
  }
};
</script>`
    return js;
  },
  browseDeclare() {
    return `const ${this.Tabla}Registros = resolve => {
  require.ensure(
    ["./${this.tabla.toLowerCase()}/Registros.vue"],
    () => {
      resolve(require("./${this.tabla.toLowerCase()}/Registros.vue"));
    },
    "__SUSTITUIR__"
  );
};`
  },
  viewCode() {
    var model = `model: {`;
    if (this.propiedades.length > 0)
      this.propiedades.forEach(propiedad => {
        model += `\n\t\t${propiedad.COLUMNA}: undefined,`
      });
    model = model.substr(0, model.length - 1)
    model += "\n\t}";

    var rutaGet = "\`" + this.tabla.toLowerCase();
    this.llaves.forEach(element => {
      rutaGet += `/\$\{this.fila.${element.COLUMNA}\}`;
    });
    rutaGet += "\`";

    var validacion = "if(!this.fila ||";
    this.llaves.forEach(element => {
      validacion += `!this.fila.${element.COLUMNA} ||`;
    });
    validacion = validacion.substr(0, validacion.length - 2);
    validacion += ") return;";
    // if (this.llaves.length <= 0) { this.validacion = ""; }


    var js = `<template>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-scroll-y-transition mode="out-in">
        <v-flex xs12 v-if="cargando">
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-flex>
      </v-scroll-y-transition>`;
    if (this.propiedades.length > 0) {
      this.propiedades.forEach(propiedad => {
        js += `
      <v-flex xs3>
        <v-hover>
          <v-card slot-scope="\{ hover \}" :class="\`elevation-\$\{hover ? 12 : 2\}\`" class="mx-auto">
            <v-card-text class="text-sm-left">
              <span class="grey--text">${propiedad.COLUMNA}</span>
              <div>{{(model && model.${propiedad.COLUMNA}) ? model.${propiedad.COLUMNA} : ""}}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>`
      });
    }
    js += `
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
    </v-layout>
  </v-container>
</template>`;
    js += `
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["fila"],
  data:()=>({
    cargando: false,
    ${model}
  }),
  mounted() {
    this.refrescarDatos();
  },
  methods: {
    ...mapActions(["notificacion"]),
    refrescarDatos() {
      ${validacion}
      this.cargando = true;
      this.model = {};
      this.$http
        .get(${rutaGet})
        .then(res => {
          this.model = res.result.recordset[0];
        })
        .then(() => {
          this.cargando = false;
        })
        .catch(err => {
          this.cargando = false;
        });
    },
    seleccionar() {
      this.$emit("seleccionar", this.model);
    },
    eliminar() {
      return this.notificacion({
        message: "No está permitido eliminar un registro de esta tabla, intente inactivarlo",
        type: "error"
      });
    },
    cancelar() {
      this.$emit("cancelar");
    },
    editarFila() {
      this.$emit("editar", this.model);
    },
  },
  watch: {
    fila() {
      this.refrescarDatos();
    }
  }
}
</script>
    `;
    return js;
  },
  viewDeclare() {
    return `const ${this.Tabla}Detalles = resolve => {
  require.ensure(
    ["./${this.tabla.toLowerCase()}/Detalles.vue"],
    () => {
      resolve(require("./${this.tabla.toLowerCase()}/Detalles.vue"));
    },
    "__SUSTITUIR__"
  );
};`
  },
  formCode() {
    
    var fields = "";

    var model = `model: {`;
    if (this.propiedades.length > 0)
      this.propiedades.forEach(propiedad => {
        model += `\n\t\t\t${propiedad.COLUMNA}: undefined,`

        fields +=`
      <v-flex xs3>
        <v-text-field
          name="${propiedad.COLUMNA}"
          label="${propiedad.COLUMNA}"
          id="${propiedad.COLUMNA}"
          ref="${propiedad.COLUMNA}"
          v-model="model.${propiedad.COLUMNA}"
        ></v-text-field>
      </v-flex>
      `
      });
    model = model.substr(0, model.length - 1)
    model += "\n\t\t}";

    var js = `<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      ${fields}
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
  props: ["fila"],
  data: () => ({
    ${model}
  }),
  mounted(){
    if (this.fila) {
      this.model = this.fila;
    }
  },
  methods: {
    guardar() {
      this.$emit("guardar", this.model);
    }
  }
}
</script>
    `
    return js;
  },
  formDeclare() {
    return `const ${this.Tabla}Formulario = resolve => {
  require.ensure(
    ["./${this.tabla.toLowerCase()}/Formulario.vue"],
    () => {
      resolve(require("./${this.tabla.toLowerCase()}/Formulario.vue"));
    },
    "__SUSTITUIR__"
  );
};`
  },
}