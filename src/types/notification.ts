export type NotificationType = "success" | "error";

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}
