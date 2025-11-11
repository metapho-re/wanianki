import type { ReportOrCollection } from "./utils";

export type Store<T, U, Nullable extends boolean = false> = {
  value: Nullable extends true
    ? ReportOrCollection<T, U> | null
    : ReportOrCollection<T, U>;
};
