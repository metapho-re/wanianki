<script setup lang="ts">
import type { Radical, ReviewSubject } from "../types";
import { getRadicalImageUrl } from "../utils";

import RadicalView from "./radical-view.vue";

const { subject } = defineProps<{
  subject: ReviewSubject;
  primarySize: string;
  secondarySize: string;
}>();

const url =
  subject.object === "radical"
    ? getRadicalImageUrl((subject.data as Radical).character_images)
    : undefined;
</script>

<template>
  <radical-view
    v-if="subject.object === 'radical'"
    :characters="subject.data.characters"
    :url="url"
    :size="primarySize"
  />
  <p v-else class="japanese characters">
    {{ subject.data.characters }}
  </p>
</template>

<style scoped>
.characters {
  margin: 0;
}

.kanji .characters {
  font-size: v-bind(primarySize);
  line-height: v-bind(primarySize);
}

.vocabulary .characters {
  font-size: v-bind(secondarySize);
  line-height: v-bind(secondarySize);
}
</style>
