const Ingresar = resolve => {
  require.ensure(
    ["./ingresar/Login.vue"],
    () => {
      resolve(require("./ingresar/Login.vue"));
    },
    "kseg"
  );
};
export default {
  Ingresar
};
