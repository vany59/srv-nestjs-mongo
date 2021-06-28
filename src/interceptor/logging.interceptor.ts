import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now: number = Date.now();
    const method = context['args'][0].method;
    const path = context['args'][0].originalUrl;

    return next.handle().pipe(
      tap({
        next: () => {
          this.showLogAction(method, path, now);
        },
        error: (er) => {
          this.showLogError(er.message);
        },
      }),
    );
  }

  /**
   * show log action type, function name, time exe and date time.
   */
  public showLogAction(actionType: string, path: string, now: number) {
    console.log(
      '🚀',
      `\x1b[32m[${actionType}]\x1b[0m`,
      '»',
      path,
      `\x1b[33m[+${Date.now() - now}ms]\x1b[0m`,
      new Date().toLocaleString(),
      '👌',
    );
    return;
  }

  /**
   * show log time finish action
   */
  public showTimeFinishAction(actionType: string, now: number) {
    console.log(
      '💻',
      `\x1b[32m[Interceptor: ${actionType} finished in ${
        +new Date() - now
      }ms]\x1b[0m`,
      '😁',
    );
    return;
  }

  /**
   * show log error
   */
  public showLogError(error: any) {
    console.error(
      '❌',
      `\x1b[31m[Interceptor: ${(error + '').replace(
        /(Error: |Authentication|UserInputError: )+/g,
        '',
      )}]\x1b[0m`,
      '😢',
    );
    return;
  }
}
