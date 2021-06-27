import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import ConfigurationModule from './config/config.module';
import { DatabaseModule } from './database/data.module';
import { AuthGuard } from './app/auth/auth.guard'
import { UploadModule } from './app/upload/upload.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    UploadModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class AppModule { }
