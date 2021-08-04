import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import langTransformer from 'src/language';
import { AuthService } from './auth.service';

const authError = (code: number, lang: string) => {
  return new HttpException(
    {
      code: code,
      message: langTransformer({
        query: `code.${code}`,
        lang,
      }),
      data: null,
    },
    HttpStatus.OK,
  );
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,

    @Inject('AuthService') private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredAuth = this.reflector.get<string[]>(
      'auth',
      context.getHandler(),
    );

    const logger = new Logger('Guard');

    if (!requiredAuth) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const lang = request.headers['accept-language'];
    const { authorization } = request.headers;
    if (!(authorization && authorization.startsWith('Bearer ')))
      throw authError(HttpStatus.UNAUTHORIZED, lang);

    const token = authorization.replace('Bearer ', '');
    if (!token) throw authError(HttpStatus.UNAUTHORIZED, lang);

    try {
      return true;
    } catch (e) {
      throw authError(HttpStatus.BAD_REQUEST, lang);
    }
  }
}
