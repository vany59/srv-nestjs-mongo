import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common'

export const Auth = () => SetMetadata('auth', true)

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.userId;
  },
);
