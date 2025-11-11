import { ref, type Ref } from "vue";

import type { Notification, NotificationType } from "../types";

let idCounter = 0;

const notifications = ref<Notification[]>([]);

interface ReturnValue {
  notifications: Ref<Notification[]>;
  addNotification: (message: string, type: NotificationType) => void;
  removeNotification: (id: number) => void;
}

export const useNotifications = (): ReturnValue => {
  const addNotification = (message: string, type: NotificationType) => {
    const id = idCounter++;

    notifications.value.push({ id, message, type });

    setTimeout(() => {
      removeNotification(id);
    }, 3000);
  };

  const removeNotification = (id: number) => {
    notifications.value = notifications.value.filter(
      (notification) => notification.id !== id,
    );
  };

  return {
    notifications,
    addNotification,
    removeNotification,
  };
};
