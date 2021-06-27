import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IdDto } from '@utils/dto';
import { AuthService } from '@app/auth/auth.service';

import { UserCreate, UserEntity } from './user.dto';
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

  async create(user: UserCreate): Promise<IdDto> {
    const {username, password} = user
    const hashPassword = await this.authService.hashPassword(password)
    const checkUser = await this.userRepository.findOne({username})
    if(checkUser) throw new Error('User existed')
      const newUser = await this.userRepository.save(new UserEntity({...user, password: hashPassword}))
    console.log(newUser)
    return {
      id: newUser._id,
    };
  }

  async me(userId: IdDto): Promise<any> {}
}
