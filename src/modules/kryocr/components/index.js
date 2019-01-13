const Marco = resolve => {
  require.ensure(
    ["./principal/Marco.vue"],
    () => {
      resolve(require("./principal/Marco.vue"));
    },
    "ocr"
  );
};
const Archivos = resolve => {
  require.ensure(
    ["./archivo/Listado.vue"],
    () => {
      resolve(require("./archivo/Listado.vue"));
    },
    "ocr"
  );
};
const SubirArchivo = resolve => {
  require.ensure(
    ["./archivo/SubirArchivo.vue"],
    () => {
      resolve(require("./archivo/SubirArchivo.vue"));
    },
    "ocr"
  );
};
const Pdf = resolve => {
  require.ensure(
    ["./genericos/Pdf.vue"],
    () => {
      resolve(require("./genericos/Pdf.vue"));
    },
    "ocr"
  );
};
export default {
  Marco, Archivos, Pdf, SubirArchivo
};
