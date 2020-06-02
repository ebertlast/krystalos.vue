const Snackbar = resolve => {
  require.ensure(
    ["./Snackbar.vue"],
    () => {
      resolve(require("./Snackbar.vue"));
    },
    "globals"
  );
};
const Alert = resolve => {
  require.ensure(
    ["./Alert.vue"],
    () => {
      resolve(require("./Alert.vue"));
    },
    "globals"
  );
};
const DataTabla = resolve => {
  require.ensure(
    ["./DataTabla.vue"],
    () => {
      resolve(require("./DataTabla.vue"));
    },
    "globals"
  );
};
const Direccionador = resolve => {
  require.ensure(
    ["./Direccionador.vue"],
    () => {
      resolve(require("./Direccionador.vue"));
    },
    "globals"
  );
};
const Fecha = resolve => {
  require.ensure(
    ["./Fecha.vue"],
    () => {
      resolve(require("./Fecha.vue"));
    },
    "globals"
  );
};
const Pdf = resolve => {
  require.ensure(
    ["./Pdf.vue"],
    () => {
      resolve(require("./Pdf.vue"));
    },
    "globals"
  );
};
const Markdown = resolve => {
  require.ensure(
    ["./Markdown.vue"],
    () => {
      resolve(require("./Markdown.vue"));
    },
    "globals"
  );
};
const EnConstruccion = resolve => {
  require.ensure(
    ["./EnConstruccion.vue"],
    () => {
      resolve(require("./EnConstruccion.vue"));
    },
    "globals"
  );
};
const TableServerSide = resolve => {
  require.ensure(
    ["./TableServerSide.vue"],
    () => {
      resolve(require("./TableServerSide.vue"));
    },
    "globals"
  );
};
export default {
  Snackbar, DataTabla, Alert, Direccionador, Fecha, Pdf, Markdown, EnConstruccion, TableServerSide
};
