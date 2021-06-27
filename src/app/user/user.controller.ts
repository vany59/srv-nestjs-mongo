import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { Auth, UserId } from '@decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() body: any, @Res() res: Response) {}

  @Post('create')
  createUser(@Body() body: any, @Res() res: Response) {}

  @Get('me')
  @Auth()
  async me(@UserId() userId: string, @Res() res: Response) {}
}
