import { USUARIO_STORAGE } from "../../../common/globals";
export default {
  setUsusu: (state, ususu) => {
    state.ususu = ususu;
    if (localStorage.getItem(USUARIO_STORAGE) === null) {
    } else {
      localStorage.removeItem(USUARIO_STORAGE);
    }
    localStorage.setItem(USUARIO_STORAGE, JSON.stringify({ usuario: ususu }));
  },
  initUsusu: state => {
    if (!localStorage.getItem(USUARIO_STORAGE)) {
      state.ususu = {};
    } else {
      state.ususu = JSON.parse(localStorage.getItem(USUARIO_STORAGE))[
        "usuario"
      ];
    }
  },
  setToken: (state, token) => {
    var ususu = null;
    if (JSON.parse(localStorage.getItem(USUARIO_STORAGE))) {
      ususu = JSON.parse(localStorage.getItem(USUARIO_STORAGE))["usuario"];
    }

    // console.log(ususu)
    if (ususu) {
      state.ususu = JSON.parse(localStorage.getItem(USUARIO_STORAGE))[
        "usuario"
      ];
      state.ususu.TOKEN = token;
      localStorage.removeItem(USUARIO_STORAGE);
      localStorage.setItem(
        USUARIO_STORAGE,
        JSON.stringify({ usuario: state.ususu })
      );
    }
  },
  clearUsusu: state => {
    state.ususu = {};
    if (JSON.parse(localStorage.getItem(USUARIO_STORAGE))) {
      localStorage.removeItem(USUARIO_STORAGE);
      // router.push('/ingresar')
    }
  }
};
