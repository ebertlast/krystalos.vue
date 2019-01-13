export default {
  setAfi: ({ commit }, afi) => {
    if (afi.FNACIMIENTO) {
      var hoy = new Date();
      var cumpleanos = new Date(afi.FNACIMIENTO);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var m = hoy.getMonth() - cumpleanos.getMonth();

      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }
      commit("setEdadAfi", edad);

      if (afi.SEXO) {
        var avatar = "";
        if (afi.SEXO.toUpperCase() === "FEMENINO") {
          if (edad > 59) {
            avatar = "src/assets/images/avatars/Abuela.png";
          } else if (edad > 20 && edad < 60) {
            avatar = "src/assets/images/avatars/Adulta.png";
          } else if (edad > 10 && edad < 20) {
            avatar = "src/assets/images/avatars/Adolescenta.png";
          } else if (edad > 3 && edad < 10) {
            avatar = "src/assets/images/avatars/Niña.png";
          } else {
            avatar = "src/assets/images/avatars/Beba.png";
          }
        } else {
          if (edad > 59) {
            avatar = "src/assets/images/avatars/Abuelo.png";
          } else if (edad > 20 && edad < 60) {
            avatar = "src/assets/images/avatars/Adulto.png";
          } else if (edad > 10 && edad < 20) {
            avatar = "src/assets/images/avatars/Adolescente.png";
          } else if (edad > 3 && edad < 10) {
            avatar = "src/assets/images/avatars/Niño.png";
          } else {
            avatar = "src/assets/images/avatars/Bebe.png";
          }
        }
        commit("setAvatarAfi", avatar);
      }
    }
    commit("setAfi", afi);
  },
  setEdadAfi: ({ commit }, edad_afi) => {
    commit("setEdadAfi", edad_afi);
  },
  setAvatarAfi: ({ commit }, avatar_afi) => {
    commit("setAvatarAfi", avatar_afi);
  },
}
