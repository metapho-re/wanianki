<template>
  <div class="subject-details">
    <slot></slot>
  </div>
</template>

<style scoped>
.subject-details {
  padding: 20px;
  border: 1px solid var(--background-color-3);
  border-radius: 8px;
  background-color: var(--background-color-1);
  grid-area: details;
  overflow-y: auto;
}
</style>
