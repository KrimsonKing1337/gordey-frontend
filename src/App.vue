<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  created() {
    this.$store.dispatch('GET_PROJECTS_ALL');
    this.$store.dispatch('GET_TAGS_ALL');
  },
});
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none;
}

input,
textarea {
  border: 0;
}

button {
  border: 0;
  cursor: pointer;
}

body {
  font-family: Ubuntu, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0 15px;
}

a {
  font: inherit;
  color: inherit;
  text-decoration: underline;
}

.ql-editor,
.no-reset {
  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }
}
</style>
