import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { ConfigurationService } from '@config/config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '@app/user/user.service';
import { AuthEntity, GetToken } from './auth.dto';
import { uuid } from '@utils/uuid';
import { Register } from '@app/user/user.dto';

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

  getAccessToken() {
    return uuid();
  }
  getRefreshToken() {
    return uuid();
  }

  async getToken(body: GetToken) {
    const { username, password } = body;
    const user = await this.userService.findOne({
      username,
    });
    if (!user || !this.comparePassword(password, user.password))
      return {
        code: 401,
      };
    const auth = await this.authRepo.findOne({ userId: user._id });
    return {};
  }

  async register(body: Register) {
    body.password = this.hassPassword(body.password);
    return await this.userService.save(body);
  }
}
