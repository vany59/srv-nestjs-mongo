import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { ConfigurationService } from '@config/config.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  
  constructor(private readonly configSrv: ConfigurationService) { }
  config = this.configSrv.getSecurityConfig()

  async verifyToken(token: string): Promise<AuthDto> {
    return;
  }

  async hashPassword(password: string):Promise<string> {
    return new Promise((resolve, reject) => {
      hash(password, this.config.passwordSalt, (err, hashString) => {
        if(err){
          reject(err)
        }else {
          resolve(hashString)
        }
      })
    })
  }

  async createToken(data: any){

  }
}
