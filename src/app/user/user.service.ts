import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MongoRepository } from 'typeorm';

import { IdDto } from '@utils/dto';
import { AuthService } from '@app/auth/auth.service';

import { UserCreate, UserEntity } from './user.dto';
import { UserInput, UserLogin } from './user.dto';
import { TokenRes} from '@app/auth/auth.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: MongoRepository<UserEntity>,
    private readonly authService: AuthService,
  ) {}

  async create(user: UserCreate): Promise<TokenRes> {
    const {username, password} = user
    const hashPassword = await this.authService.hashPassword(password)
    const checkUser = await this.userRepository.findOne({username})
    if(checkUser) throw new Error('User existed')
    const newUser = await this.userRepository.save(new UserEntity({...user, password: hashPassword}))
    const token = this.authService.createToken({_id: newUser._id, username: newUser.username})
    await this.userRepository.update({_id: newUser._id}, token)
    return {
      ...token,
      userId: newUser._id
    }
  }

  async me(userId: IdDto): Promise<any> {}
}
