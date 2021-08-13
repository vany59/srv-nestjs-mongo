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
      scope: this.configService.get('SCOPE'),
      apiLocal: `http://localhost:${this.configService.get('PORT')}`,
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

  public getUploadConfig() {
    return {
      uploadBucketName: this.configService.get('UPLOAD_BUCKET_NAME'),
      maxImageSize: this.configService.get('MAX_IMAGE_SIZE'),
      maxVideoSize: this.configService.get('MAX_VIDEO_SIZE'),
    };
  }

  public getSecurityConfig() {
    return {
      accessExp: this.configService.get<number>('ACCESS_EXP') * 1000,
      refreshExp: this.configService.get<number>('REFRESH_EXP') * 1000,
      passwordSalt: this.configService.get('PASSWORD_HASH_SALT'),
      tokenSecret: this.configService.get('TOKEN_ENCRYPT_SECRET'),
      authType: this.configService.get('AUTH_TYPE'),
    };
  }

  public getPasswordHashSalt() {
    return this.configService.get<number>('PASSWORD_HASH_SALT');
  }

  public getTokenEncryptSecret() {
    return this.configService.get<string>('TOKEN_ENCRYPT_SECRET');
  }

  public getSeeding() {
    return {
      rootUser: this.configService.get<string>('ROOT_USER'),
      rootPassword: this.configService.get<string>('ROOT_PASSWORD'),
    };
  }
}
