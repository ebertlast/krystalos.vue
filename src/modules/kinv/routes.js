import { default as components } from "./components";
export const routes = [
  // { path: "/404", component: components.NotFound, name: "404" },
  {
    path: "/kinv",
    component: components.Marco,
    name: "kinv",
    children: [
      // { path: "autorizaciones", component: components.Autorizaciones, name: "autorizaciones" },
      // { path: "autorizaciones/nueva", component: components.Nueva, name: "autorizacion_add" },
      // { path: "", redirect: { name: "autorizaciones" } },
      // { path: "**", redirect: { name: "autorizaciones" } }

    ]
  },
  // { path: "**", redirect: { name: "cartelera" } }
];
