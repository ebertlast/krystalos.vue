import { default as components } from "./components";
export const routes = [
  // { path: "/404", component: components.NotFound, name: "404" },
  {
    path: "/kasis",
    component: components.Marco,
    name: "kasis",
    children: [
      { path: "afi", component: components.AFIRegistros, name: "afi" }
      // { path: "usgruadd", component: components.UsgruAdd, name: "usgruadd" },
    ]
  },
  // { path: "**", redirect: { name: "cartelera" } }
];
