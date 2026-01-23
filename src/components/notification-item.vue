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
  border-radius: var(--radius-md);
  margin-bottom: 10px;
  animation: slide-in 0.3s ease;
  box-shadow: var(--shadow-lg);
  font-size: 0.9rem;
  font-weight: 400;
}

.notification-item.success {
  background-color: var(--success-color);
  color: var(--on-success-color);
}

.notification-item.error {
  background-color: var(--error-color);
  color: var(--on-error-color);
}

.notification-item.warning {
  background-color: var(--warning-color);
  color: var(--on-warning-color);
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
