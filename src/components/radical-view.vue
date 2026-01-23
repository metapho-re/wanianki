<script setup lang="ts">
import BaseImage from "./base-image.vue";

defineProps<{
  characters: string | null;
  url: string | undefined;
  size: string;
}>();
</script>

<template>
  <p v-if="characters" class="japanese characters">
    {{ characters }}
  </p>
  <base-image v-else-if="url" :width="size" :height="size" :url="url" />
  <div v-else></div>
</template>

<style scoped>
.characters {
  margin: 0;
  font-size: v-bind(size);
  line-height: v-bind(size);
}
</style>
