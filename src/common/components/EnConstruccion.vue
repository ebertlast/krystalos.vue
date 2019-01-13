<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 @click="cancelar" style="cursor:pointer">
        <v-card>
          <v-img
            src="../../../../src/assets/images/en_construccion.jpg"
            class="grey darken-4"
          ></v-img>
          <v-card-title class="title">
            <v-flex xs12>
              <v-tooltip top>
                <v-btn slot="activator" @click="cancelar" fab small dark>
                  <v-icon>undo</v-icon>
                </v-btn>
                <span>Cancelar</span>
              </v-tooltip>
            </v-flex>

          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods:{
    cancelar(){
      this.$emit("cancelar")
    }
  }
}
</script>

<style>

</style>
