import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Schem } from 'mongoose';

export type FavoriteChatDocument = FavoriteChat & Document;

@Schema({ timestamps: true })
export class FavoriteChat {
  @Prop({
    type: Schem.Types.ObjectId,
    ref: 'chatSchema',
    autopopulate: true,
  })
  chat: any;
}

export const FavoriteChatSchema = SchemaFactory.createForClass(FavoriteChat);
