import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { Auth, UserId } from '@decorator';
import { UserCreate } from './user.dto';
import { IdDto } from '@utils/dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() body: UserCreate) {
    this.userService.create(body)
    return {
      id: '123'
    }
  }

  @Get('me')
  @Auth()
  async me(@UserId() userId: string, @Res() res: Response) {}
}
