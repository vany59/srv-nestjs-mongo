import { NestFactory } from '@nestjs/core';
import { SeederService } from './seeder.service';
import { SeederModule } from './seederModule.module';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule, { logger: false })
    .then(async (appContext) => {
      const seeder = appContext.get(SeederService);

      try {
        await seeder.seed();
        console.log('database seeding successfully!');
        process.exit();
      } catch (e) {
        console.error('database seeding error!');
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
bootstrap();
