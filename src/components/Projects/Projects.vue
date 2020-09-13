<template>
  <div class="component-projects">
    <Title>
      Загруженные проекты
    </Title>

    <div class="projects-wrapper">
      <div v-for="(projectCur, index) in projects" :key="projectCur.id" class="project">
        <img :src="projectCur.imgUrl" alt class="img" />

        <ProjectDesc class="desc">
          <div v-html="projectCur.desc" />
        </ProjectDesc>

        <Tags :tags="projectCur.tags" />

        <div class="buttons-wrapper">
          <Button class="btn" @click="editBtnClickHandler(projectCur)">
            Редактировать
          </Button>

          {{ projectCur.loading }}

          <Button class="btn" :loading="loading[index]" @click="deleteBtnClickHandler(projectCur, index)">
            Удалить
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

import axios from 'axios';

import Button from '@/components/Button';
import Title from '@/components/Title';
import ProjectDesc from '@/components/ProjectDesc';
import Tags from '@/components/Tags';

export default Vue.extend({
  name: 'Projects',
  components: {
    Tags,
    ProjectDesc,
    Title,
    Button,
  },
  data() {
    return {
      loading: [] as boolean[],
    };
  },
  computed: {
    ...mapState(['projects']),
  },
  watch: {
    projects() {
      this.prepareLoading();
    },
  },
  beforeMount() {
    this.prepareLoading();
  },
  methods: {
    prepareLoading() {
      this.projects.forEach(() => {
        this.loading.push(false);
      });
    },
    editBtnClickHandler(project): void {
      this.$store.commit('SET_ACTIVE_PROJECT', project);

      window.scrollTo(0, 0);
    },
    async deleteBtnClickHandler(project, index): Promise<void> {
      // eslint-disable-next-line no-alert
      const result = window.confirm('Точно удалить?');

      if (!result) {
        return;
      }

      this.$set(this.loading, index, true);

      await axios.delete(`/api/project/${project.id}`);

      this.$set(this.loading, index, false);
      this.$store.dispatch('GET_PROJECTS_ALL');
    },
  },
});
</script>

<style scoped lang="scss">
.projects-wrapper {
  margin-top: 24px;
}

.project {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;

  &:nth-child(1) {
    margin-top: 0;
  }
}

.img {
  width: 139px;
}

.desc {
  margin-left: 29px;
}

.tags-wrapper {
  margin-left: 45px;
}

.buttons-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: auto;
}

.btn {
  margin-left: 22px;

  &:nth-child(1) {
    margin-left: 0;
  }
}
</style>
