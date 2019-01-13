<template>
  <div>
    <div class="text-xs-center" v-if="false">
      <v-btn
        color="primary"
        @click="alert.show = !alert.show"
      >
        Toggle
      </v-btn>
    </div>
    <v-alert
      :value="alert.show"
      :type="alert.type"
      transition="scale-transition"
      @click="alert.show=false"
      style="cursor: pointer"
    >
      {{alert.text}}
    </v-alert>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      show: true,
      type: "warning",
      text: "This is a success alert."
    };
  },
  computed: {
    ...mapGetters(["alert"])
  }
};
</script>