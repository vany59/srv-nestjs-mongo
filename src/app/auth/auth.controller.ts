import { Register } from '@app/user/user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { AuthEntity, GetToken } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/token')
  async token(@Body() body: GetToken) {
    await this.authService.getToken(body);
  }

  @Post('/register')
  async register(@Body() body: Register) {}
}
