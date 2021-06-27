import { Injectable } from '@nestjs/common';
import { UserService } from '@app/user/user.service';

@Injectable()
export class SeederService {
  constructor(private readonly userService: UserService) {}

  async seed() {
    // return await this.userService.createRoot({
    //   username: 'root',
    //   password: '123456',
    //   name: 'root',
    // });
  }
}
