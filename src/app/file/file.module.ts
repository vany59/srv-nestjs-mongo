import { Module } from '@nestjs/common';
import { UploadService } from './file.service';
import { UploadController } from './file.controller';
import ConfigurationModule from 'src/config/config.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './multerConfig.service';

@Module({
  imports: [
    ConfigurationModule,
    // MulterModule.registerAsync({
    //   imports: [ConfigurationModule],
    //   useClass: MulterConfigService,
    // }),
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
