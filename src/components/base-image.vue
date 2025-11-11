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

const loading = ref(true);
const error = ref(false);

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
  <div>
    <div v-if="loading"><base-spinner :width="width" :height="height" /></div>
    <div v-else-if="error">
      <base-icon
        class="error"
        :path="hideImageIconPath"
        :width="width"
        :height="height"
      />
    </div>
    <img
      v-show="!loading && !error"
      :src="url"
      :width="width"
      :height="height"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<style scoped>
.error {
  color: var(--error-color);
}
</style>
