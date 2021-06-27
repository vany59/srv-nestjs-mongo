import { Global, Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';
import { EnvironmentKeys } from './environment.interface';
import { ConfigurationService } from './config.service';

const ConfigModule = NestConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
  load: [
    (): EnvironmentKeys => {
      if (
        process.env.PASSOWRD_HASH_SALT &&
        isNaN(parseInt(process.env.PASSWORD_HASH_SALT))
      ) {
        console.error(
          'PASSWORD_HASH_SALT must be a number or leave it as default',
        );
        process.exit(1);
      }
      return {
        //app
        PORT: parseInt(process.env.PORT) || 8080,
        PREFIX: process.env.PREFIX || 'api',
        HOST: process.env.HOST || 'http://localhost',
        NAME: process.env.NAME || 'CODEBASE',

        //security
        PASSWORD_HASH_SALT: parseInt(process.env.PASSWORD_HASH_SALT) || 11,
        TOKEN_ENCRYPT_SECRET: process.env.TOKEN_ENCRYPT_SECRET || 's3cr3t!@#',

        //database
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_USER: process.env.DB_USER || 'root',
        DB_PASSWORD: process.env.DB_PASSWORD || '123456',
        DB_PORT: parseInt(process.env.DB_PORT) || 27017,
        DB_DATABASE: process.env.DB_DATABASE || 'pjcore',

        //upload
        UPLOAD_DEST: process.env.UPLOAD_DEST || 'uploads',
      };
    },
  ],
});

@Global()
@Module({
  imports: [ConfigModule],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export default class ConfigurationModule {}
