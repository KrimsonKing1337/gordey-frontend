<template>
  <div class="title">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Title',
});
</script>

<style scoped lang="scss">
.title {
  font-family: Ubuntu;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 41px;
  color: #000000;
}
</style>
