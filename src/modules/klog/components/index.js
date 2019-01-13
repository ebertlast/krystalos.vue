const Marco = resolve => {
  require.ensure(
    ["./principal/Marco.vue"],
    () => {
      resolve(require("./principal/Marco.vue"));
    },
    "klog"
  );
};
const Autorizaciones = resolve => {
  require.ensure(
    ["./autorizaciones/listado/Listado.vue"],
    () => {
      resolve(require("./autorizaciones/listado/Listado.vue"));
    },
    "klog"
  );
};
const Nueva = resolve => {
  require.ensure(
    ["./autorizaciones/autorizacion/Nueva.vue"],
    () => {
      resolve(require("./autorizaciones/autorizacion/Nueva.vue"));
    },
    "klog"
  );
};
export default {
  Marco, Autorizaciones, Nueva
};
