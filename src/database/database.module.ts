import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationService } from '@config/config.service';
import { getMetadataArgsStorage } from 'typeorm';

const DatabaseModule = TypeOrmModule.forRootAsync({
  imports: [ConfigurationService],
  useFactory: async (configService: ConfigurationService) => {
    const { host, port, username, password, database } =
      configService.getDBConfig();
    const connectUrl = `mongodb://${username}:${password}@${host}:${port}/${database}`;
    return {
      type: 'mongodb',
      url: connectUrl,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      // entities: [
      //   __dirname + '/../app/**/*.entity{.ts,.js}',
      //   __dirname + '/../app/**/*.dto{.ts,.js}',
      //   __dirname + '/../srv-account/**/*.dto{.ts,.js}',
      //   __dirname + '/../srv-account/*.dto{.ts,.js}',
      //   __dirname + '/../srv-auth/**/*.dto{.ts,.js}',
      //   __dirname + '/../srv-auth/*.dto{.ts,.js}',
      //   __dirname + '/../srv-constant/**/*.dto{.ts,.js}',
      //   __dirname + '/../srv-constant/*.dto{.ts,.js}',
      //   __dirname + '/../srv-app/**/*.dto{.ts,.js}',
      //   __dirname + '/../srv-app/*.dto{.ts,.js}',
      // ],
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
      useUnifiedTopology: true,
    };
  },
  inject: [ConfigurationService],
});
export { DatabaseModule };
