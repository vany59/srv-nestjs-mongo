import { ConfigurationService } from '@config/config.service';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { uuid } from '@utils/uuid';
import { Connection, mongo } from 'mongoose';
import * as path from 'path';

@Injectable()
export class FileService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,

    private readonly configurationService: ConfigurationService,
  ) {}

  fileModel = new mongo.GridFSBucket(this.connection.db, {
    readPreference: 'secondaryPreferred',
  });
  config = this.configurationService.getUploadConfig();

  async findOneImage(query, res) {
    const file = await this.fileModel
      .openDownloadStreamByName(query.filename)
      .pipe(res);
  }
}
