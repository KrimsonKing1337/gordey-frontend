<template>
  <div class="component-wrapper">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Wrapper',
});
</script>

<style scoped lang="scss">
  .component-wrapper {
    width: 1200px;
    margin: 0 auto;
  }
</style>
