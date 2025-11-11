export interface Subscription {
  active: boolean;
  max_level_granted: number;
  period_ends_at: string | null;
  type: "free" | "recurring" | "lifetime";
}
