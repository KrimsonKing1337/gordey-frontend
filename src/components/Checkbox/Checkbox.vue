<template>
  <label class="checkbox-wrapper">
    <input
      v-model="model"
      type="checkbox"
      hidden
      class="checkbox-hidden"
      :value="val"
    />

    <span class="checkbox">
      <span class="checkbox-checked" />
    </span>

    <span class="label">
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Checkbox',
  props: {
    value: {
      type: null as any,
      default: null,
    },
    val: {
      type: null as any,
      required: true,
    },
  },
  computed: {
    model: {
      get(): any {
        return this.value;
      },
      set(val: any): void {
        this.$emit('input', val);
      },
    },
  },
});
</script>

<style scoped lang="scss">
.checkbox-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
}

.checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #818181;
  width: 20px;
  height: 20px;
}

.checkbox-checked {
  display: none;
  width: 12px;
  height: 12px;
  background: #818181;
}

.checkbox-hidden {
  &:checked + .checkbox {
    .checkbox-checked {
      display: block;
    }
  }
}

.label {
  font-family: Ubuntu;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  color: #000000;
  margin-left: 11px;
}
</style>
