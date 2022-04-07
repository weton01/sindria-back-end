import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './factories/app';
import * as fs from 'fs';

import 'module-alias';

const forwardedPrefixSwagger = async (req, res, next) => {
  req.originalUrl = (req.headers['x-forwarded-prefix'] || '') + req.url;
  next();
};

import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import 'module-alias';
import { envs } from './utils/envs/envs';

let server: Handler;
console.log('here envs', envs);
if (envs.NODE_ENV == 'development') {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.use(forwardedPrefixSwagger);

    const config = new DocumentBuilder()
      .setTitle('Users Service')
      .setDescription(`The users service only...`)
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));

    SwaggerModule.setup('user-docs', app, document);

    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );

    await app.listen(3001);
  }

  bootstrap();
}

async function bootstrapHandler(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrapHandler());
  return server(event, context, callback);
};
