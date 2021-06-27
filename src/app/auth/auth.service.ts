import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken'
import { compare, hash } from 'bcrypt'
import { ConfigurationService } from 'src/config/config.service';
import { JWTTokenPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configSrv: ConfigurationService
  ){}

  async verifyToken(token: string): Promise<JWTTokenPayload> {
    const begin = +new Date()
    return new Promise((resolve, reject) => {
      verify(
        token,
        this.configSrv.getTokenEncryptSecret(),
        {},
        (err, payload: JWTTokenPayload) => {
          if (err) return reject(err)
          resolve(payload)
        }
      )
    })
  }

  public hashPassword(rawPassword: string): Promise<string> {
    return hash(rawPassword, this.configSrv.getPasswordHashSalt())
  }

  public async compareWithHashPwd(rawPwd: string, hashedPwd: string) {
    return compare(rawPwd, hashedPwd)
  }

  public async signUserToken(userId: string): Promise<string> {
    return sign({ userId }, this.configSrv.getTokenEncryptSecret(), {
      // expiresIn: '7d'
    })
  }
}
