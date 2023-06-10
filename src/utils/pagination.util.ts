export class PaginationUtil {
  static paginate<T>(data: T[], page: number, limit: number): T[] {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return data.slice(startIndex, endIndex);
  }
}
