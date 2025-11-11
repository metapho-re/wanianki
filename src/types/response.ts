export type Pagination = {
  next_url: string | null;
};

export interface CollectionResponse<T> {
  object: "collection";
  pages: Pagination;
  data: T[];
}

export interface ReportResponse<T> {
  object: "report";
  data: T;
}

export type Response<T> = T extends unknown[]
  ? CollectionResponse<T>
  : ReportResponse<T>;
