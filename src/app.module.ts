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
import { SrvAccountModule } from './srv-account/srvAccount.module';
import { SrvAuthModule } from './srv-auth/srvAuth.module';

const routes: Routes = [
  {
    path: '/srv-account',
    module: SrvAccountModule,
  },
  {
    path: '/srv-auth',
    module: SrvAuthModule,
  },
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
    SrvAccountModule,
    SrvAuthModule,
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
