import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RouterModule, Routes } from 'nest-router';

import { AppService } from './app.service';

import ConfigurationModule from './config/config.module';
import { DatabaseModule } from './database/database.module';

import { RedisCacheModule } from './cache/redisCache.module';

import { AuthGuard } from './app/auth/auth.guard';

import { MyLogger } from './MyLogger';
import AppInterceptor from './interceptor';

import * as App from './app';
import { SrvConstantModule } from './srv-constant/srvConstant.module';

const routes: Routes = [
  {
    path: '/srv-constant',
    module: SrvConstantModule,
  },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    ConfigurationModule,
    RedisCacheModule,
    SrvConstantModule,
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
