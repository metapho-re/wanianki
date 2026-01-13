<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <section class="section">
    <h1 class="section-title">{{ title }}</h1>
    <slot></slot>
  </section>
</template>

<style scoped>
.section {
  padding: 20px;
  border: 1px solid var(--background-color-3);
  border-radius: 8px;
  background-color: var(--background-color-0);
  margin-block-end: 20px;
}

.section:last-child {
  margin-block-end: 0;
}

.section-title {
  margin: 0;
}
</style>
