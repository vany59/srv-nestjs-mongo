import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeederService } from './seeder.service';
import { SeederModule } from './seederModule.module';

async function bootstrap() {
  // NestFactory.createApplicationContext(SeederModule)
  //   .then(async (appContext) => {
  //     const seeder = appContext.get(SeederService);
  //     const logger = new Logger();
  //     const isSuccess = await seeder.seed();
  //     if (isSuccess) {
  //       logger.log('created user', 'seeder');
  //       process.exit();
  //     } else {
  //       logger.log('existed user', 'seeder');
  //       process.exit(-1);
  //     }
  //   })
  //   .catch((error) => {
  //     console.log('error');
  //     throw error;
  //   });
}
bootstrap();
