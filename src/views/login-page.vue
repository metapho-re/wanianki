<script setup lang="ts">
import { BaseIcon } from "../components";
import { useTagline } from "../composables";
import { loginIconPath } from "../icon-paths";

defineEmits<{ submit: [] }>();
defineProps<{ isLoading: boolean }>();

const inputModel = defineModel<string>();

const tagline = useTagline();
</script>

<template>
  <div className="login-page">
    <div className="header-container">
      <h1 className="title">WaniAnki</h1>
      <h2 className="tagline">{{ tagline }}</h2>
    </div>
    <div className="form-container">
      <div className="form">
        <input
          v-model="inputModel"
          class="input"
          placeholder="Enter you WaniKani API key"
          type="password"
          :disabled="isLoading"
        />
        <button
          class="button"
          type="button"
          :disabled="isLoading"
          @click="$emit('submit')"
        >
          Authenticate
          <base-icon width="32px" height="32px" :path="loginIconPath" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: grid;
  height: 100%;
  grid-template-areas:
    "titles"
    "form";
  grid-template-rows: 2fr 1fr;
}

.header-container {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-area: titles;
}

.title {
  background-clip: text;
  background-image: linear-gradient(
    90deg,
    var(--vocabulary-color),
    var(--kanji-color),
    var(--radical-color) 80%
  );
  background-size: 100%;
  font-size: 8rem;
  font-weight: 700;
  margin-block: 0;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}

.tagline {
  font-size: 1.8rem;
  font-weight: 400;
}

.form-container {
  display: flex;
  justify-content: center;
  grid-area: form;
}

.form {
  display: flex;
  width: 50vw;
  height: 3.2rem;
}

.input {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid var(--background-color-3);
  background-color: var(--background-color-2);
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
  color: var(--foreground-color);
  font-size: 1.2rem;
  padding-inline-start: 1rem;
  transition: 0.25s;
}

.button {
  display: flex;
  height: 100%;
  align-items: center;
  border: 1px solid var(--background-color-3);
  border-left: none;
  background-color: var(--primary-color-transparent);
  border-bottom-right-radius: 1rem;
  border-top-right-radius: 1rem;
  color: var(--background-color-1);
  cursor: pointer;
  font-size: 1.2rem;
  gap: 8px;
  padding-inline: 1rem;
  transition: 0.25s;
}

.button:hover {
  background-color: var(--primary-color);
}

.input:focus,
.button:focus {
  outline: none;
}

.input:disabled,
.button:disabled {
  border-color: var(--dimmed-color);
  background-color: var(--background-color-2);
  color: var(--dimmed-color);
  cursor: not-allowed;
}

.form:hover .input:not(:disabled),
.form:hover .button:not(:disabled) {
  border-color: var(--primary-color-transparent);
}

.form .input:focus:not(:disabled),
.form:has(.input:focus) .button {
  border-color: var(--primary-color);
}
</style>
