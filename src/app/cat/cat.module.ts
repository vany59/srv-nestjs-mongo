import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { catService } from './cat.service';

@Module({
  controllers: [CatController],
  providers: [catService],
})
export class CatModule {}
