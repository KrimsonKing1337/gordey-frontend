<template>
  <div class="component-header">
    <div class="logo">
      <img src="@/assets/logo.svg" alt />
    </div>

    <div class="contacts">
      <ExternalLink href="https://t.me/prkhdv" class="contact-item">
        Telegram
      </ExternalLink>

      <ExternalLink href="https://instagram.com/prkhdv" class="contact-item">
        Instagram
      </ExternalLink>

      <a href="tel:8 999 201-31-98" class="contact-item phone">
        8 999 201-31-98
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import ExternalLink from '@/components/ExternalLink';

export default Vue.extend({
  name: 'Header',
  components: {
    ExternalLink,
  },
});
</script>

<style scoped lang="scss">
.component-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
