<template>
  <Wrapper class="view-home">
    <Header />

    <Nav class="nav" />

    <div class="projects-wrapper">
      <Project
        v-for="projectCur in projects"
        :key="projectCur.id"
        v-bind="projectCur"
        class="project"
      />
    </div>
  </Wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

import Wrapper from '@/components/Wrapper';
import Header from '@/components/Header';
import Nav from '@/components/Nav';
import Project from '@/components/Project';

export default Vue.extend({
  name: 'Home',
  components: {
    Project,
    Nav,
    Header,
    Wrapper,
  },
  computed: {
    ...mapState(['projects']),
  },
});
</script>

<style lang="scss" scoped>
.view-home {
  padding-top: 95px;
  padding-bottom: 550px;
}

.nav {
  margin-top: 102px;
}

.projects-wrapper {
  margin-top: 30px;
}

.project {
  margin-top: 100px;

  &:nth-child(1) {
    margin-top: 0;
  }
}
</style>
