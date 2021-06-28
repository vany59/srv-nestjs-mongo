import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { ConfigurationService } from '@config/config.service';
import { AuthDto, Token, UToken } from './auth.dto';

@Injectable()
export class AuthService {

  constructor(private readonly configSrv: ConfigurationService) { }
  config = this.configSrv.getSecurityConfig()

  async verifyToken(token: string): Promise<Token> {
    return new Promise((resolve, reject) => {
      verify(token, this.config.tokenSecret, (err, decoded) => {
        if (err) {
          reject(err)
        } else {
          resolve(decoded)
        }
      })
    })
  }

  createToken(data: Token): UToken{
    return {
      accessToken: sign({
        exp: this.config.accessExp,
        data
      }, this.config.tokenSecret),
      refreshToken: sign({
        exp: this.config.refreshExp,
        data
      }, this.config.tokenSecret)
    }
  }

  async hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      hash(password, this.config.passwordSalt, (err, hashString) => {
        if (err) {
          reject(err)
        } else {
          resolve(hashString)
        }
      })
    })
  }

  async comparePassword(password: string, hashPassword: string): Promise<boolean>{
    return new Promise((resolve, reject) =>{
      compare(password, hashPassword, (err, result)=>{
        if(err){
          reject(err)
        }else{
          resolve(result)
        }
      })
    })
  }
}
