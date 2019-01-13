import { default as components } from "./components";
import { default as components_inv } from "../kinv/components";
export const routes = [
  // { path: "/404", component: components.NotFound, name: "404" },
  {
    path: "/krycnf",
    component: components.Marco,
    name: "krycnf",
    children: [
      { path: "med", component: components.MEDNavegar, name: "med" },
      { path: "ter", component: components.TERNavegar, name: "ter" },
      { path: "icla", component: components_inv.ICLA, name: "icla" },
      { path: "iclah", component: components_inv.ICLAH, name: "iclah" },
      { path: "igru", component: components_inv.IGRU, name: "igru" },
      { path: "ipac", component: components_inv.IPAC, name: "ipac" },
      { path: "iffa", component: components_inv.IFFA, name: "iffa" },
      { path: "igen", component: components_inv.IGEN, name: "igen" },
      { path: "iart", component: components_inv.IART, name: "iart" },
      { path: "aec", component: components.AECNavegar, name: "aec" },
    ]
  },
  // { path: "**", redirect: { name: "cartelera" } }
];
