import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import { envs } from './';

export const MailerConfig = MailerModule.forRootAsync({
  useFactory: () => ({
    transport: {
      host: envs.MAILER_TRANSPORT_HOST,
      port: envs.MAILER_TRANSPORT_PORT,
      ignoreTLS: false,
      secure: false,
      auth: {
        user: envs.MAILER_TRANSPORT_AUTH_USER,
        pass: envs.MAILER_TRANSPORT_AUTH_PASS,
      },
    },
    template: {
      dir: path.join(__dirname, 'templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
});
