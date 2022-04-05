import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TwilioModule } from 'nestjs-twilio';
import { envs } from '../utils/envs/envs';
import { UserModule } from './user';

console.log('here envs', envs.MONGO_HOST)

@Module({
  imports: [
    MongooseModule.forRoot(envs.MONGO_HOST),
    TwilioModule.forRoot({
      accountSid: envs.TWACCOUNTSID,
      authToken: envs.TWAUTHTOKEN,
    }),

    UserModule
  ]
})
export class AppModule { }
 