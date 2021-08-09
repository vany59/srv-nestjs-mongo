import { ConfigurationService } from '@config/config.service';
import { MongooseModule } from '@nestjs/mongoose';

const DatabaseModule = MongooseModule.forRootAsync({
  imports: [ConfigurationService],
  useFactory: async (configService: ConfigurationService) => {
    const { host, port, username, password, database } =
      configService.getDBConfig();
    const connectUrl = `mongodb://${username}:${password}@${host}:${port}/${database}`;
    return {
      uri: connectUrl,
      useCreateIndex: true,
      useNewUrlParser: true,
    };
  },
  inject: [ConfigurationService],
});
export { DatabaseModule };
