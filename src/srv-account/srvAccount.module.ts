import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './token/token.dto';

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity])],
  controllers: [],
})
export class SrvAccountModule {}
