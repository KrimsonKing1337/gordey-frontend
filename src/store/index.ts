import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as types from '@/types';

Vue.use(Vuex);

type activeProject = null | types.Project;

export default new Vuex.Store({
  state: {
    projects: [] as types.Project[],
    projectsDefault: [] as types.Project[],
    tags: [] as types.Tag[],
    authorized: false as boolean,
    activeProject: null as activeProject,
  },
  mutations: {
    SET_PROJECTS_ALL(state, value: types.Project[]) {
      state.projects = value;
    },
    SET_PROJECTS_ALL_DEFAULT(state, value: types.Project[]) {
      state.projectsDefault = value;
    },
    SET_TAGS_ALL(state, value: types.Tag[]) {
      state.tags = value;
    },
    SET_AUTHORIZED(state, value: boolean) {
      state.authorized = value;
    },
    SET_ACTIVE_PROJECT(state, value: activeProject) {
      state.activeProject = value;
    },
  },
  actions: {
    async GET_PROJECTS_ALL(store) {
      const getProjectsAllResp = await axios.get('/api/projects-all');

      store.commit('SET_PROJECTS_ALL', getProjectsAllResp.data);
      store.commit('SET_PROJECTS_ALL_DEFAULT', getProjectsAllResp.data);
    },
    async GET_TAGS_ALL(store) {
      const getTagsAllResp = await axios.get('/api/tags-all');

      store.commit('SET_TAGS_ALL', getTagsAllResp.data);
    },
  },
  getters: {
    getFilteredProjectsByTag: (state) => (tag) => {
      if (!tag) {
        return state.projectsDefault;
      }

      const filteredProjects = [] as types.Project[];

      for (let i = 0; i < state.projectsDefault.length; i++) {
        const projectCur = state.projectsDefault[i];
        const projectCurTags = projectCur.tags;

        for (let j = 0; j < projectCurTags.length; j++) {
          const tagCur = projectCurTags[j];

          if (tagCur.name === tag) {
            filteredProjects.push(projectCur);
          }
        }
      }

      return filteredProjects;
    },
  },
});
