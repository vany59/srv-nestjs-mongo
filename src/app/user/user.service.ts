import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from './user.entity'
import { Login, User } from './user.interface'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) { }

  async login(input: Login): Promise<any> {
    const user = await this.userRepository.findOne({ username: input.username })
    if (!user) throw new Error('fail')
    const isCorrectPass = await this.authService.compareWithHashPwd(input.password, user.password)
    if (!isCorrectPass) throw new Error('fail')
    return {
      token: await this.authService.signUserToken(user.id),
      userId: user.id
    }
  }

  async create(user: User): Promise<any> {
    const isExistedUser = await this.userRepository.findOne({ username: user.username })
    if (isExistedUser) throw new Error('ExistedUser')
    const newUser = new UserEntity({ ...user, password: await this.authService.hashPassword(user.password) })
    const createdUser = await this.userRepository.save(newUser)
    return {
      token: await this.authService.signUserToken(createdUser.id),
      userId: createdUser.id
    }
  }

  async me(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ id: userId })
    if (!user) throw new Error('Not found user')
    delete user.password
    delete user.isActive
    return user
  }
}
