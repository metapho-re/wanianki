<script setup lang="ts">
defineProps<{
  path: string;
  width: string;
  height: string;
}>();
</script>

<template>
  <svg
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    fill="currentColor"
  >
    <path :d="path" />
  </svg>
</template>

<style scoped>
.icon {
  width: v-bind(width);
  height: v-bind(height);
}
</style>
