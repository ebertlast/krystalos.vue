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
export default {
  Principal, GeneradorCodigo, Documentacion
};
