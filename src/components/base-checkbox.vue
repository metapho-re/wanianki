<script setup lang="ts" generic="T">
defineProps<{
  value: T;
}>();

const model = defineModel<T[]>();
</script>

<template>
  <label class="checkbox">
    <input v-model="model" :value="value" type="checkbox" />
    <span class="checkmark"></span>
    <span class="text"><slot></slot></span>
  </label>
</template>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox input[type="checkbox"] {
  display: none;
}

.checkbox .checkmark {
  position: relative;
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid var(--primary-color-transparent);
  border-radius: 4px;
  background-color: var(--background-color-1);
  transition: 0.25s;
}

.checkbox:hover .checkmark {
  background-color: var(--primary-color-transparent);
}

.checkbox input[type="checkbox"]:checked + .checkmark {
  border-color: transparent;
  background-color: transparent;
}

.checkbox .checkmark::after {
  position: absolute;
  top: -3px;
  left: 2px;
  width: 6px;
  height: 10px;
  border: solid var(--primary-color);
  border-width: 0 2px 2px 0;
  content: "";
  opacity: 0;
  transform: rotate(45deg);
}

.checkbox input[type="checkbox"]:checked + .checkmark::after {
  opacity: 1;
}
</style>
