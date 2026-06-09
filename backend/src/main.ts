import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://mynoteappangular.web.app',
      'https://mynoteappangular.firebaseapp.com',
      'http://localhost:4200',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port, '::');
  console.log(`Listening on port ${port}`);
}
bootstrap();
