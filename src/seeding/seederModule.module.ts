import { Module } from '@nestjs/common';
import { UserModule } from '@app/user/user.module';
import ConfigurationModule from '@config/config.module';
import { DatabaseModule } from '../database/database.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [UserModule, ConfigurationModule, DatabaseModule],
  providers: [SeederService],
})
export class SeederModule {}
