<script setup lang="ts">
import { RouterView } from "vue-router";

import { NotificationContainer } from "./components";
</script>

<template>
  <div class="wrapper">
    <RouterView />
    <NotificationContainer />
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  max-width: 1920px;
  height: 100%;
  max-height: 1080px;
  padding: 20px;
}

@media (width <= 768px) {
  .wrapper {
    padding: 12px;
  }
}

@media (width <= 480px) {
  .wrapper {
    padding: 8px;
  }
}
</style>
