import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ConfigurationService } from '@config/config.service';
import { UserService } from '@app/user/user.service';
import { uuid } from '@utils/uuid';
import { Register } from '@app/user/user.dto';
import { RedisCacheService } from '@cache/redisCache.service';
import { compare, filter, hash } from '@utils/shared';
import { GTE } from '@utils/enum';

import {
  Auth,
  AuthDocument,
  AuthToken,
  CreateToken,
  GetToken,
} from './auth.dto';

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

  async hassPassword(password: string) {
    return await hash(password, this.config.tokenSecret);
  }

  async comparePassword(password: string, hashPassword: string) {
    return await compare(password, hashPassword, this.config.tokenSecret);
  }

  getAccessToken() {
    return uuid();
  }

  getRefreshToken() {
    return uuid();
  }

  async checkAccessToken(accessToken: string): Promise<AuthToken> {
    const body = filter({
      filters: [
        { key: 'accessToken', value: accessToken },
        { key: 'accessTokenExpiresAt', value: new Date(), operator: GTE },
      ],
    });
    const auth = await this.authModel.findOne(body.query);
    if (!auth) return null;

    const user = await this.userService.findOne({ _id: auth.userId });
    if (!user) return null;

    this.authModel.updateOne(
      { _id: auth._id },
      {
        $set: {
          accessTokenExpiresAt: new Date(Date.now() + this.config.accessExp),
          refreshTokenExpiresAt: new Date(Date.now() + this.config.refreshExp),
        },
      },
    );

    return {
      userId: user._id,
      isRoot: user.isRoot,
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken,
      accessTokenExpiresAt: auth.accessTokenExpiresAt,
      refreshTokenExpiresAt: auth.refreshTokenExpiresAt,
      authType: auth.authType,
    };
  }

  async getToken(body: GetToken): Promise<AuthToken> {
    const { username, password } = body;
    const user = await this.userService.findOne({
      username,
    });

    if (!user || !(await this.comparePassword(password, user.password)))
      throw {
        code: 401,
        message: 'user.loginFail',
      };
    const auth = await this.genToken({ userId: user._id });

    const res = { ...auth, isRoot: user.isRoot };

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
      authType: this.config.authType,
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

  async register(body: Register): Promise<AuthToken> {
    body.password = await this.hassPassword(body.password);
    const user = await this.userService.save(body);
    const {
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    } = await this.genToken({ userId: user._id });

    const res: AuthToken = {
      userId: user._id,
      isRoot: user.isRoot,
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
