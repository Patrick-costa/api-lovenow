import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  
  
  const config = new DocumentBuilder()
  .setTitle('Lovenow API')
  .setDescription('API Lovenow Documentation')
  .setVersion('1.0')
  .addTag('lovenow')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api', app, document);
  
  await app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Só aceita as proriedades que estiverem no DTO
    forbidNonWhitelisted: true, // RETORNA ERRO SE TIVER ATRIBUTO A MAIS NO OBJETO
    transform: true, // TIPA O BODY DA REQUISIÇÃO
  }))
  
  await app.listen(3000);
}

bootstrap();
