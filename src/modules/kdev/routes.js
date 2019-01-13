import { default as components } from "./components";
export const routes = [
  // { path: "/404", component: components.NotFound, name: "404" },
  {
    path: "/desarrollo",
    component: components.Principal,
    name: "kdev",
    children: [
      { path: "generador", component: components.GeneradorCodigo, name: "generador" },
      { path: "documentacion", component: components.Documentacion, name: "documentacion" },
      { path: "desarrollo", redirect: { name: "generador" } },
      { path: "", redirect: { name: "generador" } },
      { path: "**", redirect: { name: "generador" } }
    ]
  },
  // { path: "**", redirect: { name: "cartelera" } }
];
