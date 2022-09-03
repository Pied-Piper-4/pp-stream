import { NestFactory } from '@nestjs/core';
import { AppModule } from './apps/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  const globalPrefix = configService.get('globalPrefix');
  console.log(configService.get('mongodb'));
  const config = new DocumentBuilder()
    .setTitle('PP Stream User Service')
    .setDescription('The Piper Stream User Service API description')
    .setVersion('1.0')
    .addTag('pp-user')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('user-service/api', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
}
bootstrap();
