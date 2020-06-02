import { USUARIO_STORAGE } from "../globals"
export default {
  api_url: state => {
    if (JSON.parse(localStorage.getItem(USUARIO_STORAGE))) {
      return JSON.parse(localStorage.getItem(USUARIO_STORAGE))["usuario"].URL_API;
    }
    return state.api_url;
  },
  snackbar: state => {
    return state.snackbar
  },
  extensionArchivo: state => archivo => {
    // return /[^.]+$/.exec(archivo)
    return (/[.]/.exec(archivo)) ? /[^.]+$/.exec(archivo) : undefined;
  },
  alert: state => {
    return state.alert
  },
  direccion: state => {
    return state.direccion
  },
  dialog: state => {
    return state.dialog
  },
  fechayhora: state => _fecha => {
    _fecha = _fecha.replace("/", "").replace(" ", "").replace(":", "");
    _fecha = _fecha.replace("/", "").replace(" ", "").replace(":", "");
    // console.log("Fecha: ", _fecha)
    // var [fecha, hora] = _fecha.split(" ")
    // var [dia, mes, anio] = fecha.split("/");
    // var [horas, minutos] = hora.split(":");
    var dia = _fecha.substr(0, 2);
    var mes = _fecha.substr(2, 2);
    var anio = _fecha.substr(4, 4);
    var horas = _fecha.substr(8, 2);
    var minutos = _fecha.substr(10, 2);

    // console.log(`Día: ${dia}`)
    // console.log(`Mes: ${mes}`)
    // console.log(`Año: ${anio}`)
    // console.log(`Horas: ${horas}`)
    // console.log(`Minutos: ${minutos}`)

    // console.log(anio, mes, dia, horas, minutos)
    return new Date(anio * 1, mes * 1 - 1, dia * 1, horas * 1, minutos * 1, 0, 0);
  },

  edad: state => _fecha => {
    var hoy = new Date();
    var cumpleanos = new Date(_fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    return edad;
  }
}
