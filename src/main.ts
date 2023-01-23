import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true, // Só aceita as proriedades que estiverem no DTO
      forbidNonWhitelisted: true, // RETORNA ERRO SE TIVER ATRIBUTO A MAIS NO OBJETO
      transform: true, // TIPA O BODY DA REQUISIÇÃO
    }
  ));
}

bootstrap();
