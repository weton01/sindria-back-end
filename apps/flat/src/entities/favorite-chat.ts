import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Schem } from 'mongoose';
import { UserSchema, User } from './user';

export type FavoriteChatDocument = FavoriteChat & Document;

@Schema({ timestamps: true })
export class FavoriteChat {
  @Prop({ 
    type: Schem.Types.ObjectId, ref: "chatSchema", autopopulate: true
  })
  chat: any
}

export const FavoriteChatSchema = SchemaFactory.createForClass(FavoriteChat);