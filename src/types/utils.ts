export type ReportOrCollection<T, U> = U extends "collection" ? T[] : T;
