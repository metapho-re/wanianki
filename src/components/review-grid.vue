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
</style>
