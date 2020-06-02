const Principal = resolve => {
  require.ensure(
    ["./principal/Marco.vue"],
    () => {
      resolve(require("./principal/Marco.vue"));
    },
    "kiaf"
  );
};
const IACTTDetalles = resolve => {
  require.ensure(
    ["./iactt/Detalles.vue"],
    () => {
      resolve(require("./iactt/Detalles.vue"));
    },
    "kiaf"
  );
};
const IACTTFormulario = resolve => {
  require.ensure(
    ["./iactt/Formulario.vue"],
    () => {
      resolve(require("./iactt/Formulario.vue"));
    },
    "kiaf"
  );
};
const IACTTRegistros = resolve => {
  require.ensure(
    ["./iactt/Registros.vue"],
    () => {
      resolve(require("./iactt/Registros.vue"));
    },
    "kiaf"
  );
};
export default {
  Principal, IACTTDetalles, IACTTFormulario, IACTTRegistros
};
