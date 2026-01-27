<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="not-found-page">
    <h1 class="title">404</h1>
    <p class="message">The Crabigator could not find this page.</p>
    <RouterLink to="/" class="link">Go to dashboard</RouterLink>
  </div>
</template>

<style scoped>
.not-found-page {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.title {
  margin: 0;
  color: var(--foreground-color-0);
  font-size: 6rem;
  font-weight: 700;
  opacity: 0.5;
}

.message {
  margin: 0;
  color: var(--foreground-color-1);
  font-size: 1.2rem;
  text-align: center;
}

.link {
  margin-top: 1rem;
  color: var(--primary-color);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
