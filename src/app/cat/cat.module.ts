import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatController } from './cat.controller';
import { CatEntity } from './cat.dto';
import { catService } from './cat.service';

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity])],
  controllers: [CatController],
  providers: [catService],
})
export class CatModule {}
