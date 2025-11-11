<script setup lang="ts">
defineProps<{
  message: string;
  type: string;
}>();
</script>

<template>
  <div :class="`notification-item ${type}`">
    {{ message }}
  </div>
</template>

<style scoped>
.notification-item {
  padding: 12px 20px;
  border-radius: 6px;
  margin-bottom: 10px;
  animation: fade-in 0.3s ease;
  box-shadow: 0 2px 8px var(--background-color-1);
  font-weight: bold;
}

.notification-item.success {
  background-color: var(--success-color);
  color: var(--foreground-color);
}

.notification-item.error {
  background-color: var(--error-color);
  color: var(--foreground-color);
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
