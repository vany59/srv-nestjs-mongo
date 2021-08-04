import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import langTransformer from 'src/language';

class ResSchema {
  code: number;
  message: string;
  data: any;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const res = http.getResponse();
    res.status(200);
    const lang = http.getRequest().headers['accept-language'];

    const response: ResSchema = {
      code: 200,
      message: null,
      data: null,
    };

    return next.handle().pipe(
      map((res) => {
        try {
          const code = res.code || res.statusCode || 200;
          response.code = code;
          if (res.message) {
            response.message = langTransformer({ query: res.message, lang });
          } else {
            response.message = langTransformer({ query: `code.${code}`, lang });
          }

          if (typeof res !== 'object') {
            response.data = res;
          } else {
            if (res.data) {
              response.data = res.data;
            } else {
              response.data = res;
            }
          }

          return response;
        } catch (_) {
          response.data = res;
          response.code = 200;
          response.message = langTransformer({ query: `code.200`, lang });
          return response;
        }
      }),
      catchError((error) => {
        try {
          const code = error.code || error.status || 500;
          let message = '';
          if (error.message) {
            message =
              langTransformer({ query: error.message, lang }) || error.message;
          } else if (error) {
            message = langTransformer({ query: error, lang });
          } else {
            message = langTransformer({ query: `code.${code}`, lang });
          }
          return of({
            code,
            message,
            data: null,
          });
        } catch (_) {
          return of({
            code: 500,
            message: langTransformer({ query: `code.500`, lang }),
            data: null,
          });
        }
      }),
    );
  }
}
