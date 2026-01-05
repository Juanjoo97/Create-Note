/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración CORS corregida
  app.enableCors({
    origin: [
      'https://mynoteappangular.web.app',
      'https://mynoteappangular.firebaseapp.com',
      'http://localhost:4200', // Para desarrollo local
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
