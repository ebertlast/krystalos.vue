<template>
  <v-app id="inspire">
    <div>
      <v-progress-linear color="primary" height="2" :indeterminate="true" v-show="cargando"></v-progress-linear>
    </div>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Cambio de Clave</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="lock_open"
                    name="clave_actual"
                    label="Contraseña Actual"
                    type="password"
                    ref="clave_actual"
                    v-model="clave_actual"
                    v-on:keypress.enter="confirmar"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    name="clave_actual"
                    label="Contraseña Nueva"
                    type="password"
                    ref="clave_nueva"
                    v-model="clave_nueva"
                    v-on:keypress.enter="confirmar"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    name="clave_actual"
                    label="Confirme Contraseña Nueva"
                    type="password"
                    ref="clave_nueva2"
                    v-model="clave_nueva2"
                    v-on:keypress.enter="confirmar"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :to="{name:'kcentral'}" :disabled="cargando">Cancelar</v-btn>
                <v-btn
                  color="primary"
                  v-on:click.prevent="confirmar"
                  :loading="cargando"
                  :disabled="cargando || clave_actual ==='' || clave_nueva==='' || clave_nueva2==='' || clave_nueva!==clave_nueva2 "
                  ref="btn_confirmar"
                >Actualizar Contraseña</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    drawer: null,
    cargando: false,
    clave_actual: "",
    clave_nueva: "",
    clave_nueva2: ""
  }),
  mounted() {
    var self = this;
    setTimeout(() => {
      self.$refs.clave_actual.focus();
    }, 400);
  },
  methods: {
    ...mapActions(["setApiUrl", "notificacion"]),
    confirmar() {
      if (this.clave_actual === "") {
        return this.$refs.clave_actual.focus();
      }
      if (this.clave_nueva === "") {
        return this.$refs.clave_nueva.focus();
      }
      if (this.clave_nueva2 === "") {
        return this.$refs.clave_nueva2.focus();
      }
      this.cargando = true;
      var self = this;
      this.$http
        .get(`ususu/cambiar_clave/${this.clave_actual}/${this.clave_nueva}`)
        .then(res => {
          if (!res.success) {
            this.notificacion({ message: res.error, type: "error" });
          } else {
            this.notificacion({
              message: "Clave actualizada. Vuelve a iniciar sesión",
              type: "success"
            });
            this.$router.push({ name: "ingresar" });
          }
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          this.cargando = false;
        });
    },
    enter() {
      this.$refs.btn_confirmar.click();
    }
  }
};
</script>
