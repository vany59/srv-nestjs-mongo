import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AppService } from './app.service';

import ConfigurationModule from './config/config.module';
import { DatabaseModule } from './database/database.module';

import { RedisCacheModule } from './cache/redisCache.module';

import { AuthGuard } from './app/auth/auth.guard';

import { MyLogger } from './MyLogger';
import AppInterceptor from './interceptor';

import * as App from './app';
@Module({
  imports: [
    ConfigurationModule,
    RedisCacheModule,
    DatabaseModule,
    ...Object.values(App),
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ...AppInterceptor.map((e) => ({
      provide: APP_INTERCEPTOR,
      useClass: e,
    })),
    MyLogger,
  ],
})
export class AppModule {}
