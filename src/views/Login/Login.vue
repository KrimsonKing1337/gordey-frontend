<template>
  <div class="view-login">
    <div class="title">
      Login
    </div>

    <form class="form">
      <div class="input-wrapper">
        <label class="label" for="login">
          Login
        </label>

        <input
          id="login"
          v-model="login"
          class="input"
          type="text"
          required
          autofocus
          autocomplete="off"
        />
      </div>

      <div class="input-wrapper">
        <label class="label" for="password">
          Password
        </label>

        <input
          id="password"
          v-model="password"
          class="input"
          type="password"
          autocomplete="off"
          required
        />
      </div>

      <div v-if="showError" class="error">
        Wrong login and/or password!
      </div>

      <Button
        class="button"
        :loading="loading"
        loader-size="30px"
        @click.prevent="handleSubmit"
      >
        Login
      </Button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import axios from 'axios';

import Button from '@/components/Button';

export default Vue.extend({
  name: 'Login',
  components: {
    Button,
  },
  data() {
    return {
      login: null,
      password: null,
      showError: false,
      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
      this.showError = false;
      this.loading = true;

      const loginResp = await axios.post('/login', {
        login: this.login,
        password: this.password,
      });

      this.loading = false;

      const { access } = loginResp.data;

      if (access === true) {
        this.$store.commit('SET_AUTHORIZED', true);

        this.$router.push('edit');
      } else {
        this.showError = true;
      }
    },
  },
});
</script>

<style scoped lang="scss">
.view-login {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
}

.title {
  font-size: 26px;
  font-weight: bold;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 15px;

  &:nth-child(1) {
    margin-top: 0;
  }
}

.input {
  border: 1px #818181 solid;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
}

.button {
  margin-top: 15px;
}

.error {
  margin-top: 10px;
  color: red;
}

.loader {
  height: 20px;
  width: 20px;
}
</style>
