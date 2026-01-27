export type NotificationType = "success" | "error" | "warning";

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}
