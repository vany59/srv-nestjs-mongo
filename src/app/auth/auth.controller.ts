import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { AuthEntity, GetToken, Token } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepo: MongoRepository<AuthEntity>,
  ) {}

  @Post('oauth2/token')
  async token(@Body() body: GetToken) {
    return {
      token: '',
    };
  }

  @Post('register')
  async register() {
    return {
      register: '',
    };
  }
}
