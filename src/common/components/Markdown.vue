<template>
  <div>
    <h1>{{texto}}</h1>
    <VueMarkdown>###**Prueba**</VueMarkdown>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
export default {
  props: ["texto"],
  components: {
    VueMarkdown
  }
};
</script>

<style>
</style>
