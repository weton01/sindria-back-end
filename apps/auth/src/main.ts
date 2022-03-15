import { envs } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import * as fs from 'fs';
import 'module-alias';
import { AuthModule } from './factories/auth.module';

let server: Handler;

if (envs.NODE_ENV == 'development') {
  async function bootstrap() {
    const app = await NestFactory.create(AuthModule);
    app.enableCors()
    const config = new DocumentBuilder()
      .setTitle('Auth Service')
      .setDescription(`The auth service only...`)
      .setVersion('1.0')
      .addTag('auth')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    fs.writeFile(
      'swagger.json',
      JSON.stringify(document),
      'utf8',
      function (err) {
        if (err) {
          console.log('An error occured while writing JSON Object to File.');
          return console.log(err);
        }

        console.log('JSON file has been saved.');
      },
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
  const app = await NestFactory.create(AuthModule);

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
