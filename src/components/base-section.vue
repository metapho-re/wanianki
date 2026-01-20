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
  padding: 20px 24px;
  border: 1px solid var(--background-color-3);
  border-radius: var(--radius-md);
  background: var(--background-color-0);
  box-shadow: var(--shadow-sm);
  margin-block-end: 16px;
}

.section:last-child {
  margin-block-end: 0;
}

.section-title {
  padding-bottom: 10px;
  border-bottom: 1px solid var(--background-color-3);
  margin: 0 0 12px;
  color: var(--foreground-color-1);
  font-size: 1.1rem;
  font-weight: 700;
}

@media (width <= 768px) {
  .section {
    padding: 16px 18px;
    margin-block-end: 12px;
  }

  .section-title {
    padding-bottom: 8px;
    margin-bottom: 10px;
    font-size: 1rem;
  }
}

@media (width <= 480px) {
  .section {
    padding: 12px 14px;
    margin-block-end: 10px;
  }

  .section-title {
    font-size: 0.95rem;
  }
}
</style>
