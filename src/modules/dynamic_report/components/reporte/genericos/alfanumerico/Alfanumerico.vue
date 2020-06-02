<template>
  <v-flex xs12>
          <v-text-field
            :label="parametro.PARAMETRO_NOMBRE"
            v-model="parametro.VALOR"
          ></v-text-field>
        </v-flex>
</template>

<script>
export default {
  props: ["parametro"]
};
</script>

<style>
</style>
