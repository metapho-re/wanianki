<script setup lang="ts">
import { useNotifications } from "../composables";

import NotificationItem from "./notification-item.vue";

const { notifications } = useNotifications();
</script>

<template>
  <div class="notification-container">
    <NotificationItem
      v-for="notification in notifications"
      :key="notification.id"
      :message="notification.message"
      :type="notification.type"
    />
  </div>
</template>

<style scoped>
.notification-container {
  position: fixed;
  z-index: 9999;
  top: 20px;
  right: 20px;
  width: 400px;
}

@media (width <= 480px) {
  .notification-container {
    right: 12px;
    left: 12px;
    width: auto;
  }
}
</style>
