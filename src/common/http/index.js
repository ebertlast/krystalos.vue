import axios from "axios";
import join from "url-join";
import { router } from "../router";
import store from "../store";

// #region Incrustar Token en las solicitudes
var isAbsoluteURLRegex = /^(?:\w+:)\/\//;
axios.interceptors.request.use(function (config) {
  config.timeout = 60 * 4 * 1000; // 4 Minutos de Espera
  if (!isAbsoluteURLRegex.test(config.url)) {
    config.url = join(store.getters.api_url, config.url);
  }
  console.log(config.url);
  // console.log(store.getters["kseg/ususu"].TOKEN)
  var token = store.getters["kseg/ususu"].TOKEN || null;
  // console.log(token)
  if (token) {
    config.headers["authorization"] = "Bearer " + token;
  }
  config.headers["Expires"] = "-1";
  return config;
});
// #endregion

// #region interceptar las Respuestas
axios.interceptors.response.use(
  response => {
    // console.log("Response: ", response);
    if (response.data.success === false && response.data.message) {
      store.dispatch("notificacion", {
        message: response.data.message,
        type: "info"
      });
    }
    if (response.data.logout && response.data.logout === true) {
      router.push({ name: "ingresar" });
    }
    if (response.data.token && response.data.token !== "") {
      // console.log(store.getters.ususu.usuario)
      // alert(response.data.token);
      store.dispatch("kseg/setToken", response.data.token || response.data.TOKEN);
      // alert('')
    }
    // console.log(response)
    return response.data;
  },
  error => {
    // alert("Error Ocurrido")
    if (error.response) {
      if (error.response.status === 401) {
        // dispatch('logOut')
        // notify('Session expired')
        store.dispatch("notificacion", {
          message: "Session expired",
          type: "info"
        });
      } else if (error.response.status === 404) {
        store.dispatch("notificacion", {
          message: `El servidor web responsable de aceptar las peticiones a la URL (${
            error.response.config.url
            }) no está en funcionamiento o hay problemas de conexión ó la URL se enlazó de forma incorrecta`,
          type: "error"
        });
        // alert(`El servidor web responsable de aceptar las peticiones a la URL (${error.response.config.url}) no está en funcionamiento o hay problemas de conexión ó la URL se enlazó de forma incorrecta`)
      } else if (error.response.status === 500) {
        console.log("error.response: ", error.response);
        var errorCode = undefined;
        try {
          if (!errorCode && error.response.data.originalError.code) {
            errorCode = error.response.data.originalError.code
          }
          if (!errorCode && error.response.status) {
            errorCode = error.response.status
          }
          if (!errorCode && error.response.data.error.code) {
            errorCode = error.response.data.error.code
          }
          if (!errorCode && error.response.data.error.code) {
            errorCode = "500";
          }
        } catch (ex) {
          errorCode = 500;
        }
        var errorMessage = undefined;
        try {
          if (!errorMessage && error.response.statusText) {
            errorMessage = error.response.statusText;
          }
          if (!errorMessage && error.response.data.originalError.message) {
            errorMessage = error.response.data.originalError.message;
          }
          if (!errorMessage && error.response.data) {
            errorMessage = error.response.data;
          }
          if (!errorMessage && error.response.data.error.originalError.info.message) {
            errorMessage = error.response.data.error.originalError.info.message;
          }
        } catch (ex) {
          errorMessage = undefined;
        }

        if (!errorMessage)
          errorMessage =
            (error.response.data.error.originalError
              ? error.response.data.error.originalError.message
              : undefined) ||
            error.response.data.error.message ||
            error.response.data.error || error.response.data.error.originalError.info.message;
        store.dispatch("notificacion", {
          message: `Error en el servidor ([${errorCode}] - ${errorMessage})`,
          type: "error"
        });
      } else {
        // console.log(error.response.data)
        if (
          (error.response.data.success === false &&
            error.response.data.message) ||
          error.response.data.error
        ) {
          store.dispatch("notificacion", {
            message: error.response.data.message || error.response.data.error,
            type: "error"
          });
        } else {
          store.dispatch("notificacion", {
            message: error.response,
            type: "error"
          });
          console.log(error.response);
          return Promise.reject(error.response);
        }
      }
    } else if (error.request) {
      // console.log('error: ', error)
      // notify('Server down')
      // alert('Server down')
      store.dispatch("notificacion", {
        message: "Server down",
        type: "error"
      });
    } else {
      // notify('Unexpected error')
      // alert('Unexpected error')
      store.dispatch("notificacion", {
        message: `Unexpected error: ${error}`,
        type: "error"
      });
    }
  }
);
// #endregion

export const http = axios;
