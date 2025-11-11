import type { Subscription } from "../types";

export const isSubscriptionValid = (subscription: Subscription): boolean =>
  subscription.active &&
  subscription.max_level_granted === 60 &&
  (subscription.type === "lifetime" ||
    (subscription.type === "recurring" &&
      new Date(subscription.period_ends_at as string) > new Date()));
