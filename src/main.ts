import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigurationService } from './config/config.service';

const logger = new Logger('Main')

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors: true});
  const appPort = app.get(ConfigurationService).getAppListeningPort()
  await app.listen(appPort, ()=>{
    logger.debug('App is listening on port ' + appPort)
  });
}
bootstrap();
