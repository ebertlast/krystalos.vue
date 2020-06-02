import { default as components } from "./components";
export const routes = [
  // { path: "/404", component: components.NotFound, name: "404" },
  {
    path: "/dynamic_report",
    component: components.Principal,
    name: "dynamic_report",
    children: [
      { path: "consultas", component: components.Consultas, name: "consultas" },
      { path: "reporte", component: components.Reporte, name: "reporte" },
      { path: "configuracion", component: components.Configuracion, name: "configuracion" },
      { path: "", redirect: { name: "consultas" } }
    ]
  },
  // { path: "**", redirect: { name: "cartelera" } }
];
