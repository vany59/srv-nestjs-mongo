import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth, UserId } from '@decorator';
import { UserCreate } from './user.dto';
import { IdDto } from '@utils/dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async createUser(@Body() body: UserCreate) {
    return await this.userService.create(body)
  }

  @Get('me')
  // @Auth()
  async me(@UserId() userId: string) {
    return '123'
  }
}
