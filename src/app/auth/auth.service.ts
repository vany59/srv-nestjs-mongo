import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ConfigurationService } from '@config/config.service';
import { UserService } from '@app/user/user.service';
import { uuid } from '@utils/uuid';
import { Register } from '@app/user/user.dto';
import { RedisCacheService } from '@cache/redisCache.service';
import { filter } from '@utils/shared';
import { GTE } from '@utils/enum';

import { Auth, AuthDocument, CreateToken, GetToken } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configSrv: ConfigurationService,

    private readonly userService: UserService,

    @InjectModel(Auth.name)
    private readonly authModel: Model<AuthDocument>,

    private readonly cacheService: RedisCacheService,
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

  async checkAccessToken(accessToken: string) {
    const body = filter({
      filters: [
        { key: 'accessToken', value: accessToken },
        { key: 'accessTokenExpiresAt', value: new Date(), operator: GTE },
      ],
    });
    const auth = await this.authModel.findOne(body.query);
    if (!auth) return null;
    return {
      userId: auth.userId,
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken,
      accessTokenExpiresAt: auth.accessTokenExpiresAt,
      refreshTokenExpiresAt: auth.refreshTokenExpiresAt,
      _id: auth._id,
      authType: 'Bearer',
    };
  }

  async getToken(body: GetToken) {
    const { username, password } = body;
    const user = await this.userService.findOne({
      username,
    });

    if (!user || !this.comparePassword(password, user.password))
      return {
        code: 401,
        messgage: 'user.loginFail',
      };
    const auth = await this.genToken({ userId: user._id });
    const res = { ...auth, authType: this.config.authType };

    this.cacheService.set(`user${auth.accessToken}`, res);

    return res;
  }

  async genToken(body: CreateToken) {
    const auth = await this.authModel.findOne({ userId: body.userId });
    const newData = {
      userId: body.userId,
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken(),
      accessTokenExpiresAt: new Date(Date.now() + this.config.accessExp),
      refreshTokenExpiresAt: new Date(Date.now() + this.config.refreshExp),
    };

    if (auth) {
      this.cacheService.del(`user${auth.accessToken}`);
      await this.authModel.updateOne({ _id: auth._id }, newData);
      return { ...newData, _id: auth._id };
    } else {
      const newToken = new this.authModel({ ...body, ...newData });
      await newToken.save();
      return { _id: newToken._id, ...newData };
    }
  }

  async register(body: Register) {
    body.password = this.hassPassword(body.password);
    const user = await this.userService.save(body);
    const {
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    } = await this.genToken({ userId: user._id });

    const res = {
      userId: user._id,
      accessToken,
      accessTokenExpiresAt,
      refreshToken,
      refreshTokenExpiresAt,
      authType: this.config.authType,
    };

    this.cacheService.set(`user${accessToken}`, res);

    return res;
  }
}
