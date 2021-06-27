import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IdDto } from '@utils/dto';
import { AuthService } from '@app/auth/auth.service';

import { UserEntity } from './user.dto';
import { UserInput, UserLogin } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) {}

  async createRoot(user: UserInput): Promise<any> {}

  async login(input: UserLogin): Promise<any> {}

  async create(user: UserInput): Promise<IdDto> {
    return {
      id: 'id',
    };
  }

  async me(userId: IdDto): Promise<any> {}
}
