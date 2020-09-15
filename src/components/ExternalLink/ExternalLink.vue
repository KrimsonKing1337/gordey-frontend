<template>
  <a
    v-bind="$attrs"
    target="_blank"
    rel="noreferrer noopener"
    v-on="$listeners"
  >
    <slot />
  </a>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'ExternalLink',
});
</script>

<style scoped lang="scss">

</style>
