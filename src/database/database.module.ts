import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationService } from '@config/config.service';

const DatabaseModule = TypeOrmModule.forRootAsync({
  imports: [ConfigurationService],
  useFactory: async (configService: ConfigurationService) => ({
    type: 'mongodb',
    ...configService.getDBConfig(),
    entities: [
      __dirname + '/../app/**/*.entity{.ts,.js}',
      __dirname + '/../app/**/*.dto{.ts,.js}',
    ],
    synchronize: process.env.NODE_ENV === 'production' ? false : true,
    useUnifiedTopology: true,
  }),
  inject: [ConfigurationService],
});
export { DatabaseModule };
