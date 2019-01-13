<template>
  <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="dateFormatted"
            :label="parametro.PARAMETRO_NOMBRE"
            hint="Formato: YYYYMMDD"
            persistent-hint
            prepend-icon="event"
            @change="date = parseDate(dateFormatted)"
          ></v-text-field>
          <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
        </v-menu>
</template>

<script>
export default {
  props: ["parametro"],

  data: () => ({
    date: null,
    dateFormatted: null,
    menu: false
  }),

  mounted() {
    if (this.parametro.VALOR.trim() !== "") {
      const fecha = this.parametro.VALOR;
      const year = fecha.substring(0, 4);
      const month = fecha.substring(4, 6);
      const day = fecha.substring(6, 8);
      this.date = `${year}-${month}-${day}`;
    }
  },

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
      this.parametro.VALOR = this.dateFormatted;
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${year}${month}${day}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }
};
</script>

<style>
</style>
