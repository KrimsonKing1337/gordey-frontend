<template>
  <button type="button" class="button" v-on="$listeners">
    <ButtonLoader :loading="loading" :size="loaderSize">
      <slot />
    </ButtonLoader>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

import ButtonLoader from '@/components/ButtonLoader';

export default Vue.extend({
  name: 'Button',
  components: {
    ButtonLoader,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    loaderSize: {
      type: String,
      default: '20px',
    },
  },
});
</script>

<style scoped lang="scss">
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Ubuntu;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #000000;
  height: 46px;
  background: #c4c4c4;
  padding: 0 32px;
}
</style>
