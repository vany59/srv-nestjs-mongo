import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express/multer';

import { ConfigurationService } from '@config/config.service';
import * as multer from 'multer';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, mongo } from 'mongoose';
import { uuid } from '@utils/uuid';
import * as path from 'path';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(
    private readonly configurationService: ConfigurationService,

    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  config = this.configurationService.getUploadConfig();

  fileModel = new mongo.GridFSBucket(this.connection.db, {
    readPreference: 'secondaryPreferred',
  });

  handleFile(req, file, cb) {
    const type = file.mimetype.split('/')[0];
    file.filename = uuid() + path.extname(file.originalname);
    file.link = `/${this.config.uploadBucketName}/${type}/${file.filename}`;
    file.stream.pipe(
      this.fileModel.openUploadStream(file.filename, {
        contentType: file.mimetype,
        metadata: {},
      }),
    );
    cb(null, '');
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: {
        _handleFile: (req, file, cb) => this.handleFile(req, file, cb),
        _removeFile: (req, file, cb) => cb(null),
      },
    };
  }
}
