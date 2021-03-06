import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { EnvironmentKeys } from './environment.interface';
import { ConfigurationService } from './config.service';

const ConfigModule = NestConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
  load: [
    (): EnvironmentKeys => {
      //validate
      if (
        process.env.PASSOWRD_HASH_SALT &&
        isNaN(parseInt(process.env.PASSWORD_HASH_SALT))
      ) {
        console.error(
          'PASSWORD_HASH_SALT must be a number or leave it as default',
        );
        process.exit(1);
      }

      if (process.env.PORT && isNaN(parseInt(process.env.PORT))) {
        console.error('PORT must be a number or leave it as default');
        process.exit(1);
      }

      return {
        //app
        PORT: parseInt(process.env.PORT) || 8080,
        PREFIX: process.env.PREFIX || 'api',
        HOST: process.env.HOST || 'http://localhost',
        NAME: process.env.NAME || 'CODEBASE',
        SCOPE: process.env.SCOPE || 'srv-nestjs-base',

        //security
        ACCESS_EXP: parseInt(process.env.ACCESS_EXP) || 86400, // 1 day (seconds)
        REFRESH_EXP: parseInt(process.env.REFRESH_EXP) || 2592000, // 30 day
        TOKEN_ENCRYPT_SECRET: process.env.TOKEN_ENCRYPT_SECRET || 's3cr3t!@#',
        AUTH_TYPE: process.env.AUTH_TYPE || 'Bearer',

        //database
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_USER: process.env.DB_USER || 'root',
        DB_PASSWORD: process.env.DB_PASSWORD || '123456',
        DB_PORT: parseInt(process.env.DB_PORT) || 27017,
        DB_DATABASE: process.env.DB_DATABASE || 'pjcore',

        //elasticsearch
        ES_HOST: process.env.ES_HOST || 'http://localhost:9200',

        //upload
        UPLOAD_BUCKET_NAME: process.env.UPLOAD_DEST || 'uploads',
        MAX_IMAGE_SIZE: parseInt(process.env.MAX_IMAGE_SIZE) || 5000000,
        MAX_VIDEO_SIZE: parseInt(process.env.MAX_VIDEO_SIZE) || 5000000,

        //redis cache
        REDIS_HOST: process.env.REDIS_HOST || 'localhost',
        REDIS_PASS: process.env.REDIS_PASS || '123456',
        REDIS_PORT: parseInt(process.env.REDIS_PORT) || 6379,
        CACHE_TTL: parseInt(process.env.CACHE_TTL) || 3600, //1hour

        //seeding
        ROOT_USER: process.env.ROOT_USER || 'root',
        ROOT_PASSWORD: process.env.ROOT_PASSWORD || '123456',
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
