import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigurationService } from '@config/config.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { File } from 'src/decorator/file.decorator';

@Controller('file')
export class FileController {
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly fileService: FileService,
  ) {}

  config = this.configurationService.getUploadConfig();

  @Get('/image/:filename')
  getImage(@Param() param, @Res() res) {
    this.fileService.findOneImage(param, res);
    return;
  }

  @Post('/upload/image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@File() file) {
    return file;
  }

  @Post('/upload/video')
  uploadVideo(@UploadedFile() video) {
    return;
  }

  @Get('/video/:id')
  getVideo() {
    return;
  }
}
