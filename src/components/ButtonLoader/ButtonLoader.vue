<template>
  <span class="component-button-loader">
    <span v-if="loading" class="loader" :style="`height: ${size}; width: ${size}`" />

    <span class="content" :class="{'is-loading': loading}">
      <slot />
    </span>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ButtonLoader',
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    size: {
      type: String,
      default: '30px',
    },
  },
});
</script>

<style scoped lang="scss">
.component-button-loader {
  position: relative;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loader {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border: 2px solid #111;
  border-top: 2px solid #ffff00;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

.content {
  &.is-loading {
    opacity: 0;
  }
}
</style>
