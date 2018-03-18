export class GridPageResul<T> {
  public data: T[];
  public pageNumber: number;
  public active: boolean;

  constructor() {
    this.data = [];
  }
}
