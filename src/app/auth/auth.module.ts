import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './auth.dto';
import { UserModule } from '@app/user/user.module';
import { UserEntity } from '@app/user/user.dto';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity]), UserModule],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
