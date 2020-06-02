export default {
  /**
   * Despliegue de mensajes tipo notificaciones >> https://notifyjs.com/
   * @param message Mensaje que se mostrará en el cuerpo de la notificación
   * @param type Tipo de notificación: success [default] (verde), error (rojo), warning (amarillo), info (azul))
   * @param positionClass Posición de la pantalla donde se desplegará la notificación: top-right, bottom-right  (Default), bottom-left,
   * top-full-width, bottom-full-width, top-center, bottom-center
   */
  notificacion({ commit }, payload) {
    // var noty = this._vm.$root.$noty;
    payload.type = (payload.type) ? payload.type : "";
    var configuraciones = {
      text: payload.message,
      show: true
    }
    switch (payload.type) {
      case "success":
        configuraciones.color = "success"
        break;
      case "error":
        configuraciones.color = "error"
        break;
      case "warning":
        configuraciones.color = "yellow"
        break;
      case "info":
        configuraciones.color = "info"
        break;
      default:
        configuraciones.color = "primary"
        break;
    }
    commit("setSnackbar", configuraciones);
  },
  setApiUrl: ({ commit }, payload) => {
    commit("setApiUrl", payload);
  },
  setSnackbar: ({ commit }, payload) => {
    var configuraciones = {
      show: payload.show | (payload.text !== ""),
      color: payload.color | "",
      mode: payload.mode | "multi-line", //multi-line, vertical
      timeout: payload.timeout | 6000,
      text: payload.text | ""
    }
    console.log("Configuraciones: ", configuraciones)
    commit("setSnackbar", configuraciones);
  },
  snackbar: ({ commit }, payload) => {
    var configuraciones = {
      show: payload.show | (payload.text !== ""),
      color: payload.color | "",
      mode: payload.mode | "multi-line", //multi-line, vertical
      timeout: payload.timeout | 6000,
      text: payload.text | ""
    }
    commit("setSnackbar", configuraciones);
  },

  setClipboard({ commit, dispatch }, payload) {

    // console.log(payload)
    let textarea = document.createElement("textarea");
    textarea.setAttribute("type", "hidden");
    textarea.id = "__temp";
    textarea.textContent = payload;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    dispatch("notificacion", { message: (payload === "") ? "Portapapeles en blanco" : "Texto copiado al portapapeles" })
    var element = document.getElementById("__temp");
    element.parentNode.removeChild(element);
    // alert("Texto copiado al portapapeles")
  },

  setAlert: ({ commit }, payload) => {
    var configuraciones = {
      show: (payload.show) ? payload.show : true,
      type: (payload.type) ? payload.type : "info",
      // timeout: (payload.timeout) ? payload.timeout : 6000,
      text: (payload.text) ? payload.text : ""
    }
    // console.log("Configuraciones: ", configuraciones)
    commit("setAlert", configuraciones);
  },
  setDireccion: ({ commit }, payload) => {
    commit("setDireccion", payload);
  },
  setDialog: ({ commit }, payload) => {
    var configuraciones = {
      show: payload.show | (payload.text_title !== "" || payload.text_body !== ""),
      text_ok: payload.text_ok | "Aceptar",
      text_cancel: payload.text_cancel | "Cancelar",
      color_ok: payload.color_ok | "green darken-1",
      color_cancel: payload.color_cancel | "green darken-1",
      text_title: payload.text_title | "Titulo",
      text_body: payload.text_body |
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae commodi, nesciunt quos aliquid rerum quibusdam natus vero, nihil blanditiis culpa fugit est tenetur, illum possimus? Tempora amet eum similique alias."
    }
    commit("setDialog", configuraciones);
  },
}
