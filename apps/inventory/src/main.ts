import { envs } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import * as fs from 'fs';
import { InventoryModule } from './inventory.module';
import 'module-alias';

let server: Handler;

if (envs.NODE_ENV == 'development') {
  async function bootstrap() {
    const app = await NestFactory.create(InventoryModule);
  
    app.setGlobalPrefix('v1');
    app.enableCors();

    const config = new DocumentBuilder()
      .setTitle('Inventory Service')
      .setDescription(`The Inventory service only...`)
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    fs.writeFile('docs/inventory.json', JSON.stringify(document), 'utf8', () => ({}));

    SwaggerModule.setup('docs', app, document);

    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );

    await app.listen(3000);
  }

  bootstrap();
}

async function bootstrapHandler(): Promise<Handler> {
  const app = await NestFactory.create(InventoryModule);

  app.setGlobalPrefix('v1');
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
