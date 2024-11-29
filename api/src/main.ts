import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
// import { BadRequestFilter  } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    // origin: (origin, callback) => {
    //   if (origin === undefined || origin.includes('/swagger')) {
    //     callback(null, true);
    //   } else {
    //     const allowedOrigins = [
    //       'http://localhost:3000',
    //       'http://localhost:3001',
    //       'https://api-seven-amber.vercel.app',
    //       'https://salaais.vercel.app',
    //       'https://api-salaais-projects.vercel.app',
    //     ];
    //     if (allowedOrigins.includes(origin)) {
    //       callback(null, true);
    //     } else {
    //       callback(new Error('Not allowed by CORS'));
    //     }
    //   }
    // },
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-CSRF-Token',
      'X-Requested-With',
      'Accept',
      'Accept-Version',
      'Content-Length',
      'Content-MD5',
      'Date',
      'X-Api-Version',
    ],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Shopper API')
    .setDescription('A API para o sistema de compras')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
