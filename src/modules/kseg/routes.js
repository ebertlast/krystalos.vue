import { default as components } from "./components";
export const routes = [
  { path: "/ingresar", component: components.Ingresar, name: "ingresar" },
  { path: "/cambiar_clave", component: components.CambiarClave, name: "cambiar_clave" },
  { path: "/salir", component: components.Ingresar, name: "salir" },
  // {
  //   path: "/kseg", component: components.KsegPpal, name: "ksegPpal", children: [
  //     { path: "ususu", component: components.Usuarios, name: "ususu" }
  //   ]
  // },
];
