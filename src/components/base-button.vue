<script setup lang="ts">
import BaseIcon from "./base-icon.vue";

defineProps<{
  size?: "normal" | "small";
  leftIconPath?: string;
  rightIconPath?: string;
  onClick: (event: MouseEvent) => void;
}>();
</script>

<template>
  <button
    class="button"
    :class="size === 'small' ? 'small' : ''"
    @click="onClick"
  >
    <base-icon
      v-if="leftIconPath"
      :path="leftIconPath"
      width="24px"
      height="24px"
    />
    <slot></slot>
    <base-icon
      v-if="rightIconPath"
      :path="rightIconPath"
      width="24px"
      height="24px"
    />
  </button>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  border: 1px solid var(--primary-color-transparent);
  border-radius: 8px;
  background-color: transparent;
  color: var(--foreground-color);
  cursor: pointer;
  font-size: 1rem;
  gap: 10px;
  transition: 0.25s;
}

.button.small {
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  gap: 8px;
}

.button:hover {
  border-color: var(--primary-color);
  background-color: var(--primary-color-transparent);
  color: var(--background-color-1);
}

.button:disabled {
  border-color: var(--dimmed-color);
  background-color: var(--background-color-2);
  color: var(--dimmed-color);
  cursor: not-allowed;
}

.button:focus {
  outline: none;
}
</style>
