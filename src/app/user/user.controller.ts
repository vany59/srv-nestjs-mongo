import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth, UserId } from '@decorator';
import { LoginRes, RefreshTokenInput, UserCreate, UserLogin } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() body: UserCreate) {
    return await this.userService.create(body);
  }

  @Post('auth/token')
  async userAuth(@Body() body: UserLogin) {
    return await this.userService.login(body);
  }

  @Post('auth/refresh')
  async refreshToken(@Body() body: RefreshTokenInput) {
    return await this.userService.refreshToken(body);
  }

  @Get('me')
  @Auth()
  async me(@UserId() userId: string) {
    return '123';
  }
}
