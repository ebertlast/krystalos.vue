<template>
        <v-autocomplete
        v-model="parametro.VALOR"
        :items="parametro.CONSULTA.recordset"
        :label="`${parametro.PARAMETRO_NOMBRE}`"
        persistent-hint
        :item-text="item_text"
        :item-value="item_value"
        :clearable="true"
      >
        <v-slide-x-reverse-transition
          slot="append-outer"
          mode="out-in"
        >
        </v-slide-x-reverse-transition>
      </v-autocomplete>
</template>

<script>
export default {
  props: ["parametro"],
  data: () => ({
    isEditing: false,
    model: null,
    item_text: "",
    item_value: ""
  }),
  mounted() {
    this.parametro.VALOR = "";
    // console.log(this.parametro.consulta.recordset);
    // console.log(this.parametro.VALOR);
    this.item_value = Object.keys(this.parametro.CONSULTA.recordset[0])[0];
    this.item_text = Object.keys(this.parametro.CONSULTA.recordset[0])[1];
    // console.log("Item-Text: ", this.item_text);
    // console.log("Item-Value: ", this.item_value);
    // console.log(this.parametro.VALOR);
    // console.log(this.parametro);
  }
};
</script>

<style>
</style>

</template>

<script>
export default {
  props: ["parametro"],
  data: () => ({
    isEditing: false,
    model: null,
    item_text: "",
    item_value: ""
  }),
  mounted() {
    this.parametro.VALOR = "";
    // console.log(this.parametro.consulta.recordset);
    // console.log(this.parametro.VALOR);
    this.item_value = Object.keys(this.parametro.CONSULTA.recordset[0])[0];
    this.item_text = Object.keys(this.parametro.CONSULTA.recordset[0])[1];
    // console.log("Item-Text: ", this.item_text);
    // console.log("Item-Value: ", this.item_value);
    // console.log(this.parametro.VALOR);
    // console.log(this.parametro);
  }
};
</script>

<style>
</style>
