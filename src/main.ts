import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === "production";
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: isProduction
      ? 'https://wm-rh-015.web.app'
      : 'http://localhost:4200',
    credentials: true
  });
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`System ndakisa listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
}
bootstrap();
