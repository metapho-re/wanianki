<template>
  <div class="subject-details">
    <slot></slot>
  </div>
</template>

<style scoped>
.subject-details {
  padding: 20px;
  border: 1px solid var(--background-color-3);
  border-radius: var(--radius-md);
  background: linear-gradient(
    180deg,
    var(--background-color-1) 0%,
    var(--background-color-transparent) 100%
  );
  box-shadow: var(--shadow-md);
  grid-area: details;
  overflow-y: auto;
}

@media (width <= 768px) {
  .subject-details {
    padding: 16px;
  }
}

@media (width <= 480px) {
  .subject-details {
    padding: 12px;
  }
}
</style>
