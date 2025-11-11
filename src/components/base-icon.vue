<script setup lang="ts">
defineProps<{
  path: string;
  width: string;
  height: string;
}>();
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 -960 960 960"
    fill="currentColor"
  >
    <path :d="path" />
    />
  </svg>
</template>
