import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  Inject,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RedisCacheService } from '@cache/redisCache.service';
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

    @Inject('AuthService')
    private readonly authService: AuthService,

    private readonly cacheService: RedisCacheService,
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
      throw authError(401, lang);

    const token = authorization.replace('Bearer ', '');
    if (!token) throw authError(HttpStatus.UNAUTHORIZED, lang);

    //find token in cache
    const userCache = await this.cacheService.get(`user${token}`);
    if (userCache) {
      request.user = userCache;
      return true;
    }

    //find token in database
    const checkToken = await this.authService.checkAccessToken(token);
    if (checkToken) {
      await this.cacheService.set(`user${token}`, checkToken);
      return true;
    }
    throw authError(HttpStatus.UNAUTHORIZED, lang);
  }
}
