<script setup lang="ts">
import { RouterView } from "vue-router";

import { NotificationContainer } from "./components";
</script>

<template>
  <suspense>
    <template #default>
      <div class="wrapper">
        <RouterView />
        <NotificationContainer />
      </div>
    </template>
  </suspense>
</template>

<style scoped>
.wrapper {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  padding: 20px;
}
</style>
