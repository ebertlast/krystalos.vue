import { default as components } from "./components";
export const routes = [
  // { path: "/404", component: components.NotFound, name: "404" },
  {
    path: "/apoyodiagnostico",
    component: components.Marco,
    name: "klab",
    children: [
      // { path: "autorizaciones", component: components.Autorizaciones, name: "autorizaciones" },
      // { path: "autorizaciones/nueva", component: components.Nueva, name: "autorizacion_add" },
      // { path: "", redirect: { name: "autorizaciones" } },
      // { path: "**", redirect: { name: "autorizaciones" } }

    ]
  },
  // { path: "**", redirect: { name: "cartelera" } }
];
