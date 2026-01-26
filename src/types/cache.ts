import type { ReportOrCollection } from "./utils";

export interface CachedData<T, U> {
  data: ReportOrCollection<T, U>;
  cachedAt: number;
}
