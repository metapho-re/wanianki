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
  border: 1px solid var(--background-color-3);
  border-radius: var(--radius-md);
  background: linear-gradient(
    180deg,
    var(--background-color-2) 0%,
    var(--background-color-1) 100%
  );
  box-shadow: var(--shadow-sm);
  color: var(--foreground-color-0);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 400;
  gap: 8px;
  letter-spacing: 0.01em;
  transition: var(--transition-base);
}

.button.small {
  padding: 0.35rem 0.7rem;
  font-size: 0.8rem;
  gap: 6px;
}

.button:disabled {
  border-color: var(--background-color-3);
  background: var(--background-color-2);
  color: var(--muted-color);
  cursor: not-allowed;
  opacity: 0.6;
}

.button:hover:not(:disabled) {
  border-color: var(--primary-color);
  background: linear-gradient(
    180deg,
    var(--primary-color-transparent) 0%,
    var(--background-color-1) 100%
  );
  box-shadow: var(--shadow-glow) var(--primary-color-glow);
  transform: translateY(-1px);
}

.button:active:not(:disabled) {
  box-shadow: var(--shadow-sm);
  transform: translateY(0);
}
</style>
