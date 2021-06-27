import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigurationService } from './config/config.service';
import { MyLogger } from './MyLogger';
import { ValidationPipe } from './validation/validation.pipe';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: new MyLogger(),
  });

  const appConfig = app.get(ConfigurationService).getAppConfig();

  app.setGlobalPrefix(appConfig.prefix);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(appConfig.port, () => {
    logger.debug(
      `App is listening on: ${appConfig.host}:${appConfig.port}/${appConfig.prefix}`,
    );
  });
}
bootstrap().catch(() => {
  logger.error('Can not start server');
  process.exit(-1);
});
