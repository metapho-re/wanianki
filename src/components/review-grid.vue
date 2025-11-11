<template>
  <div class="grid"><slot></slot></div>
</template>

<style scoped>
.grid {
  display: grid;
  width: 100%;
  height: 100%;
  gap: 20px;
  grid-template: "header header" 1fr "subject details" 14fr "navigation navigation" 1fr / 1fr 3fr;
}
</style>
