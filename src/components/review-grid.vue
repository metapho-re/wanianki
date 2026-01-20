<template>
  <div class="grid"><slot></slot></div>
</template>

<style scoped>
.grid {
  display: grid;
  width: 100%;
  height: 100%;
  gap: 16px;
  grid-template: "header header" auto "subject details" 1fr "navigation navigation" auto / 1fr 3fr;
}

@media (width <= 768px) {
  .grid {
    padding: 12px;
    gap: 12px;
    grid-template:
      "header" auto
      "subject" auto
      "details" 1fr
      "navigation" auto / 1fr;
  }
}

@media (width <= 480px) {
  .grid {
    padding: 8px;
    gap: 8px;
  }
}
</style>
