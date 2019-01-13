<template>
  <h1>Terceros</h1>
</template>

<script>
export default {
  mounted() {
    this.actualizarIPSs();
  },
  methods: {
    actualizarIPSs() {
      this.cargando = true;
      this.$http
        .get(`usvgs/TERCATIPS`)
        .then(res => {
          return res.result.recordset[0];
        })
        .then(usvgs => {
          this.cargando = true;
          this.$http
            .get(`ter/categoria/${usvgs.DATO}`)
            .then(res => {
              this.ipss = res.result.recordset;
            })
            .catch(err => {
              console.log(err);
            })
            .then(() => {
              this.cargando = false;
            });
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          this.cargando = false;
        });
    }
  }
};
</script>

<style>
</style>
