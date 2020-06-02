const Marco = resolve => {
  require.ensure(
    ["./principal/Marco.vue"],
    () => {
      resolve(require("./principal/Marco.vue"));
    },
    "klab"
  );
};
export default {
  Marco
};
