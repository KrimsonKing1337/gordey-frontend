<template>
  <div class="tags-wrapper">
    <div v-for="(tagCur, index) in tags" :key="tagCur.name" class="tag">
      {{ tagCur.name }}

      <span v-if="index !== tags.length - 1" class="separator">
        |
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import * as types from '@/types';

export default Vue.extend({
  name: 'Tags',
  props: {
    tags: {
      type: Array as PropType<types.Tag[]>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.tags-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: Ubuntu;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: #000000;
}

.tag {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 5px;

  &:nth-child(1) {
    margin-left: 0;
  }
}

.separator {
  padding: 0 5px;
}
</style>
