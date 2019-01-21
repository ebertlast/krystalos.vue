import { default as components } from "./components";
import { default as components_inv } from "../kinv/components";
import { default as components_conta } from "../kconta/components";
import { default as components_activos_fijos } from "../kiaf/components";
export const routes = [
  // { path: "/404", component: components.NotFound, name: "404" },
  {
    path: "/krycnf",
    component: components.Marco,
    name: "krycnf",
    children: [
      { path: "med", component: components.MEDNavegar, name: "med" },
      { path: "ter", component: components.TERRegistros, name: "ter" },
      { path: "cat", component: components.CATRegistros, name: "cat" },
      { path: "icla", component: components_inv.ICLA, name: "icla" },
      { path: "iclah", component: components_inv.ICLAHRegistros, name: "iclah" },
      { path: "igru", component: components_inv.IGRURegistros, name: "igru" },
      { path: "ipac", component: components_inv.IPACRegistros, name: "ipac" },
      { path: "iffa", component: components_inv.IFFARegistros, name: "iffa" },
      { path: "igen", component: components_inv.IGEN, name: "igen" },
      { path: "iart", component: components_inv.IART, name: "iart" },
      { path: "iccn", component: components_inv.ICCNRegistros, name: "iccn" },
      { path: "itar", component: components_inv.ITARRegistros, name: "itar" },
      { path: "iuni", component: components_inv.IUNIRegistros, name: "iuni" },
      { path: "aec", component: components.AECRegistros, name: "aec" },
      { path: "hare", component: components_conta.HARERegistros, name: "hare" },
      { path: "cue", component: components_conta.CUERegistros, name: "cue" },
      { path: "cueniif", component: components_conta.CUENIIFRegistros, name: "cueniif" },
      { path: "iactt", component: components_activos_fijos.IACTTRegistros, name: "iactt" },
      { path: "tgen", component: components.TGENRegistros, name: "tgen" },
      { path: "ocu", component: components.OCURegistros, name: "ocu" },
      { path: "itgen", component: components_inv.ITGENRegistros, name: "itgen" },
      { path: "pais", component: components.PAISRegistros, name: "pais" },
      { path: "dep", component: components.DEPRegistros, name: "dep" },
      { path: "ciu", component: components.CIURegistros, name: "ciu" },
      { path: "ciub", component: components.CIUBRegistros, name: "ciub" },
      { path: "zon", component: components.ZONRegistros, name: "zon" },
    ]
  },
  // { path: "**", redirect: { name: "cartelera" } }
];
