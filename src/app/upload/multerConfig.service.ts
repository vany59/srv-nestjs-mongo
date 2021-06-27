import { Injectable, Logger } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express/multer";
import { diskStorage } from "multer";
import { extname } from "path";
import { ConfigurationService } from "src/config/config.service";
import * as uuid from 'uuid'

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(
    private readonly configurationService: ConfigurationService,
  ){}

  createMulterOptions(): MulterModuleOptions {
    return {
      fileFilter: (req, file, callback) => {
				callback(null, true)
			},
      storage: diskStorage({
        destination: this.configurationService.getUploadDest(),
        filename(_, file, callback) {
          callback(null, uuid.v4() + extname(file.originalname))
        }
      })
    };
  }
}