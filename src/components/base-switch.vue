<script setup lang="ts">
defineProps<{
  offLabel: string;
  onLabel: string;
}>();

const checked = defineModel<boolean>();
</script>

<template>
  <div class="switch-container">
    <span>{{ offLabel }}</span>
    <label class="switch">
      <input v-model="checked" type="checkbox" />
      <span class="slider"></span>
    </label>
    <span>{{ onLabel }}</span>
  </div>
</template>

<style scoped>
.switch-container {
  display: flex;
  align-items: center;
  padding: 2px;
  gap: 8px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 18px;
  border: 1px solid var(--primary-color-transparent);
  border-radius: 12px;
  transition: 0.25s;
}

.switch:hover {
  border-color: var(--primary-color);
}

.switch:has(input:checked) {
  border-color: var(--primary-color);
}

.switch input {
  width: 0;
  height: 0;
  opacity: 0;
}

.slider {
  position: absolute;
  border-radius: 18px;
  background-color: var(--background-color-1);
  cursor: pointer;
  inset: 0;
  transition: 0.25s;
}

.slider:hover {
  background-color: var(--primary-color-transparent);
}

.slider::before {
  position: absolute;
  bottom: 1px;
  left: 1px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--foreground-color);
  content: "";
  transition: 0.25s;
}

input:checked + .slider {
  background-color: transparent;
}

input:checked + .slider::before {
  background-color: var(--primary-color);
  transform: translateX(18px);
}
</style>
