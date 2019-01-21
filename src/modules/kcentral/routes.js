import { default as components } from "./components";
export const routes = [
  // { path: "/404", component: components.NotFound, name: "404" },
  {
    path: "/",
    component: components.Marco,
    name: "kcentral",
    children: [
      // { path: "cartelera", component: components.Cartelera, name: "cartelera" }
      // { path: "usgruadd", component: components.UsgruAdd, name: "usgruadd" },
    ]
  },
  // { path: "**", redirect: { name: "cartelera" } }
];
