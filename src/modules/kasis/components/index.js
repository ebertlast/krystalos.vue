const AFIFormulario = resolve => {
  require.ensure(
    ["./afi/Formulario.vue"],
    () => {
      resolve(require("./afi/Formulario.vue"));
    },
    "kasis"
  );
};
const AFINavegar = resolve => {
  require.ensure(
    ["./afi/Registros.vue"],
    () => {
      resolve(require("./afi/Registros.vue"));
    },
    "kasis"
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
export default {
  AFIFormulario, AFINavegar, Marco
};
