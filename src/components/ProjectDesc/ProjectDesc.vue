<template>
  <div class="component-project-desc no-reset">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ProjectDesc',
});
</script>

<style scoped lang="scss">
.component-project-desc {
  font-family: Ubuntu;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
}
</style>
