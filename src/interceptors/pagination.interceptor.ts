import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationUtil } from '../utils/pagination.util';

@Injectable()
export class PaginationInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const request = context.switchToHttp().getRequest();
        const page = parseInt(request.query.page, 10) || 1;
        const limit = parseInt(request.query.limit, 10) || 10;

        const paginatedData = PaginationUtil.paginate(data, page, limit);

        return {
          data: paginatedData,
          page,
          limit,
          totalItems: data.length,
        };
      }),
    );
  }
}
