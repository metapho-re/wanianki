<script setup lang="ts">
defineProps<{
  width: string;
  height: string;
}>();
</script>

<template>
  <span class="loader"></span>
</template>

<style scoped>
.loader {
  position: relative;
  display: inline-block;
  width: v-bind(width);
  height: v-bind(height);
}

.loader::after,
.loader::before {
  position: absolute;
  top: 0;
  left: 0;
  width: v-bind(width);
  height: v-bind(height);
  box-sizing: border-box;
  border: 2px solid var(--foreground-color-1);
  border-radius: var(--radius-sm);
  animation: rotation-break 3s ease-in-out infinite alternate;
  content: "";
}

.loader::after {
  border-color: var(--primary-color);
  animation-direction: alternate-reverse;
  box-shadow: var(--shadow-glow) var(--primary-color-glow);
}

@keyframes rotation-break {
  0% {
    transform: rotate(0);
  }

  25% {
    transform: rotate(90deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(270deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
