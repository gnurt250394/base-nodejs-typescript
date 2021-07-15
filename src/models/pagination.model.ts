export interface IPaginationModel {
  /** tsoa doesn't like generics */
  totalElement: number;
  page: number;
  limit: number;
  totalPages: number;
  data: any[];
}

export class PaginationModel implements IPaginationModel {
  public totalElement: number;
  public page: number;
  public limit: number;
  public totalPages: number;
  public data: any[];

  constructor(args: IPaginationModel) {
    Object.assign(this, args);
  }
}
