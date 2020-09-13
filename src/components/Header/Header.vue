<template>
  <div class="component-header">
    <div class="name-and-position">
      <Title class="name">
        Гордей Переходов
      </Title>

      <div class="position">
        fullstack designer
      </div>
    </div>

    <div class="contacts">
      <a href="#" class="contact-item">
        Telegram
      </a>

      <a href="#" class="contact-item">
        Instagram
      </a>

      <a href="tel:8 999 201-31-98" class="contact-item phone">
        8 999 201-31-98
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Title from '@/components/Title';

export default Vue.extend({
  name: 'Header',
  components: {
    Title,
  },
});
</script>

<style scoped lang="scss">
.component-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.name-and-position {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.position {
  font-family: Ubuntu;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  margin-top: 7px;
}

.contacts {
  display: flex;
  margin-top: 12px;
}

.contact-item {
  font-family: Ubuntu;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  text-decoration: underline;
  color: #000000;
  margin-left: 69px;

  &:nth-child(1) {
    margin-left: 0;
  }

  &.phone {
    text-decoration: none;
  }
}
</style>
