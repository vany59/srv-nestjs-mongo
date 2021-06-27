import { Controller, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ConfigurationService } from 'src/config/config.service';
import { UploadError } from './upload.error';
import { UploadImageGuard } from './upload.Guard';

@Controller('upload')
export class UploadController {
  constructor(
    public readonly configurationService: ConfigurationService
  ){}

  @Post('image')
  @UseInterceptors(FileInterceptor('image',{
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
        req.fileValidationError = UploadError.IMAGE_ONLY.code
        return callback(null, false)
      }
      callback(null, true)
    },
  }))
  uploadFile(@UploadedFile() image, @Req() req: any, @Res() res: Response) {
    if(req.fileValidationError){
      res.send(UploadError[req.fileValidationError])
      return 
    }
    res.send()
    // console.log(image);
  }

}
