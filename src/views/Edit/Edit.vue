<template>
  <Wrapper class="view-edit">
    <Title class="title">
      {{ activeProject ? 'Отредактировать существующий' : 'Загрузить новый' }}
    </Title>

    <div class="input-img">
      <input
        ref="input-file"
        accept="image/*"
        type="file"
        hidden
        @change="fileChangeHandler"
      />

      <input type="text" :value="fileInputValue" class="input input-file" />

      <button type="button" class="btn-choose-img" @click="btnChooseImgClickHandler">
        Выбрать файл
      </button>
    </div>

    <div class="desc">
      <label for="desc" class="label">
        Описание
      </label>

      <div
        id="desc"
        ref="desc"
        class="textarea"
        @click="textareaClickHandler"
      />
    </div>

    <!--
    <div class="link-label">
      <label for="link-label" class="label">
        Текст ссылки
      </label>

      <input id="link-label" type="text" class="input" />
    </div>

    <div class="link-href">
      <label for="link-href" class="label">
        Ссылка
      </label>

      <input id="link-href" type="text" class="input" />
    </div>
    -->

    <div class="tags-wrapper">
      <Checkbox
        v-for="tagCur in tags"
        :key="tagCur.name"
        v-model="chosenTags"
        :val="tagCur.name"
        class="tag"
      >
        {{ tagCur.name }}
      </Checkbox>
    </div>

    <Button class="btn-submit" :loading="loading" @click="btnSubmitClickHandler">
      {{ activeProject ? 'Обновить' : 'Загрузить' }}
    </Button>

    <Projects class="projects" />
  </Wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

import axios, { AxiosPromise } from 'axios';
import prettyBytes from 'pretty-bytes';
import Quill from 'quill';

import Wrapper from '@/components/Wrapper';
import Projects from '@/components/Projects';
import Button from '@/components/Button';
import Title from '@/components/Title';
import Checkbox from '@/components/Checkbox';

type uploadFile = File | '';

export default Vue.extend({
  name: 'Edit',
  components: {
    Checkbox,
    Title,
    Button,
    Projects,
    Wrapper,
  },
  data() {
    return {
      file: '' as uploadFile,
      quill: {} as any,
      chosenTags: [],
      loading: false,
      fileInputValueDefault: 'Драгэнддропни',
      fileInputValue: 'Драгэнддропни',
    };
  },
  computed: {
    ...mapState(['tags', 'activeProject']),
  },
  watch: {
    activeProject() {
      this.setActiveProject();
    },
  },
  mounted() {
    this.quill = new Quill('#desc', {
      theme: 'snow',
    });

    this.setActiveProject();
  },
  methods: {
    setActiveProject(): void {
      if (!this.activeProject) {
        return;
      }

      const { tags, desc } = this.activeProject;

      this.chosenTags = tags.map((tagCur) => tagCur.name);
      this.changeHTMLInQlEditor(desc);
    },
    getTextareaContent(): string {
      const textareaElement = this.$refs.desc as HTMLElement;
      const editorElement = textareaElement.querySelector('.ql-editor');

      return editorElement?.innerHTML || '';
    },
    submitFile(projectId): AxiosPromise {
      const formData = new FormData();

      formData.append('img', this.file);

      return axios.put(`/api/project/${projectId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    async submitDataPost(data): Promise<string> {
      const resp = await axios.post('/api/project', data);

      return resp.data;
    },
    async submitDataPatch(id, data): Promise<string> {
      const resp = await axios.patch(`/api/project/${id}`, data);

      return resp.data;
    },
    changeHTMLInQlEditor(html = '<p></p>') {
      const descElement = this.$refs.desc as HTMLElement;
      const qlEditorInnerElement = descElement.querySelector('.ql-editor');

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore-next-line
      qlEditorInnerElement.innerHTML = html;
    },
    reset() {
      this.file = '';
      this.fileInputValue = this.fileInputValueDefault;
      this.chosenTags = [];
      this.changeHTMLInQlEditor();
    },

    fileChangeHandler(e: Event): void {
      const target = e.target as HTMLInputElement;
      const files = target?.files as FileList;
      // eslint-disable-next-line prefer-destructuring
      this.file = files[0];

      const { name, size } = this.file;

      const humanSize = prettyBytes(size);

      this.fileInputValue = `Выбран ${name} (${humanSize})`;
    },
    async btnSubmitClickHandler(): Promise<void> {
      const data = {
        desc: this.getTextareaContent(),
        tags: this.chosenTags.join(','),
      };

      this.loading = true;

      if (!this.activeProject) {
        const newProjectId = await this.submitDataPost(data);

        await this.submitFile(newProjectId);
      } else {
        const { id } = this.activeProject;

        await this.submitDataPatch(id, data);
        await this.submitFile(id);

        this.$store.commit('SET_ACTIVE_PROJECT', null);
      }

      this.reset();

      this.loading = false;
      this.$store.dispatch('GET_PROJECTS_ALL');
    },
    textareaClickHandler(): void {
      this.quill.focus();
    },
    btnChooseImgClickHandler(): void {
      const inputFile = this.$refs['input-file'] as HTMLElement;

      inputFile.click();
    },
  },
});
</script>

<style scoped lang="scss">
.view-edit {
  padding-top: 82px;
  padding-bottom: 550px;
}

.title {
  margin-bottom: 40px;
}

.input {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 2px solid #818181;
  height: 48px;
  width: 100%;
  padding: 0 20px;
  font-family: Ubuntu;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  color: #000000;
}

.textarea {
  border: 2px solid #818181;
  resize: none;
  min-height: 200px;
  width: 100%;
  padding: 20px;
  cursor: text;

  &::v-deep .ql-editor {
    min-height: inherit;
  }
}

.label {
  display: block;
  font-family: Ubuntu;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  color: #000000;
}

.input-img {
  position: relative;
}

.input-file {
  pointer-events: none;
}

.btn-choose-img {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 2px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  background: #c4c4c4;
  font-family: Ubuntu;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #000000;
  padding: 0 16px;
}

.desc {
  margin-top: 28px;

  .label + .textarea {
    margin-top: 12px;
  }
}

.link-label {
  margin-top: 28px;

  .label + .input {
    margin-top: 10px;
  }
}

.link-href {
  margin-top: 37px;

  .label + .input {
    margin-top: 10px;
  }
}

.tags-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 28px;
}

.tag {
  margin-left: 35px;

  &:nth-child(1) {
    margin-left: 0;
  }
}

.btn-submit {
  margin-top: 43px;
}

.projects {
  margin-top: 160px;
}

.desc {
  &::v-deep .ql-toolbar {
    border: 2px solid #818181;
    margin-top: 10px;
  }
}
</style>
