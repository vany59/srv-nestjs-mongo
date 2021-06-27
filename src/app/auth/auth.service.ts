import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { ConfigurationService } from '@config/config.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly configSrv: ConfigurationService) {}

  async verifyToken(token: string): Promise<AuthDto> {
    return;
  }
}
