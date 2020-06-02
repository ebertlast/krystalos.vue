export default {
  setApiUrl: (state, url) => {
    state.api_url = url;
  },
  setSnackbar: (state, snackbar) => {
    state.snackbar = snackbar;
  },
  setAlert: (state, alert) => {
    state.alert = alert;
  },
  setDireccion: (state, direccion) => {
    state.direccion = direccion;
  },
  setDialog: (state, dialog) => {
    state.dialog = dialog;
  },
}