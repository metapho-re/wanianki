<script setup lang="ts">
import { computed } from "vue";

import { useLogin, user } from "../composables";

import LoginPage from "./login-page.vue";
import ReviewSelectionPage from "./review-selection-page.vue";

const { inputValue, isLoading, onSubmit } = await useLogin();

const canLogin = computed(() => !!user.value);
</script>

<template>
  <LoginPage
    v-if="!canLogin"
    v-model="inputValue"
    :is-loading="isLoading"
    @submit="onSubmit"
  />
  <ReviewSelectionPage v-else :user="user!" />
</template>
