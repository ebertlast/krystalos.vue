import { default as components } from "./components";
export const routes = [
  {
    path: "/kconta",
    component: components.Marco,
    name: "kconta",
    children: [
      // { path: "cartelera", component: components.Cartelera, name: "cartelera" }
      // { path: "usgruadd", component: components.UsgruAdd, name: "usgruadd" },
    ]
  },
  // { path: "**", redirect: { name: "cartelera" } }
];
