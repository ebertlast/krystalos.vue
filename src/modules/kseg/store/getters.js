export default {
  ususu: state => {
    return state.ususu;
  },
  nombreUsuario: state => {
    // console.log("Ebert", state.ususu)
    if (!state.ususu) return "";
    if (!state.ususu.NOMBRE) return "";
    return state.ususu.NOMBRE.substr(0, state.ususu.NOMBRE.indexOf(" "));
  },
  nombreGrupo: state => {
    // return state.ususu.DESCGRUPO;
    if (!state.ususu) return "";
    if (!state.ususu.DESCGRUPO) return "";
    return state.ususu.DESCGRUPO.substr(0, state.ususu.DESCGRUPO.indexOf(" "));
  },
  // avatar: state => {
  //   var url = "src/assets/global/img/avatars/user-default.jpg";
  //   if (state.ususu.IDIMAGEN && state.ususu.IDIMAGEN != "") {
  //     var byteArray = new Uint8Array(state.ususu.IMAGEN.data);
  //     var blob = new Blob([byteArray]);
  //     url = window.URL.createObjectURL(blob);
  //   }
  //   return url;
  // }
}
