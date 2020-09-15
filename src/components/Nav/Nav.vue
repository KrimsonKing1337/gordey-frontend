<template>
  <div class="component-nav">
    <div class="nav-item" :class="{'is-active' : activeIndex === -1}" @click="tagClickHandler(-1)">
      Все
    </div>

    <div
      v-for="(tagCur, index) in tags"
      :key="tagCur.name"
      class="nav-item"
      :class="{'is-active' : activeIndex === index}"
      @click="tagClickHandler(index, tagCur.name)"
    >
      {{ tagCur.name }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters } from 'vuex';

export default Vue.extend({
  name: 'Nav',
  data() {
    return {
      activeIndex: -1,
    };
  },
  computed: {
    ...mapState(['tags']),
    ...mapGetters(['getFilteredProjectsByTag']),
  },
  methods: {
    tagClickHandler(index, tagName) {
      this.activeIndex = index;

      const filteredProjects = this.getFilteredProjectsByTag(tagName);

      this.$store.commit('SET_PROJECTS_ALL', filteredProjects);
    },
  },
});
</script>

<style scoped lang="scss">
.component-nav {
  display: flex;
}

.nav-item {
  font-family: Ubuntu;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #818181;
  margin-left: 33px;
  cursor: pointer;

  &:nth-child(1) {
    margin-left: 0;
  }

  &.is-active {
    color: #000;
    font-weight: bold;
  }
}
</style>
