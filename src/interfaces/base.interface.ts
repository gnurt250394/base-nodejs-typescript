export interface BaseResponse<T> {
  data: T;
  total?: number; // this will give count of all the documents before .skip() and limit()
  currentPage?: number;
}
export interface BaseParams {
  page?: number;
  size?: number;
}
