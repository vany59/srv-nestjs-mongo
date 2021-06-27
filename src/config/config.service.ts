import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EnvironmentKeys } from './environment.interface'


@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService<EnvironmentKeys>) { }

  public getAppListeningPort() {
    return this.configService.get('PORT')
  }

  public getMySQLConfig(){
    return {
      host: this.configService.get('MYSQL_HOST'),
      port: this.configService.get('MYSQL_PORT'),
      username: this.configService.get('MYSQL_USER'),
      password: this.configService.get('MYSQL_PASSWORD'),
      database: this.configService.get('MYSQL_DATABASE')
    }
  }

  public getUploadDest(){
    return this.configService.get('UPLOAD_DEST')
  }


  /**
   * @description This function return defined password salt
   * used when hash password
   * @returns number
   */
  public getPasswordHashSalt() {
    return this.configService.get<number>('PASSWORD_HASH_SALT')
  }

  public getTokenEncryptSecret() {
    return this.configService.get<string>('TOKEN_ENCRYPT_SECRET')
  }
}
