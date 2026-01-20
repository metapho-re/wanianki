<script setup lang="ts">
import { ref } from "vue";

import { hideImageIconPath } from "../icon-paths";

import BaseIcon from "./base-icon.vue";
import BaseSpinner from "./base-spinner.vue";

defineProps<{
  url: string;
  width: string;
  height: string;
}>();

const loading = ref<boolean>(true);
const error = ref<boolean>(false);

const onLoad = () => {
  loading.value = false;
  error.value = false;
};

const onError = () => {
  loading.value = false;
  error.value = true;
};
</script>

<template>
  <div v-if="loading" class="wrapper">
    <base-spinner :width="width" :height="height" />
  </div>
  <div v-else-if="error" class="wrapper">
    <base-icon
      class="error"
      :path="hideImageIconPath"
      :width="width"
      :height="height"
    />
  </div>
  <img
    v-show="!loading && !error"
    class="image"
    :src="url"
    @load="onLoad"
    @error="onError"
  />
</template>

<style scoped>
.wrapper {
  display: flex;
}

.image {
  width: v-bind(width);
  height: v-bind(height);
}

.error {
  color: var(--error-color);
}
</style>
