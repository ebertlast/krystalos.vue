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
const Timeline = resolve => {
  require.ensure(
    ["./autorizaciones/listado/Timeline.vue"],
    () => {
      resolve(require("./autorizaciones/listado/Timeline.vue"));
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
const AUTA_BOTRegistros = resolve => {
  require.ensure(
    ["./autorizaciones/auta_bot/Registros.vue"],
    () => {
      resolve(require("./autorizaciones/auta_bot/Registros.vue"));
    },
    "klog"
  );
};
const AUTA_BOTFormulario = resolve => {
  require.ensure(
    ["./autorizaciones/auta_bot/Formulario.vue"],
    () => {
      resolve(require("./autorizaciones/auta_bot/Formulario.vue"));
    },
    "klog"
  );
};
const AUTA_BOTDetalles = resolve => {
  require.ensure(
    ["./autorizaciones/auta_bot/Detalles.vue"],
    () => {
      resolve(require("./autorizaciones/auta_bot/Detalles.vue"));
    },
    "klog"
  );
};

export default {
  Marco, Autorizaciones, Nueva, AUTA_BOTRegistros, AUTA_BOTFormulario, AUTA_BOTDetalles, Timeline
};
