const Principal = resolve => {
  require.ensure(
    ["./principal/Marco.vue"],
    () => {
      resolve(require("./principal/Marco.vue"));
    },
    "kdev"
  );
};
const GeneradorCodigo = resolve => {
  require.ensure(
    ["./generador/GeneradorCodigo.vue"],
    () => {
      resolve(require("./generador/GeneradorCodigo.vue"));
    },
    "kdev"
  );
};
const Documentacion = resolve => {
  require.ensure(
    ["./documentacion/Doc.vue"],
    () => {
      resolve(require("./documentacion/Doc.vue"));
    },
    "kdev"
  );
};
const VERSIONESRegistros = resolve => {
  require.ensure(
    ["./versiones/Registros.vue"],
    () => {
      resolve(require("./versiones/Registros.vue"));
    },
    "kdev"
  );
};
const VERSIONESFormulario = resolve => {
  require.ensure(
    ["./versiones/Formulario.vue"],
    () => {
      resolve(require("./versiones/Formulario.vue"));
    },
    "kdev"
  );
};
const VERSIONESDetalles = resolve => {
  require.ensure(
    ["./versiones/Detalles.vue"],
    () => {
      resolve(require("./versiones/Detalles.vue"));
    },
    "kdev"
  );
};
const SQLIXRegistros = resolve => {
  require.ensure(
    ["./sqlix/Registros.vue"],
    () => {
      resolve(require("./sqlix/Registros.vue"));
    },
    "kdev"
  );
};
const SQLIXFormulario = resolve => {
  require.ensure(
    ["./sqlix/Formulario.vue"],
    () => {
      resolve(require("./sqlix/Formulario.vue"));
    },
    "kdev"
  );
};
const SQLIXDetalles = resolve => {
  require.ensure(
    ["./sqlix/Detalles.vue"],
    () => {
      resolve(require("./sqlix/Detalles.vue"));
    },
    "kdev"
  );
};
export default {
  Principal, GeneradorCodigo, Documentacion, VERSIONESDetalles, VERSIONESFormulario, VERSIONESRegistros, SQLIXDetalles, SQLIXFormulario, SQLIXRegistros
};
