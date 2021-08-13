import { ConfigurationService } from '@config/config.service';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { uuid } from '@utils/uuid';
import { Connection, mongo } from 'mongoose';
import path from 'path';

@Injectable()
export class UploadService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,

    private readonly configurationService: ConfigurationService,
  ) {}

  fileModel = new mongo.GridFSBucket(this.connection.db, {
    readPreference: 'secondaryPreferred',
  });
  config = this.configurationService.getUploadConfig();

  async save(type: string, file: any, cb: Function) {
    file.filename = uuid() + path.extname(file.originalname);
    file.link = `/${this.config.uploadBucketName}/${type}/${file.filename}`;
    file.stream.pipe(
      this.fileModel.openUploadStream(file.filename, {
        contentType: file.mimetype,
        metadata: {},
      }),
    );
    cb(null, true);
  }
}
