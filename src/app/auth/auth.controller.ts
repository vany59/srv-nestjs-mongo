import { Body, Controller, Post } from '@nestjs/common';
import { GetToken } from './auth.dto';

@Controller('auth')
export class AuthController {
  @Post('token')
  async token(@Body() body: GetToken): Promise<any> {
    console.log(body);
    return '';
  }
}
