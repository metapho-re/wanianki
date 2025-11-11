import type { Subscription } from "./subscription";

export interface User {
  level: number;
  subscription: Subscription;
  username: string;
}
