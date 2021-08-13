import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigurationService } from '@config/config.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class UploadController {
  constructor(public readonly configurationService: ConfigurationService) {}

  config = this.configurationService.getUploadConfig();

  @Post('/upload/image')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
          return callback(null, false);
        }
        callback(null, true);
      },
    }),
  )
  uploadImage(@UploadedFile() image) {
    return;
  }

  @Post('/upload/video')
  uploadVideo(@UploadedFile() video) {
    return;
  }

  @Get('/image/:id')
  getImage() {
    return;
  }

  @Get('/video/:id')
  getVideo() {
    return;
  }
}
