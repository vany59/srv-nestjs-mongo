import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import ConfigurationModule from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthGuard } from './app/auth/auth.guard';
import { UploadModule } from './app/upload/upload.module';

import { MyLogger } from './MyLogger';
import AppInterceptor from './interceptor';
import { CatModule } from './app/cat/cat.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    UploadModule,
    CatModule,
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
