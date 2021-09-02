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

    const formatData = (value, type): ResSchema => {
      if (
        value.hasOwnProperty('code') ||
        value.hasOwnProperty('statusCode') ||
        value.hasOwnProperty('status')
      ) {
        const code =
          value.code ||
          value.statusCode ||
          value.status ||
          (type === 'return' ? 200 : 500);
        return {
          code,
          message: value.messgage
            ? langTransformer({ query: value.message, lang })
            : langTransformer({ query: `code.${code}`, lang }),
          data: value.data || null,
        };
      }

      const code = type === 'return' ? 200 : 500;
      return {
        code,
        message: langTransformer({ query: `code.${code}`, lang }),
        data: value,
      };
    };

    return next.handle().pipe(
      map((res) => {
        return formatData(res, 'return');
      }),
      catchError((error) => {
        return of(formatData(error, 'throw'));
      }),
    );
  }
}
