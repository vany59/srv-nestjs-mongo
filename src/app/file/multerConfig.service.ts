import { Injectable, Req } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express/multer';

import { ConfigurationService } from '@config/config.service';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private readonly configurationService: ConfigurationService) {}

  config = this.configurationService.getUploadConfig();

  createMulterOptions(): MulterModuleOptions {
    return {
      limits: { fileSize: this.config.maxImageSize },
      fileFilter: (req, file, callback) => {
        callback(null, true);
      },
      storage: {
        _handleFile: (req, file, cb) => cb(null),
        _removeFile: (req, file, cb) => cb(null),
      },
    };
  }
}
