import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionFilter } from '@nestjs/common';

async function startApp() {
  const PORT = +process.env.PORT;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes();
  app.setGlobalPrefix('/api');
  await app.listen(PORT, () => console.log('Server runnin on port', PORT));
}
startApp();
