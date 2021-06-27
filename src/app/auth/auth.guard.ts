import { Injectable, CanActivate, ExecutionContext, Logger, Inject } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserService } from '../user/user.service'
// import { UnauthorizedError } from './auth.error'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,

    @Inject('AuthService') private readonly authService: AuthService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredAuth = this.reflector.get<string[]>(
      'auth',
      context.getHandler()
    )
    const logger = new Logger('Guard')
    if (!requiredAuth) {
      return true
    }
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers
    if (!authorization) return false
    const token = authorization.split(" ")[1]
    try {
      const data = await this.authService.verifyToken(token)
      // logger.debug(data)
      request.userId = data.userId
      return true
    } catch (e) {
      return false
    }
  }
}
