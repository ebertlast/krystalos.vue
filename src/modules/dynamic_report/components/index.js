const Principal = resolve => {
  require.ensure(
    ["./principal/Principal.vue"],
    () => {
      resolve(require("./principal/Principal.vue"));
    },
    "dinamic_report"
  );
};
const Consultas = resolve => {
  require.ensure(
    ["./consultas/Listado.vue"],
    () => {
      resolve(require("./consultas/Listado.vue"));
    },
    "dinamic_report"
  );
};
const Reporte = resolve => {
  require.ensure(
    ["./reporte/Reporte.vue"],
    () => {
      resolve(require("./reporte/Reporte.vue"));
    },
    "dinamic_report"
  );
};
const Fecha = resolve => {
  require.ensure(
    ["./reporte/genericos/fecha/Fecha.vue"],
    () => {
      resolve(require("./reporte/genericos/fecha/Fecha.vue"));
    },
    "dinamic_report"
  );
};
const Seleccion = resolve => {
  require.ensure(
    ["./reporte/genericos/seleccion/Seleccion.vue"],
    () => {
      resolve(require("./reporte/genericos/seleccion/Seleccion.vue"));
    },
    "dinamic_report"
  );
};
const Alfanumerico = resolve => {
  require.ensure(
    ["./reporte/genericos/alfanumerico/Alfanumerico.vue"],
    () => {
      resolve(require("./reporte/genericos/alfanumerico/Alfanumerico.vue"));
    },
    "dinamic_report"
  );
};
const Numerico = resolve => {
  require.ensure(
    ["./reporte/genericos/numerico/Numerico.vue"],
    () => {
      resolve(require("./reporte/genericos/numerico/Numerico.vue"));
    },
    "dinamic_report"
  );
};
const Resultados = resolve => {
  require.ensure(
    ["./reporte/resultados/Resultados.vue"],
    () => {
      resolve(require("./reporte/resultados/Resultados.vue"));
    },
    "dinamic_report"
  );
};
const Configuracion = resolve => {
  require.ensure(
    ["./reporte/configuracion/ConfigurarReporte.vue"],
    () => {
      resolve(require("./reporte/configuracion/ConfigurarReporte.vue"));
    },
    "dinamic_report"
  );
};
export default {
  Principal, Consultas, Reporte, Fecha, Seleccion, Alfanumerico, Numerico, Resultados, Configuracion
};
