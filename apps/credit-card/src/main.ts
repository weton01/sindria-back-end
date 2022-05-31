import { envs } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import * as fs from 'fs';
import { CreditCardModule } from './credit-card.module';
import 'module-alias';

let server: Handler;

if (envs.NODE_ENV == 'development') {
  async function bootstrap() {
    const app = await NestFactory.create(CreditCardModule);

    app.enableCors();
    app.setGlobalPrefix('v1');

    const config = new DocumentBuilder()
      .setTitle('Credit Card Service')
      .setDescription(`The address service only...`)
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    fs.writeFile(
      'docs/credit-card.json',
      JSON.stringify(document),
      'utf8',
      () => ({}),
    );

    SwaggerModule.setup('docs', app, document);

    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );

    await app.listen(3000);
  }

  bootstrap();
}

async function bootstrapHandler(): Promise<Handler> {
  const app = await NestFactory.create(CreditCardModule);

  app.enableCors();
  app.setGlobalPrefix('v1');

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
