<template>
  <tabla :columnas="columnas" :filas="filas" :loading="cargando_tabla" @fila="fila=$event;" titulo="Subclases de Medicamentos" ref="tabla" >
    <template slot="detalles">
      <en-construccion @cancelar="cancelar"></en-construccion>
    </template>
    <template slot="formulario">
      <en-construccion @cancelar="cancelar"></en-construccion>
    </template>
  </tabla>
</template>

<script>
import { default as global_components } from "../../../../common/components/";

export default {
  data: () => ({
    cargando: false,
    fila: {},
    filas: [],
    columnas: [],
    cargando_tabla: false,
    model: {
      IDCLASE: undefined,
      IDSUBCLASE: undefined,
      DESCRIPCION: undefined,
    },
    editar:false
  }),
  components:{
    Tabla: global_components.DataTabla,
    EnConstruccion: global_components.EnConstruccion
  },
  mounted(){
    this.recargarFilas();
  },
  methods:{
    recargarFilas() {
      this.cargando_tabla = true;
      this.filas = [];
      this.columnas = [];
      this.$http
        .get(`iclah`)
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
    cancelar() {
      this.$refs.tabla.cerrarDialog();
    },
  }
};
</script>

<style>
</style>
