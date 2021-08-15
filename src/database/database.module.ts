import { ConfigurationService } from '@config/config.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
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

const ESModule = ElasticsearchModule.registerAsync({
  imports: [ConfigurationService],
  useFactory: async (configService: ConfigurationService) => {
    const { host } = configService.getESConfig();
    return {
      node: host,
    };
  },
  inject: [ConfigurationService],
});
export { DatabaseModule, ESModule };
