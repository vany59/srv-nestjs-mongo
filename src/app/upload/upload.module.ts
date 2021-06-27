import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadEntity } from './upload.entity';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import ConfigurationModule from 'src/config/config.module';
import { ConfigurationService } from 'src/config/config.service';
import { diskStorage } from 'multer';
import * as uuid from 'uuid'
import { extname } from 'path';
import { MulterConfigService } from './multerConfig.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UploadEntity]), 
    ConfigurationModule,
    MulterModule.registerAsync({
      imports: [ConfigurationModule],
      useClass: MulterConfigService
    })
  ],
  providers: [UploadService],
  controllers: [UploadController]
})
export class UploadModule { }
