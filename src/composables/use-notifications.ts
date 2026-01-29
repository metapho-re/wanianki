import { ref, type Ref } from "vue";

import type { Notification, NotificationType } from "../types";

const notifications = ref<Notification[]>([]);

const removeNotification = (id: string) => {
  notifications.value = notifications.value.filter(
    (notification) => notification.id !== id,
  );
};

const addNotification = (message: string, type: NotificationType) => {
  const id = crypto.randomUUID();

  notifications.value.push({ id, message, type });

  setTimeout(() => {
    removeNotification(id);
  }, 3000);
};

interface ReturnValue {
  notifications: Ref<Notification[]>;
  addNotification: (message: string, type: NotificationType) => void;
  removeNotification: (id: string) => void;
}

export const useNotifications = (): ReturnValue => ({
  notifications,
  addNotification,
  removeNotification,
});
