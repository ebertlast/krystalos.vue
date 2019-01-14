const Marco = resolve => {
  require.ensure(
    ["./principal/Marco.vue"],
    () => {
      resolve(require("./principal/Marco.vue"));
    },
    "kconta"
  );
};
const HARENavegar = resolve => {
  require.ensure(
    ["./hare/Registros.vue"],
    () => {
      resolve(require("./hare/Registros.vue"));
    },
    "kconta"
  );
};
export default {
  Marco, HARENavegar
};
