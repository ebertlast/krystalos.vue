import { default as components } from "./components";
export const routes = [
  // { path: "/404", component: components.NotFound, name: "404" },
  {
    path: "/kryocr",
    component: components.Marco,
    name: "kryocr",
    children: [
      { path: "archivos", component: components.Archivos, name: "archivos" },
      { path: "archivo/subir", component: components.SubirArchivo, name: "subir_archivo" },
      { path: "", redirect: { name: "archivos" } }

    ]
  },
  // { path: "**", redirect: { name: "cartelera" } }
];
