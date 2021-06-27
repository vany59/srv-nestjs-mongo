import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigurationService } from "src/config/config.service";

const DatabaseModule = TypeOrmModule.forRootAsync({
  imports: [ConfigurationService],
  useFactory: async (configService: ConfigurationService) => ({
    type: 'mysql',
    ...configService.getMySQLConfig(),
    entities: [__dirname + '/../app/**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV === 'production' ? false : true
  }),
  inject: [ConfigurationService]
})
export { DatabaseModule }