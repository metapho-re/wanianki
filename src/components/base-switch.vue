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
  width: 48px;
  height: 28px;
}

.switch input {
  width: 0;
  height: 0;
  opacity: 0;
}

.slider {
  position: absolute;
  border-radius: 28px;
  background-color: var(--dimmed-color);
  cursor: pointer;
  inset: 0;
  transition: 0.25s;
}

.slider::before {
  position: absolute;
  bottom: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: var(--foreground-color);
  content: "";
  transition: 0.25s;
}

input:checked + .slider {
  background-color: var(--primary-color);
}

input:checked + .slider::before {
  transform: translateX(20px);
}
</style>
