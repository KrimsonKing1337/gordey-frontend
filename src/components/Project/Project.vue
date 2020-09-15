<template>
  <div class="component-project">
    <img :src="imgUrl" alt class="img" />

    <div class="footer">
      <ProjectDesc>
        <div v-html="desc" />
      </ProjectDesc>

      <Tags :tags="tags" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import * as types from '@/types';

import Tags from '@/components/Tags';
import ProjectDesc from '@/components/ProjectDesc';

export default Vue.extend({
  name: 'Project',
  components: {
    ProjectDesc,
    Tags,
  },
  props: {
    tags: {
      type: Array as PropType<types.Tag[]>,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Ubuntu;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  margin-top: 20px;
}

.img {
  width: 100%;
}
</style>
