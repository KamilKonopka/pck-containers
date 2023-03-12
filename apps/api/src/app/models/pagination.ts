import { Meta } from '../interfaces';

export class Pagination {
  page = 0;
  pageSize = 10;

  constructor({ page, pageSize }) {
    this.page = Number(page?.toString()) || 0;
    this.pageSize = Number(pageSize?.toString()) || 10;
  }

  getStart(): number {
    return this.page * this.pageSize;
  }

  getEnd(): number {
    return this.getStart() + this.pageSize;
  }

  getPaginatedData<T>(data: T[]): {
    data: T[];
    meta: Meta;
  } {
    return {
      data: data.slice(this.getStart(), this.getEnd()),
      meta: {
        page: this.page,
        pageSize: this.pageSize,
        total: data.length,
      },
    };
  }
}
