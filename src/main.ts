import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json } from 'express';
import { VersioningType } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(json({ limit: '60mb' }));
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Sams Documentation')
    .setDescription('The sams api documentation')
    .addTag('Auth')
    .addTag('Users')
    .addTag('Beneficiary')
    .addTag('Bank')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
