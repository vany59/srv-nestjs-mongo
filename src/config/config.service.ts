import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentKeys } from './environment.interface';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService<EnvironmentKeys>) {}

  public getAppConfig() {
    return {
      port: this.configService.get('PORT'),
      host: this.configService.get('HOST'),
      name: this.configService.get('NAME'),
      prefix: this.configService.get('PREFIX'),
    };
  }

  public getAppListeningPort() {
    return this.configService.get('PORT');
  }
  public getAppPrefix() {
    return this.configService.get('PREFIX');
  }

  public getDBConfig() {
    return {
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
    };
  }

  public getUploadDest() {
    return this.configService.get('UPLOAD_DEST');
  }

  /**
   * @description This function return defined password salt
   * used when hash password
   * @returns number
   */
  public getPasswordHashSalt() {
    return this.configService.get<number>('PASSWORD_HASH_SALT');
  }

  public getTokenEncryptSecret() {
    return this.configService.get<string>('TOKEN_ENCRYPT_SECRET');
  }
}
