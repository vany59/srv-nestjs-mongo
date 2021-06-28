import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MongoRepository } from 'typeorm';

import { IdDto } from '@utils/dto';
import { AuthService } from '@app/auth/auth.service';

import {
  LoginRes,
  RefreshTokenInput,
  UserCreate,
  UserEntity,
} from './user.dto';
import { UserInput, UserLogin } from './user.dto';
import { TokenRes } from '@app/auth/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: MongoRepository<UserEntity>,

    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  async create(user: UserCreate): Promise<TokenRes> {
    const { username, password } = user;
    const hashPassword = await this.authService.hashPassword(password);
    const checkUser = await this.userRepository.findOne({ username });
    if (checkUser) throw new Error('User existed');
    const newUser = await this.userRepository.save(
      new UserEntity({ ...user, password: hashPassword }),
    );
    const token = this.authService.createToken({
      _id: newUser._id,
      username: newUser.username,
    });
    await this.userRepository.update({ _id: newUser._id }, token);
    return {
      ...token,
      userId: newUser._id,
    };
  }

  async login(loginInput: UserLogin): Promise<LoginRes> {
    const user = await this.userRepository.findOne({
      username: loginInput.username,
    });
    if (!user) throw new Error('login fail');
    const isCorrectPasswrod = this.authService.comparePassword(
      loginInput.password,
      user.password,
    );
    if (!isCorrectPasswrod) throw new Error('login fail');
    const token = this.authService.createToken({
      _id: user._id,
      username: user.username,
    });
    await this.userRepository.update({ _id: user._id }, token);
    return {
      _id: user._id,
      username: user.username,
      ...token,
    };
  }

  async refreshToken(input: RefreshTokenInput): Promise<LoginRes> {
    const { refreshToken } = input;

    const user = await this.userRepository.findOne({ refreshToken });
    if (!user) throw new Error('refreshtoken error');
    try {
      await this.authService.verifyToken(user.refreshToken);
      const token = this.authService.createToken({
        _id: user._id,
        username: user.username,
      });
      await this.userRepository.update({ _id: user._id }, token);
      return {
        _id: user._id,
        username: user.username,
        ...token,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async me(userId: IdDto): Promise<any> {}
}
