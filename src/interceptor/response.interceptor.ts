import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const res = http.getResponse();
    res.status(200);

    const response = {
      code: 200,
      message: 'success',
      data: null,
    };

    return next.handle().pipe(
      map((res) => {
        try {
          if (res.message) response.message = res.message;
          if (!res.data) response.data = res.data;
          if((typeof res) !== "object" || !res.message) response.data = res
          return response;
        } catch (_) {
          response.data = res;
          return response;
        }
      }),
      catchError((error) => {
        try {
          return of({
            ...response,
            code: error.code || 500,
            message: error.message || error || 'Error',
          });
        } catch (_) {
          return of({
            ...response,
            message: 'Error',
          });
        }
      }),
    );
  }
}
