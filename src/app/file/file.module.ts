import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import ConfigurationModule from 'src/config/config.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './multerConfig.service';

@Module({
  imports: [
    ConfigurationModule,
    MulterModule.registerAsync({
      imports: [ConfigurationModule],
      useClass: MulterConfigService,
    }),
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
