import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
// npm install --save ip-address
// npm install --save @types/ip-address
// import * as IpAddress from 'ip-address';
// export var ipv4 = IpAddress.Address4;
// export var ipv6 = IpAddress.Address6;
// const allowedOrigins = ['http://localhost:4200', 'http://192.168.100.114:4200', 'http://0.0.0.0:4200'];
async function bootstrap() {
  const isProduction = process.env.NODE_ENV === "production";
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: isProduction ? 'https://ndakisa-fogec.up.railway.app' : 'http://localhost:4200',
    credentials: true
  });
  const PORT = process.env.PORT || 3002;

  app.listen(PORT, () => {
    console.log(`System ndakisa listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
}
bootstrap();
