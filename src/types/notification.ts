export type NotificationType = "success" | "error" | "warning";

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}
