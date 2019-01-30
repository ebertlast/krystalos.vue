import { mapActions } from "vuex";
import { URL_API } from "../../../../common/globals";

export default {
  ...mapActions(["setApiUrl", "notificacion"]),
  ...mapActions("kseg", ["clearUsusu", "setUsusu"]),
  ...mapActions("dynamic_report", ["setReportes"]),
  ...mapActions("krycnf", [
    "actualizarMes",
    "refrescarDeps",
    "refrescarCius",
    "actualizarBarrios",
    "actualizarDocXTpo",
    "actualizarTipoDocumentos"
  ]),
  consultarClientes() {
    this.cargando = true;
    this.clis = [];
    this.$http
      .get(`${URL_API}cli/`)
      .then(res => {
        this.clis = res.recordset;
        this.cargando = false;
      })
      .catch(err => {
        this.cargando = false;
        console.log(err);
      });
  },
  consultarCompanias() {
    // console.log("ANTIGUA URL_API: ", this.api_url);
    this.cias = [];
    this.cia = {
      COMPANIA: "",
      RAZONSOCIAL: ""
    };
    this.cargando = true;
    this.setApiUrl(this.cli.URL_API);
    this.$http(`/cia/`).then(res => {
      this.cias = res.result.recordset;
      this.cargando = false;
    }).catch(err => {
      this.cargando = false;
      console.log(err)
    })
    // console.log("NUEVA URL_API: ", this.api_url);
  },
  limpiarClientes: () => {
    this.cli = {
      ACTIVO: false,
      CLIENTEID: "",
      RAZONSOCIAL: "",
      URL_API: "",
      VERSIONID: ""
    };
  },
  ingresar() {
    if (!this.cia || !this.cia.COMPANIA || this.cia.COMPANIA === "") {
      return this.$refs.cliente.focus();
    }
    if (!this.usuario || this.usuario === "") {
      return this.$refs.usuario.focus();
    }
    if (!this.clave || this.clave === "") {
      return this.$refs.clave.focus();
    }
    this.cargando = true;
    this.$http.get(`/ususu/ingresar/${this.cia.COMPANIA}/${this.usuario}/${this.clave}`).then(res => {
      // console.log(res);
      var ususu = res.result.recordset[0];
      if (!res.result.recordset[0]) {
        // this.animarDiv("sign-wrapper");
        this.notificacion({ message: "Credenciales incorrectas", type: "error" });
        this.cargando = false;
      } else {
        ususu.URL_API = this.api_url;
        // console.log(ususu);
        this.setUsusu(ususu).then(() => {
          // return (document.location = "/");
          this.$http.get(`usgruh/${ususu.GRUPO}`).then(res => {
            ususu.USGRUH = (res.result.recordset);
            this.setUsusu(ususu).then(() => {
              return this.$router.push({ name: "kcentral" });
            });
          }).catch(err => {
            this.cargando = false
            console.log(err);
          });
        });
      }
    }).catch(err => {
      this.cargando = false;
      console.log(err)
    })
  }
}