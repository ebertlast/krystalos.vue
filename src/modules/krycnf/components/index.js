const MEDNavegar = resolve => {
  require.ensure(
    ["./med/Registros.vue"],
    () => {
      resolve(require("./med/Registros.vue"));
    },
    "krycnf"
  );
};
const MEDFormulario = resolve => {
  require.ensure(
    ["./med/Formulario.vue"],
    () => {
      resolve(require("./med/Formulario.vue"));
    },
    "krycnf"
  );
};
const TERNavegar = resolve => {
  require.ensure(
    ["./ter/Registros.vue"],
    () => {
      resolve(require("./ter/Registros.vue"));
    },
    "krycnf"
  );
};
const TERFormulario = resolve => {
  require.ensure(
    ["./ter/Formulario.vue"],
    () => {
      resolve(require("./ter/Formulario.vue"));
    },
    "krycnf"
  );
};
const Marco = resolve => {
  require.ensure(
    ["./principal/Marco.vue"],
    () => {
      resolve(require("./principal/Marco.vue"));
    },
    "kasis"
  );
};
const AECNavegar = resolve => {
  require.ensure(
    ["./aec/Registros.vue"],
    () => {
      resolve(require("./aec/Registros.vue"));
    },
    "krycnf"
  );
};
export default {
  MEDNavegar, MEDFormulario, TERNavegar, TERFormulario, Marco, AECNavegar
};
