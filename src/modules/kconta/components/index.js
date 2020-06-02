const Marco = resolve => {
  require.ensure(
    ["./principal/Marco.vue"],
    () => {
      resolve(require("./principal/Marco.vue"));
    },
    "kconta"
  );
};
const HARERegistros = resolve => {
  require.ensure(
    ["./hare/Registros.vue"],
    () => {
      resolve(require("./hare/Registros.vue"));
    },
    "kconta"
  );
};
const HAREFormulario = resolve => {
  require.ensure(
    ["./hare/Formulario.vue"],
    () => {
      resolve(require("./hare/Formulario.vue"));
    },
    "kconta"
  );
};
const HAREDetalles = resolve => {
  require.ensure(
    ["./hare/Detalles.vue"],
    () => {
      resolve(require("./hare/Detalles.vue"));
    },
    "kconta"
  );
};
const CUERegistros = resolve => {
  require.ensure(
    ["./cue/Registros.vue"],
    () => {
      resolve(require("./cue/Registros.vue"));
    },
    "kconta"
  );
};
const CUEFormulario = resolve => {
  require.ensure(
    ["./cue/Formulario.vue"],
    () => {
      resolve(require("./cue/Formulario.vue"));
    },
    "kconta"
  );
};
const CUEDetalles = resolve => {
  require.ensure(
    ["./cue/Detalles.vue"],
    () => {
      resolve(require("./cue/Detalles.vue"));
    },
    "kconta"
  );
};
const CUENIIFRegistros = resolve => {
  require.ensure(
    ["./cueniif/Registros.vue"],
    () => {
      resolve(require("./cueniif/Registros.vue"));
    },
    "kconta"
  );
};
const CUENIIFFormulario = resolve => {
  require.ensure(
    ["./cueniif/Formulario.vue"],
    () => {
      resolve(require("./cueniif/Formulario.vue"));
    },
    "kconta"
  );
};
const CUENIIFDetalles = resolve => {
  require.ensure(
    ["./cueniif/Detalles.vue"],
    () => {
      resolve(require("./cueniif/Detalles.vue"));
    },
    "kconta"
  );
};
export default {
  Marco, HAREDetalles, HAREFormulario, HARERegistros, CUERegistros, CUEDetalles, CUEFormulario, CUENIIFDetalles, CUENIIFFormulario, CUENIIFRegistros
};
