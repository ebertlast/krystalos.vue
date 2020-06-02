import { default as modules } from "../../modules";

export const routes = [];

modules.kcentral.routes.forEach(route => {
  routes.push(route);
});

modules.kseg.routes.forEach(route => {
  routes.push(route);
});

modules.dynamic_report.routes.forEach(route => {
  routes.push(route);
});

modules.kryocr.routes.forEach(route => {
  routes.push(route);
});

modules.krycnf.routes.forEach(route => {
  routes.push(route);
});

modules.kdev.routes.forEach(route => {
  routes.push(route);
});

modules.klog.routes.forEach(route => {
  routes.push(route);
});

modules.kasis.routes.forEach(route => {
  routes.push(route);
});

modules.klab.routes.forEach(route => {
  routes.push(route);
});

modules.kinv.routes.forEach(route => {
  routes.push(route);
});

modules.kconta.routes.forEach(route => {
  routes.push(route);
});

modules.kiaf.routes.forEach(route => {
  routes.push(route);
});

// console.log(modules.kconta.routes);
