const Ingresar = resolve => {
  require.ensure(
    ["./ingresar/Login.vue"],
    () => {
      resolve(require("./ingresar/Login.vue"));
    },
    "kseg"
  );
};
const CambiarClave = resolve => {
  require.ensure(
    ["./CambiarClave.vue"],
    () => {
      resolve(require("./CambiarClave.vue"));
    },
    "kseg"
  );
};
export default {
  Ingresar, CambiarClave
};
