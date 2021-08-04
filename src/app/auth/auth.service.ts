import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import { ConfigurationService } from '@config/config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '@app/user/user.service';

import { AuthEntity, GetToken } from './auth.dto';
import { UserEntity } from '@app/user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configSrv: ConfigurationService,

    private readonly userService: UserService,

    @InjectRepository(AuthEntity)
    private readonly authRepo: MongoRepository<AuthEntity>,
  ) {}
  config = this.configSrv.getSecurityConfig();

  hassPassword(password: string) {
    return bcrypt.hashSync(password, this.config.passwordSalt);
  }

  comparePassword(password: string, hashPassword: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  async getToken(body: GetToken) {
    const { username, password } = body;
    const user = await this.userService.findOne({
      username,
    });
    if (!user)
      return {
        code: 401,
      };
    return {};
  }
}
