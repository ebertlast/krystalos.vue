const Marco = resolve => {
  require.ensure(
    ["./principal/Marco.vue"],
    () => {
      resolve(require("./principal/Marco.vue"));
    },
    "kinv"
  );
};
const ICLA = resolve => {
  require.ensure(
    ["./icla/Registros.vue"],
    () => {
      resolve(require("./icla/Registros.vue"));
    },
    "kinv"
  );
};
const ICLAH = resolve => {
  require.ensure(
    ["./iclah/Registros.vue"],
    () => {
      resolve(require("./iclah/Registros.vue"));
    },
    "kinv"
  );
};
const IGRU = resolve => {
  require.ensure(
    ["./igru/Registros.vue"],
    () => {
      resolve(require("./igru/Registros.vue"));
    },
    "kinv"
  );
};
const IPAC = resolve => {
  require.ensure(
    ["./ipac/Registros.vue"],
    () => {
      resolve(require("./ipac/Registros.vue"));
    },
    "kinv"
  );
};
const IFFA = resolve => {
  require.ensure(
    ["./iffa/Registros.vue"],
    () => {
      resolve(require("./iffa/Registros.vue"));
    },
    "kinv"
  );
};
const IGEN = resolve => {
  require.ensure(
    ["./igen/Registros.vue"],
    () => {
      resolve(require("./igen/Registros.vue"));
    },
    "kinv"
  );
};
const IART = resolve => {
  require.ensure(
    ["./iart/Registros.vue"],
    () => {
      resolve(require("./iart/Registros.vue"));
    },
    "kinv"
  );
};
const IARTFormulario = resolve => {
  require.ensure(
    ["./iart/Formulario.vue"],
    () => {
      resolve(require("./iart/Formulario.vue"));
    },
    "kinv"
  );
};
const IARTDetalles = resolve => {
  require.ensure(
    ["./iart/Detalles.vue"],
    () => {
      resolve(require("./iart/Detalles.vue"));
    },
    "kinv"
  );
};
export default {
  Marco, ICLA, ICLAH, IGRU, IPAC, IFFA, IGEN, IART, IARTFormulario, IARTDetalles
};
